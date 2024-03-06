// This is a script to be used by PM2
// To use it, run `pm2 start ecosystem.config.js`
// This script should be used in conjunction with the `check_and_restart.sh` file.
module.exports = {
  apps : [{
    name   : "Xantic",
    script : "./src/index.js",
  }]
}