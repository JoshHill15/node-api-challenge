const router = require("express").Router()
const Actions = require("../data/helpers/actionModel")


router.get("/", (req,res) => {
    Actions.get()
        .then(action => res.status(200).json(action))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't find actions"})
        })
})

router.post("/", (req,res) => {
    const { body } = req
    Actions.insert(body)
        .then(newAction => res.status(200).json(newAction))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't add action"})
        })
})

router.delete("/:id", (req,res) => {
    const { id } = req.params
    Actions.remove(id)
        .then(deleted => res.status(200).json(deleted))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't find action to delete"})
        })
})

router.put("/:id", (req,res) => {
    const { body } = req
    const { id } = req.params
    Actions.update(id,body)
        .then(updated => res.status(200).json(updated))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "can't find action to update"})
        })
})


module.exports = router