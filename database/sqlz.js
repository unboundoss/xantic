const { Sequelize } = require("sequelize");

/**
 * 
 * @param {Sequelize} client
 * @param {*} callback
 */
module.exports.initSQLConnection = async (client, config, callback) => {
    let tables = {};
    var call_data = {
        list: async (table, data, callback) => {
            console.log(`Listing ${table}`);
            let result = await tables[table].findAll({ where: data });
            if (!result) {
              await callback(result);
            } else {
              await callback(result.map(r => r.dataValues));
            }
        },

        delete: async (table, uuid, callback) => {
            await tables[table].destroy({ where: { uuid: uuid } });
            await callback(true);
        },

        search: async (table, data, callback) => {
            console.log(`Searching ${table}`);
            var result = await tables[table].findOne({ where: data });
            await callback(result);
        },
        insert: async (table, data, callback) => {
            console.log(`Inserting to ${table}`);
            var uuid = require('node:crypto').randomUUID();
            let instance = tables[table].build({
              uuid: uuid,
              ...data
            });
            await instance.save();
            await callback(uuid);
        },

        edit: async (table, uuid, data, callback) => {
            try {
                await tables[table].update({
                    uuid: uuid,
                    ...data
                }, {
                    where: { uuid: uuid }
                });
                await callback(true);
            } catch (e) {
                await callback(false);
                console.error(`Error:\n${e}`);
            }
        },


        build: async () => {
            var __tables = require("./collection_tables.json");
            var __schema = require("./schemas.js");
            var schema = __schema.sql;
            for (var table of __tables) {
                const model = client.define(table.replaceAll(".", "__"), schema[table.replaceAll(".", "__")], { freezeTableName: true });
                tables[table] = model;
            }
            await client.sync();
        }
    }

    callback(call_data);
}
