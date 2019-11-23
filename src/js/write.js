
/**
 * 根据<%=name%>的ID修改<%=key%>属性
 */
route.put('/<%=name%>/:id/<%=key%>', function(req, res){
    db.collection('<%=name%>').updateOne({<%=id%>: req.params.id}, {$set: {<%=key%>: req.body.<%=key%>}}, function(err, doc){
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