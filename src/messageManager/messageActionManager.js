const { Client, Events } = require("discord.js");
const Message = require("./Message");
const discordSend = require("./client/discord/send");
const { data } = require("../commands/servers/setup");
/**
 * 
 * @param {Client} discord 
 */
const actionMessageManager = async (
    database,
    discord,
    callback
) => {
    var d_data  = {
        find_uuid: (messageId, authorId , cb) => {
            database.search("xan.messageDelivery" , { messageId: messageId } , (dataUid) => {
                database.search("xan.messages" , { uuid: dataUid.link } , (data) => {
                    if(data.authorId.toString() == authorId.toString()){
                        cb(dataUid.link);
                    }else{
                        cb(null)
                    }
                })
            });
        },

        delete: (uuid) => {
            database.list("xan.messageDelivery", {
                link: uuid
            } , (data) => {
                for(var message of data) {
                    discord.channels.fetch(message['channelId']).then((channel) => {
                        channel.messages.delete(message['messageId']).catch(e => {
                            console.error(e);
                            console.log(`Unable to Delete Message from ${channel.name} in ${channel.guild.name}`);
                        });
                    });
                }
            });
        }
    };

    callback(d_data);
};

module.exports = actionMessageManager;