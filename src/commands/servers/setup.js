const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
        .addChannelOption((o) => o
            .setName("channel")
            .setDescription("Channel to Chat with Xantic")
            .setRequired(true)
        ).setDescription('Setup a Discord Server'),
    /**
     * 
     * @param {import('discord.js').Interaction} interaction 
     */
	async execute(interaction) {
        var channel = interaction.options.getChannel("channel");

        console.log(channel);

		await interaction.reply('Pong!');
	},
};