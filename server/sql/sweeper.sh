#!/bin/bash


echo "Removing entries for db:table -> domains:domains..."
echo 'Delete from domains;alter sequence domains_id_seq restart;' | /usr/local/bin/psql domains
echo "Entries removed"
