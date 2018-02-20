mongorestore --drop -d $DB_NAME -c $DOCUMENTS_COLLECTION /db/sample-records.bson
mongo $DB_NAME --eval "db.$VOTES_COLLECTION.insertMany( db.$DOCUMENTS_COLLECTION.find({}, { _id:true }).map(function(doc) { return Object.assign({ yes:0, no:0, maybe:0 }, doc); }) )"
