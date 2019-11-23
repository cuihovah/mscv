/**
 * Get the <%=name%> list by IDs
 */
route.get('/<%=name%>/list', function(req, res){
    let cond = {};
    let ids = req.query.id.split(',');
    cond.<%=key%> = {$in: ids};
    let cur = db.collection('<%=name%>').find(cond, <%=project%>).skip(req.query.offset).limit(req.query.limit);
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

/**
 * Get the <%=name%> info by ID
 */
route.get('/<%=name%>/:id', function(req, res){
    return db.collection('<%=name%>').findOne({<%=key%>: req.params.id}, <%=project%>, function(err, doc){
        /* Here you can write some logging code */
        if (err !== null) {
            return res.json({
                code: 0,
                msg: err.message,
                data: null
            }); 
        }
        return res.json({
            code: 0,
            msg: 'OK',
            data: doc
        });
    });
});

/**
 * Create a <%=name%> instance
 */
route.post('/<%=name%>', function(req, res){
    return db.collection('<%=name%>').insertOne(req.body, function(err, data){
        /* Here you can write some logging code */
        if (err !== null) {
            return res.json({
                code: 0,
                msg: err.message,
                data: null
            }); 
        }
        return res.json({
            code: 0,
            msg: 'OK',
            data: data
        });
    });
});