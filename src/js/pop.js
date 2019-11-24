
/**
 * Pop item from <%=name%>.<%=key%> array.
 */
route.delete('/<%=name%>/:id/<%=key%>', function(req, res){
    db.collection('<%=name%>').updateOne({<%=id%>: req.params.id}, {$pop: {<%=key%>: 1}}, function(err, doc){
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