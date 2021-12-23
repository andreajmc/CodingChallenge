const express = require("express") //  express server
const app = express() // app object
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3000
const db = require("./models/")

app.use(bodyParser.json())

function success(res, payload) { // Valid request received
    return res.status(200).json(payload)
}

app.get("/items", async (req, res, next) => { // List all items in the To Do List
    try {
        const items = await db.Item.find({})
        return success(res, items)
    } catch (err) {
        next({ status: 400, message: "Failed to get items in the To-Do List." })
    }
})

app.post("items", async (req, res, next) => { // Create new item in list.
    try {
        const item = await db.Item.create(req.body)
        return success(res, item)
    } catch (err) {
        next({ status: 400, message: "Failed to create Item in To-Do List." })
    }
})

app.put("items/:id", async (req, res, next) => { // Update existing item in list given an ID.
    try {
        const item = await db.Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }) // Return updated item.
        return success(res, item)
    } catch (err) {
        next({ status: 400, message: "Failed to update Item in To-Do List." })
    }
})
app.delete("items/:id", async (req, res, next) => { // Delete existing item in list given an ID.
    try {
        await db.Item.findByIdAndRemove(req.params.id)
        return success(res, "Item deleted!")
    } catch (err) {
        next({ status: 400, message: "Failed to delete Item in To-Do List." })
    }
})

app.use((err, req, res, next) => {
    return res.status(err.status || 400).json({
        status: err.status || 400,
        message: err.message || "There was an error processing the request.",
    })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`) // server started
})