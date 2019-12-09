/* Here you can write some logging code */
if (err !== null) {
    return res.json({
        code: 0,
        msg: err.message,
        data: null
    }); 
}