import express from 'express'
import config from '../config.js'
import Project from '../models/Project.js'

const router = express.Router();

function response(res, code = 500, textMessage = 'Internal server error') {
    let body = textMessage
    if (typeof(textMessage) == String) {
        body = {'message': textMessage}
    }
    res.status(code).json(body)
}

router.get('/projects', async (req,res) => {
    try {
        const projects = await Project.find()
        response(res,200,projects)
    } catch (error) {
        console.log(error)
        response(res)
    }
}) // get all projects

router.get('/project/:id', async (req,res) => {
    try {
        const project = await Project.findById(req.params.id)
        if (!project) return response(res,404)
        response(res,200,project)
    } catch (error) {
        console.log(error)
        response(res)
    }
}) // get specific project

router.get('/projects/user/:userid', async (req,res) => {
    try {
        const projects = await Project.find({"userid": req.params.userid})
        response(res,200,projects)
    } catch (error) {
        console.log(error)
        response(res)
    }
    console.log(req.params.userid)
}) // get all user related projects

router.post('/project/:userid', async (req,res) => {
    try {
        const {name,completed,desc,location} = req.body
        const newProject = new Project({name,completed,desc,location,"userid": req.params.userid})
        const savedProject = await newProject.save()
        response(res,200,savedProject)
    } catch (error) {
        console.log(error)
        response(res)
    }
}) // create new project

router.put('/project/:id', async (req,res) => {
    try {
        const {name,completed,desc,location} = req.body
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {name,completed,desc,location},
            {new:true}
        )
        if (!project) return response(res,404)
        response(res,200,project)
    } catch (error) {
        console.log(error)
        response(res)
    }
}) // upd cur proj

router.delete('/project/:id', async (req,res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        if (!project) return response(res,404)
        response(res,200,project)
    } catch (error) {
        console.log(error)
        response(res)
    }
}) // delete proj

export default router