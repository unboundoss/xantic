const { Client, Events } = require("discord.js");
const Message = require("./Message");
const discordSend = require("./client/discord/send");
const { data } = require("../commands/servers/setup");
/**
 * 
 * @param {Client} discord 
 */
const initMessageManager = async (
    database,
    discord
) => {
    function postMessage(message){
        database.list("xan.guilds" , {} , (list) => {
           for(var element of list){

            if(element.client == "discord") discordSend(message , data , element.channelId , discord);
           } 
        });
    }


    discord.on(Events.MessageCreate , (message) => {
        if(message.author.bot) return;
        database.search("xan.guilds" , {
            serverId : message.guild.id
        } , async (data) => {
            if(data !== null){
                var _message = new Message();
                _message.authorId = message.author.id;
                _message.authorName = message.author.username;
                _message.serverId = message.guild.id;
                _message.serverName = message.guild.name,
                _message.message = message.content;

                delete _message.uuid;

                postMessage(_message.toArray());
            }
        });
    });
}

module.exports = initMessageManager;