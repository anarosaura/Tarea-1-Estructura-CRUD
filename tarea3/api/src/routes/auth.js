const router = require('express').Router()

router.get('', (req, res)=>{
    res.send('auth works!');
})

module.exports = router;