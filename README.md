# mscv
A language that defines a schema that can automatically generate code

## Example
### input
```
user {
    *_id: objectId,
    name: string[<?@>],
    password: string[&^],
    +phone: string[<@+->]
}
```

### output
```javascript
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
 * 根据user的ID修改name属性
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
 * 根据user的ID获取name属性
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
route.post('/user/:id/password', function(req, res){
    function encrypt(data) {
        return data;
    }
    let data = {
        password: encrypt(req.body.encrypt)
    };
    db.collection('user').updateOne({password: req.params.id}, {$set: data}, function(err, doc){
        res.json({
            code: 0,
            msg: 'OK',
            data: doc
        });
    });
});
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
route.post('/user/:id/phone', function(req, res){
    db.collection('user').updateOne({_id: req.params.id}, {$push: {phone: req.body.phone}}, function(err, doc){
        res.json({
            code: 0,
            msg: 'OK',
            data: doc.phone
        });
    });
});
route.delete('/user/:id/phone', function(req, res){
    db.collection('user').updateOne({_id: req.params.id}, {$pop: {phone: 1}}, function(err, doc){
        res.json({
            code: 0,
            msg: 'OK',
            data: doc.phone
        });
    });
});

/**
 * 根据user的ID修改phone属性
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

/**
 * 根据user的ID获取phone属性
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
```

## Usage
```shell
    $ npm install
    $ node bin/mscv.js schema/user.schema
```

## Grammar

```
[SCHEMA NAME] {
    [KEY PROPERTY][KEY NAME]: [TYPE]\[VALUE PROPERTY\],
}
```

### Key property
- \* : Uniqueness representation
- \+ : Array

### Value property
- < : Read
- \> : Write
- ^ : Check
- & : encrypt
- \+ : push
- \- : pop

## Features
- Node.js Express.js

## Todos
- Golang Gin