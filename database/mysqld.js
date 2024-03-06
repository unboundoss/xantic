/**
 * 
 * @param {import('mysql2').Connection} client 
 * @param {*} callback 
 */
module.exports.initMYSQL2Connection = async (client,config,callback) => {
    var call_data = {
        createStore: async (name, callback) => {
            client.query(
                `CREATE TABLE ${name.replace(".","")} (id INT NOT NULL AUTO_INCREMENT , uuid VARCHAR(256) NOT NULL , data LONGTEXT NOT NULL, timestamp VARCHAR(16) NOT NULL  , PRIMARY KEY (id)) ENGINE = ${config.database_engine};`,
                async function(err,results,fields) {
                    callback(true);
                }
            )
        },

        list: async (table , callback) => {
            var fetchData = [];

            client.query(
                `SELECT * FROM ${table.replace(".","")}`,
                async function(err,results,fields) {
                    for(var element of results) {
                        var data = JSON.parse(element['data']);
                        await fetchData.push({
                            uuid: element['uuid'],
                            ...data
                        });

                        await callback(fetchData);
                    }
                }
            )
        },

        search: async (table , data , callback) => {
            var fetchData = [];

            client.query(
                `SELECT * FROM ${table.replace(".","")}`,
                async function(err,results,fields) {
                    for(var element of results) {
                        var data = JSON.parse(element['data']);
                        if(data)
                        await fetchData.push({
                            uuid: element['uuid'],
                            ...data
                        });

                        await callback(fetchData);
                    }
                }
            )
        },

        insert: async (table, data,callback) => {
            var uuid = require('node:crypto').randomUUID();

            client.query(
                `INSERT INTO ${table.replace(".","")} (uuid, data, timestamp) VALUES 
                    ('${uuid}', '${JSON.stringify(data)}', '${Date.now()}')`,
                async function(err,result,fields) {
                    callback(uuid)
                }
            )
        },

        build: async () => {
            var tables = require("./collection_tables.json");
            for(var table of tables){
                call_data.createStore(table , (state) => {});
            }
        }
    }

    callback(call_data);
}