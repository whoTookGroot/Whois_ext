#!/bin/bash

# Cron job to run, on command line enter:
# crontab -e
# In the editor, enter the following cron directive. there are 6 fields, blank fields are indicated 
# by an asteriks (*). Fields are separated by a single space.
# The following directive runs the sweeper.sh script every day at 1am::
# 0 1 * * * /path/to/sweeper.sh
echo "Removing entries for db:table -> domains:domains..."
echo 'Delete from domains;alter sequence domains_id_seq restart;' | /usr/local/bin/psql domains
echo "Entries removed"
