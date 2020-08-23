#!/usr/bin/bash
set -e
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"
cd ../ && npm install
echo $pwd
cd server/ && npm install && node setup/bucket_create.js && node setup/database_create.js
node setup/intial_load.js