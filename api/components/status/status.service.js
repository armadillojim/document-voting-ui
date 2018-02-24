const DOCUMENTS_COLLECTION = process.env.DOCUMENTS_COLLECTION;

module.exports = function(db) {

    const documents = db.collection(DOCUMENTS_COLLECTION);

    const noneQuery = {
        'votes.yes':0, 'votes.no':0, 'votes.maybe':0
    };
    const oneQuery = { $or: [
        { 'votes.yes':1, 'votes.no':0, 'votes.maybe':0 },
        { 'votes.yes':0, 'votes.no':1, 'votes.maybe':0 },
        { 'votes.yes':0, 'votes.no':0, 'votes.maybe':1 }
    ]};
    const resolvedQuery = { $or: [
        { 'votes.yes':2 },
        { 'votes.no':2  },
        { 'votes.maybe':2 }
    ]};
    const resolvedUnanimousQuery = { $or: [
        { 'votes.yes':2, 'votes.no':0, 'votes.maybe':0 },
        { 'votes.yes':0, 'votes.no':2, 'votes.maybe':0 },
        { 'votes.yes':0, 'votes.no':0, 'votes.maybe':2 }
    ]};
    const getStatus = async () => {
        const total = await documents.count();
        const none = await documents.count(noneQuery);
        const one = await documents.count(oneQuery);
        const resolved = await documents.count(resolvedQuery);
        const ambiguous = total - none - one - resolved;
        const resolvedUnanimous = await documents.count(resolvedUnanimousQuery);
        const resolvedMixed = resolved - resolvedUnanimous;
        return {
            total: total,
            totalBreakdown: {
                none: none,
                one: one,
                ambiguous: ambiguous,
                resolved: resolved
            },
            resolvedBreakdown: {
                unanimous: resolvedUnanimous,
                mixed: resolvedMixed
            }
        };
    };

    return {
        getStatus: getStatus
    };

};
