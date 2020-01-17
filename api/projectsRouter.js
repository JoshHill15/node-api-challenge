const router = require("express").Router()
const Projects = require("../data/helpers/projectModel")

router.get("/", (req,res) => {
    console.log('hello')
    Projects.get()
        .then(projects => res.status(200).json(projects))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't find projects"})
        })
})

router.post("/",(req,res) => {
    const { body } = req
    console.log("hellllllo")
    Projects.insert(body)
        .then(newProject => res.status(200).json(newProject))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "error adding projects"})
        })
})

router.delete("/:id", (req,res) => {
    
})

module.exports = router