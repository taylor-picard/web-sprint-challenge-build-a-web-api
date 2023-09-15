// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model');

const router = express.Router();

router.get('/api/projects', (req, res, next)=> {
    Projects.get(req.params.id)
    .then(projs => {
        res.json(projs)
    })
    .catch(next)
})

router.use((err,req,res,next)=> {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router;