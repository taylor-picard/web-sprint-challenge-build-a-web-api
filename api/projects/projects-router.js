// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model');
const {validateProjId, validateProject, validateProjActions} = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next)=> {
    Projects.get(req.params.id)
        .then(proj => {
            res.json(proj)
        })
        .catch(next);
})

router.get('/:id', validateProjId, (req, res)=>{
    res.json(req.project)
})

router.post('/', validateProject, (req, res, next)=> {
    Projects.insert(req.body)
    .then(newProj => {
        res.status(201).json(newProj)
    })
    .catch(next);
})

router.put('/:id', validateProjId, validateProject, (req, res, next)=> {
    Projects.update(req.params.id, req.body)
    .then(()=> {
        return Projects.get(req.params.id)
    })
    .then(project => {
        res.json(project)
    })
    .catch(next)
})

router.delete('/:id', validateProjId, async (req, res, next)=> {
    try{
        await Projects.remove(req.params.id)
        res.json(req.project)
    } catch (err){
        next(err)
    }
})

router.get('/:id/actions', validateProjId, validateProjActions, async (req, res, next)=> {
    try{
        const projActions = await Projects.getProjectActions(req.params.id)
        res.json(projActions)
    }catch (err) {
        next(err)
    }
})


router.use((err,req,res,next)=> {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router;