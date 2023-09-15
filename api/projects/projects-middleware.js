// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateProjId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if(!project){
            res.status(404).json({
                message: 'project not found'
            })
        }else{
            req.project = project;
            next();
        }
    } catch (err) {
        res.status(500).json({
            message: 'error finding project'
        })
    }
}

function validateProject(req, res, next) {
    const {name, description, completed} = req.body;
    if(!name || !description || completed == null){
        res.status(400).json({
            message: 'name and description required'
        })
    }else{
        req.name = name.trim();
        req.description = description.trim();
        req.completed = completed;
        next();
    }
}

function validateProjActions(req, res, next) {
    const {actions} = req.body;
        req.actions = actions;
        next();
}

module.exports = {
    validateProjId,
    validateProject,
    validateProjActions
}