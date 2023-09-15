// add middlewares here related to actions
const Actions = require('./actions-model');

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action){
            res.status(404).json({
                message: 'action not found'
            })
        }else{
            req.action = action;
            next();
        }
    }catch (err){
        res.status(500).json({
            message: 'error finding action'
        })
    }
}

function validateAction(req, res, next) {
    const {project_id, description, notes} = req.body;
    if(!project_id || !description || !notes){
        res.status(400).json({
            message: 'project id, description, & notes required'
        })
    }else{
        req.project_id = project_id;
        req.description = description;
        req.notes = notes;
        next();
    }
}

module.exports = {
    validateActionId,
    validateAction
}