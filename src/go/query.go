
/**
 * Gets the <%=name%> list by condition
 */
route.get('/<%=name%>', function(req, res){
    let cond = {};
    for (let name in req.query) {
        if (<%=list%>.indexOf(name) >= 0) {
            cond[name] = req.query[name];
        }
    }
    let offset = req.query.offset * 1 || 0;
    let limit = req.query.limit * 1 || 10;
    let cur = db.collection('<%=name%>').find(cond, <%=project%>).skip(offset).limit(limit);
    if (req.query.sortBy) {
        let sort = {};
        sort[eq.query.sortBy] = -1;
        cur.sort(sort);
    }
    cur.toArray(function(err, docs){
        /* Here you can write some logging code */
        if (err !== null) {
            return res.json({
                code: 0,
                msg: err.message,
                data: null
            }); 
        }
        res.json({
            code: 0,
            msg: 'OK',
            data: docs
        });
    });
});