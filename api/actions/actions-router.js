// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');

const router = express.Router();

router.use((err,req,res,next)=> {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router;