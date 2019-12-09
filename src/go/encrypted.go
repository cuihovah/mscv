
/**
 * Write the <%=key%> attribute based on the <%=name%>'s ID
 */
route.post('/<%=name%>/:id/<%=key%>', function(req, res){
    let __id = req.params.id;
    if ('<%=type%>' === 'objectId') {
        __id = ObjectID(__id);
    }
    function encrypt(data) {
        return data;
    }
    let data = {
        <%=key%>: encrypt(req.body.encrypt)
    };
    db.collection('<%=name%>').updateOne({<%=key%>: __id}, {$set: data}, function(err, doc){
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
            data: doc
        });
    });
});