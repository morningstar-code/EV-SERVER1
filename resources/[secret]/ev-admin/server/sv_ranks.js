global.exports('getRank', (rank) => {
    const RankValue = {
        'user': 0,
        'helper': 1,
        'admin': 2,
        'dev': 3,
        'owner': 4
    };
    
    return RankValue[rank] || 0;
});