const router = require("express").Router()
const Projects = require("../data/helpers/projectModel")
const Actions = require("../data/helpers/actionModel")


router.get("/", (req,res) => {
    Projects.get()
        .then(projects => res.status(200).json(projects))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't find projects"})
        })
})

router.get("/:id/actions",(req,res) => {
    const { id } = req.params
    Projects.getProjectActions(id)
        .then(projectActions => res.status(200).json(projectActions))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't find actions for project "})

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

router.delete("/:id", validateId, (req,res) => {
    const { id } = req.params
    Projects.remove(id)
        .then(deleted => res.status(200).json(deleted))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't find project to delete"})
        })
})

// router.delete("/:id", (req,res) => {
//     const { id } = req.params
//     Projects.remove(id)
//         .then(deleted => {
//             if (deleted) res.status(200).json(deleted)
//             else res.status(400).json({error: "no project to delete with this id"})
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({error: "can't find project to delete"})
//         })
// })

// router.put("/:id", validateId, (req,res) => {
//     const { id } = req.params
//     const { body } = req
//     Projects.update(id,body)
//         .then(updated => res.status(200).json(updated))
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({error: "can't find project to update"})
//         })
// })

router.put("/:id", (req,res) => {
    const { id } = req.params
    const { body } = req
    Projects.update(id,body)
        .then(updated => {
            if (updated) res.status(200).json(updated)
            else res.status(400).json({error: "no user to update with this id"})
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't find project to update"})
        })
})

function validateId(req,res,next){
    const { id } = req.params
    console.log(Projects)
    Projects.get()
        .then(projects => {
            const projectsId = projects.map(cv => cv.id)
            console.log(projectsId,id)
            console.log("cmon become true",projectsId.indexOf(id))
            if (projectsId.includes(id)) next()
            else res.status(400).json({error: "no project with this id found"})
        })
        .catch(err => {
            res.status(500).json({error: "can't find projects"})
            console.log(err)
        })
}

module.exports = router