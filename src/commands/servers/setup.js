const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
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

        interaction.client.database.search("xan.guilds" , {
            serverId : interaction.guild.id
        } , async (data) => {
            if(data == null){
                interaction.client.database.insert("xan.guilds" , {
                    serverId : interaction.guild.id,
                    channelId : channel.id,
                    client: "discord"
                }, async (c) => {
                    await interaction.reply(`Saved Channel as #${channel.name} in Database as Discord Client`);
                })
            }else{
                await interaction.reply(`Guild is already saved into Database`);
            }
        });
	},
};