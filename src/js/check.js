route.put('/<%=name%>/:id/<%=key%>_check', function(req, res){
    function encrypt(data) {
        return data;
    }
    db.collection('<%=name%>').findOne({<%=id%>: req.params.id, <%=key%>: encrypt(req.body.encrypt)}, function(err, doc){
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