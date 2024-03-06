class Message {
    /**
     * @typedef {Object} MessageFields
     * @property {import('crypto').UUID} uuid
     * @property {import('discord.js').Snowflake} serverId
     * @property {string|null} serverName
     * @property {import('discord.js').Snowflake} authorId
     * @property {string|null} authorName
     * @property {string|null} message
     */

    constructor(){
        this.uuid = require('crypto').randomUUID();
        this.serverId = 1;
        this.serverName = "[No Server]";
        this.authorId = 1;
        this.authorName = "[No Author]";
        this.message = "[No Message]";
    }

    /**
     * Fill Product fields with new values
     * @param {MessageFields} newFields - Object containing new values for Category fields
     */
    fill(newFields) {
        for (let field in newFields) {
            if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
                if (this[field] !== 'undefined') {
                    this[field] = newFields[field];
                }
            }
        }

        return this.toArray();
    }

    toArray(){
        return {
            uuid : this.uuid,
            serverId : this.serverId,
            serverName : this.serverName,
            authorId : this.authorId,
            authorName: this.authorName,
            message: this.message
        };
    }

}

module.exports = Message;
