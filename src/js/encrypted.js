route.post('/<%=name%>/:id/<%=key%>', function(req, res){
    function encrypt(data) {
        return data;
    }
    let data = {
        <%=key%>: encrypt(req.body.encrypt)
    };
    db.collection('<%=name%>').updateOne({<%=key%>: req.params.id}, {$set: data}, function(err, doc){
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