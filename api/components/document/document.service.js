const DOCUMENTS_COLLECTION = process.env.DOCUMENTS_COLLECTION;
const VOTES_COLLECTION     = process.env.VOTES_COLLECTION;

module.exports = function(db) {

    const documents = db.collection(DOCUMENTS_COLLECTION);
    const votes = db.collection(VOTES_COLLECTION);

    const unresolvedQuery = {
        'votes.yes': { $lt: 2 },
        'votes.no': { $lt: 2 },
        'votes.maybe': { $lt: 2 },
    };
    var find = documents.find(unresolvedQuery).addCursorFlag('noCursorTimeout', true);
    var firstDocument = true;
    const getDocument = async () => {
        const document = await find.next();
        if (document) { firstDocument = false; return document; }
        else if (firstDocument) { return null; }
        else { firstDocument = true; find = documents.find(unresolvedQuery).addCursorFlag('noCursorTimeout', true); return await getDocument(); }
    };

    const hexadecimal = /^[0-9A-F]+$/i;
    const labels = ['yes', 'no', 'maybe'];
    const voteDocument = async (id, vote) => {
        const isId = typeof(id)==='string' && id.length===40 && hexadecimal.test(id);
        const isVote = typeof(vote)==='string' && labels.includes(vote);
        if (!(isId && isVote)) { throw { status:400, message:'bad parameter to PUT /document/:id' }; }
        await documents.updateOne({_id:id}, { $inc: { [`votes.${vote}`]:1 }});
        await votes.insertOne({ doc_id:id, timestamp:Date.now(), value:vote });
        return;
    };

    return {
        getDocument: getDocument,
        voteDocument: voteDocument
    };

};
