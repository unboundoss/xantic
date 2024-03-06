// Configuration to be used in Production Mode
module.exports = {
    // Discord Bot Token **It's not recommend to put it here**,
    discord_token: process.env['discord_token'] || "",
    // Discord Bot Client Id **It's not recommend to put it here**,
    discord_client_id: process.env['discord_client_id'] || ""
}