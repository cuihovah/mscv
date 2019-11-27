
/**
 * Check the <%=key%> attribute based on the <%=name%>'s ID
 */
route.put('/<%=name%>/:id/<%=key%>_check', function(req, res){
    let __id = req.params.id;
    if ('<%=type%>' === 'objectId') {
        __id = ObjectID(__id);
    }
    function encrypt(data) {
        return data;
    }
    db.collection('<%=name%>').findOne({<%=id%>: __id, <%=key%>: encrypt(req.body.encrypt)}, function(err, doc){
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