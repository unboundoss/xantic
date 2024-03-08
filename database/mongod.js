const { MongoClient } = require('mongodb');

/**
 * 
 * @param {MongoClient} client 
 * @param {*} callback 
 */
module.exports.initMongoDBInstance = async (client,config,callback) => {
    const db = client.db(config.database_name);

    var call_data = {
        createStore: async (name, callback) => {
            db.createCollection(name).then(async () => {
                await callback(true);
            }).catch(() => {
                await callback(false);
            })
        },

        list: async (table, data, callback) => {
            var collection = db.collection(table);

            var found_data = await collection.find(data).toArray();

            await callback(found_data);
        },

        insert: async (table, data, callback) => {
            var uuid = require('node:crypto').randomUUID();

            var collection = db.collection(table);

            collection.insertOne({
                uuid: uuid,
                ...data
            })

            await callback(uuid)
        },

        delete: async (table, uuid, callback) => {
            var collection = db.collection(table);

            collection.deleteOne({ uuid: uuid });

            await callback(true);
        },

        search: async (table, data, callback) => {
            var collection = db.collection(table);

            var found_data = await collection.findOne(data);

            await callback(found_data);
        },

        edit: async (table, uuid, data, callback) => {
            var collection = db.collection(table);

            collection.updateOne({
                uuid: uuid,
            }, {
                $set: {
                    uuid: uuid,
                    ...data
                }
            });

            await callback(true);
        },

        build: async () => {
            var tables = require("./collection_tables.json");
            for(var table of tables){
                call_data.createStore(table, (state) => {});
            }
        }
    };

    callback(call_data);
};
