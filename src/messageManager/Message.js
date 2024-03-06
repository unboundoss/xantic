class Message {
    /**
     * @typedef {Object} MessageFields
     * @property {import('discord.js').Snowflake} serverId
     * @property {string|null} serverName
     * @property {import('url').Url|null} serverIcon
     * @property {import('discord.js').Snowflake} authorId
     * @property {string|null} authorName
     * @property {import('url').Url|null} authorIcon
     * @property {string|null} message
     */

    constructor(){
        this.serverId = 1;
        this.serverName = "[No Server]";
        this.serverIcon = null;
        this.authorId = 1;
        this.authorName = "[No Author]";
        this.authorIcon = null;
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
            serverId : this.serverId,
            serverName : this.serverName,
            serverIcon : this.serverIcon,
            authorId : this.authorId,
            authorIcon: this.authorIcon,
            authorName: this.authorName,
            message: this.message
        };
    }

}

module.exports = Message;
