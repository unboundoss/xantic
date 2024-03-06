#!/bin/sh
#!/bin/bash

# pull changes from the repo
git pull

# Set the time threshold in seconds (6 hours = 21600 seconds)
time_threshold=21600

# Get the timestamp of the most recent commit
last_commit_time=$(git log -1 --format="%at")

# Check if the last commit was within the time threshold
if [[ $(( $(date +%s) - last_commit_time )) -lt $time_threshold ]]; then
  echo "Restarting..."
  pm2 restart ecosystem.config.js
else
  echo "There has been no commit. Will not restart."
fi
