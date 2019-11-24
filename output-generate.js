/**
 * Get the user list by IDs
 */
route.get('/user/list', function(req, res){
    let cond = {};
    let ids = req.query.id.split(',');
    cond._id = {$in: ids};
    let cur = db.collection('user').find(cond, {"name":1,"phone":1}).skip(req.query.offset).limit(req.query.limit);
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
 * Get the user info by ID
 */
route.get('/user/:id', function(req, res){
    return db.collection('user').findOne({_id: req.params.id}, {"name":1,"phone":1}, function(err, doc){
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
 * Create a user instance
 */
route.post('/user', function(req, res){
    return db.collection('user').insertOne(req.body, function(err, data){
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
/**
 * Gets the user list by condition
 */
route.get('/user', function(req, res){
    let cond = {};
    for (let name in req.query) {
        if (["name"].indexOf(name) >= 0) {
            cond[name] = req.query[name];
        }
    }
    let cur = db.collection('user').find(cond, {"name":1,"phone":1}).skip(req.query.offset).limit(req.query.limit);
    if (req.query.sortBy) {
        let sort = {};
        sort[eq.query.sortBy] = -1;
        cur.sort(sort);
    }
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
 * Gets the name attribute based on the user's ID
 */
route.get('/user/:id/name', function(req, res){
    db.collection('user').findOne({_id: req.params.id}, {name: 1}, function(err, doc){
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
            data: doc['name']
        });
    });
});

/**
 * Updates the name attribute based on the user's ID
 */
route.put('/user/:id/name', function(req, res){
    db.collection('user').updateOne({_id: req.params.id}, {$set: {name: req.body.name}}, function(err, doc){
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
            data: doc.name
        });
    });
});

/**
 * Write the password attribute based on the user's ID
 */
route.post('/user/:id/password', function(req, res){
    function encrypt(data) {
        return data;
    }
    let data = {
        password: encrypt(req.body.encrypt)
    };
    db.collection('user').updateOne({password: req.params.id}, {$set: data}, function(err, doc){
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

/**
 * Check the password attribute based on the user's ID
 */
route.put('/user/:id/password_check', function(req, res){
    function encrypt(data) {
        return data;
    }
    db.collection('user').findOne({_id: req.params.id, password: encrypt(req.body.encrypt)}, function(err, doc){
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

/**
 * Push item into user.phone array.
 */
route.post('/user/:id/phone', function(req, res){
    db.collection('user').updateOne({_id: req.params.id}, {$push: {phone: req.body.phone}}, function(err, doc){
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
            data: doc.phone
        });
    });
});

/**
 * Pop item from user.phone array.
 */
route.delete('/user/:id/phone', function(req, res){
    db.collection('user').updateOne({_id: req.params.id}, {$pop: {phone: 1}}, function(err, doc){
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
            data: doc.phone
        });
    });
});

/**
 * Gets the phone attribute based on the user's ID
 */
route.get('/user/:id/phone', function(req, res){
    db.collection('user').findOne({_id: req.params.id}, {phone: 1}, function(err, doc){
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
            data: doc['phone']
        });
    });
});

/**
 * Updates the phone attribute based on the user's ID
 */
route.put('/user/:id/phone', function(req, res){
    db.collection('user').updateOne({_id: req.params.id}, {$set: {phone: req.body.phone}}, function(err, doc){
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
            data: doc.phone
        });
    });
});

