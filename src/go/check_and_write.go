
route.put('/<%=name%>/:id/<%=key%>', function(req, res){
    let __id = req.params.id;
    if ('<%=type%>' === 'objectId') {
        __id = ObjectID(__id);
    }
    function check(token, callback) {
        /* This is the logic of validation, as long as you add token here */
        return callback(token);
    }
    check(true, function(data){
        if (data === true) {
            return db.collection('<%=name%>').updateOne({<%=id%>: __id}, {$set: {<%=key%>: req.body.<%=key%>}}, function(err, doc){
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
                    data: doc.<%=key%>
                });
            });
        } else {
            return res.json({
                code: 0,
                msg: 'OK',
                data: doc['<%=key%>']
            });
        }
    });
});