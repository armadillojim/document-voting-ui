module.exports = function(documentService) {

    const getDocument = async () => {
        const document = await documentService.getDocument();
        if (document) { return document; }
        else { throw { status:404, message:'No unresolved documents in collection' }; }
    };
    const voteDocument = async (id, vote) => {
        await documentService.voteDocument(id, vote);
        return;
    };

    return {
        getDocument: getDocument,
        voteDocument: voteDocument
    };

};
