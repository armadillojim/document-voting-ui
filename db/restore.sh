# create documents collection from data, paint with zero votes, and index on votes
mongorestore --drop -d $DB_NAME -c $DOCUMENTS_COLLECTION --gzip /db/sample-records.bson.gz
mongo $DB_NAME --eval "db.$DOCUMENTS_COLLECTION.updateMany({}, { \$set: { votes: { yes:0, no:0, maybe:0 } } });"
mongo $DB_NAME --eval "db.$DOCUMENTS_COLLECTION.createIndex({ \"votes.yes\":1, \"votes.no\":1, \"votes.maybe\":1 });"
# db.$VOTES_COLLECTION implicitly created on first insertion
