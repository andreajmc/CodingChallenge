const express = require("express"); //  express server
const app = express(); // app object
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const db = require("./models/");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

function success(res, payload) { // Valid request received
    return res.status(200).json(payload)
}

app.get("/tasks", async (req, res, next) => { // List all tasks in the To Do List
    try {
        const tasks = await db.Tasks.find({})
        return success(res, tasks)
    } catch (err) {
        next({ status: 400, message: "Failed to get tasks in the To-Do List." })
    }
})

app.post("/tasks", async (req, res, next) => { // Create new task in list.
    try {
        const task = await db.Tasks.create(req.body)
        return success(res, task);
    } catch (err) {
        next({ status: 400, message: "Failed to create task in To-Do List." })
        console.log(err)
    }
})

app.put("/tasks/:id", async (req, res, next) => { // Update existing task in list given an ID.
    try {
        const task = await db.Tasks.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }) // Return updated task.
        return success(res, task);
    } catch (err) {
        next({ status: 400, message: "Failed to update task in To-Do List." })
    }
})
app.delete("/tasks/:id", async (req, res, next) => { // Delete existing task in list given an ID.
    try {
        await db.Tasks.findByIdAndRemove(req.params.id)
        return success(res, "task deleted!");
    } catch (err) {
        next({ status: 400, message: "Failed to delete task in To-Do List." })
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