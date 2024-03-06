// Configuration to be used in Production Mode
module.exports = {
    // Discord Bot Token **It's not recommend to put it here**,
    discord_token: process.env['discord_token'] || "",
    // Discord Bot Client Id **It's not recommend to put it here**,
    discord_client_id: process.env['discord_client_id'] || "",
    // Discord Bot Client Id **It's not recommend to put it here**,
    discord_client_secret: process.env['discord_client_secret'] || "",

    // Database Configurations
    // Possible Options ["mongod" , "mysqld"]
    database_adapter: "mongod",
    // If using MongoDB
    database_uri: process.env['database_uri'] || "",
    database_name: "xantic",
    // If using MySQL
    database_host: "localhost",
    database_user: "root",
    datbase_password: process.env['database_password'] || ""
}