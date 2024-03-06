// Initalize dotenv to read .env files
require("dotenv").config();
const config = require("./config/prod");
const fs = require('node:fs');
const path = require('node:path');
const { MongoClient } = require("mongodb");
const mysql = require('mysql2');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	]
});

async function main() {
	if (config.database_adapter == "mongod") {
		const mongo_client = new MongoClient(config.database_uri);

		await mongo_client.connect();
		console.log("Using MongoDB Connection for Database");

		require("../database/mongod").initMongoDBInstance(mongo_client, config, (back) => initMessageManager(back));
	} else if (config.database_adapter == "mysqld") {
		const mysql_connection = mysql.createConnection({
			host: config.database_host,
			user: config.database_user,
			password: config.database_password,
			database: config.database_name,
		});

		mysql_connection.connect();
		mysql_connection.on('error', (error) => console.error);

		require("../database/mysqld").initMYSQL2Connection(mysql_connection, config, (back) => initMessageManager(back));
	}
}

async function initMessageManager(database) {
	client.database = database;
	
	database.build();
}

client.commands = new Collection();

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

	main();

	client.user.setActivity({
		name: `Minecraft`,
		state: "2.0"
	});

	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ('data' in command && 'execute' in command) {
				client.commands.set(command.data.name, command);
				console.log("Loaded /" + command.data.name);
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}

	client.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	});
});

// Login to ConnectX
client.login(config.discord_token);