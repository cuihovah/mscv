
/**
 * Gets the <%=key%> attribute based on the <%=name%>'s ID
 */
route.get('/<%=name%>/:id/<%=key%>', function(req, res){
    db.collection('<%=name%>').findOne({<%=id%>: req.params.id}, {<%=key%>: 1}, function(err, doc){
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
            data: doc['<%=key%>']
        });
    });
});