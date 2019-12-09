
/**
 * Updates the <%=key%> attribute based on the <%=name%>'s ID
 */
route.put('/<%=name%>/:id/<%=key%>', function(req, res){
    let __id = req.params.id;
    if ('<%=type%>' === 'objectId') {
        __id = ObjectID(__id);
    }
    db.collection('<%=name%>').updateOne({<%=id%>: __id}, {$set: {<%=key%>: req.body.<%=key%>}}, function(err, doc){
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
});