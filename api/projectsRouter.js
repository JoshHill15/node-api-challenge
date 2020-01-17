const router = require("express").Router()
const Projects = require("../data/helpers/projectModel")

router.get("/", (req,res) => {
    Projects.get()
        .then(projects => res.status(200).json(projects))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't find projects"})
        })
})

router.post("/",(req,res) => {
    const { body } = req
    Projects.insert(body)
        .then(newProject => res.status(200).json(newProject))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "error adding projects"})
        })
})

router.delete("/:id", (req,res) => {
    const { id } = req.params
    Projects.remove(id)
        .then(deleted => res.status(200).json(deleted))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't find project to delete"})
        })
})

router.put("/:id", (req,res) => {
    const { id } = req.params
    const { body } = req
    Projects.update(id,body)
        .then(updated => res.status(200).json(updated))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't find project to update"})
        })
})

module.exports = router