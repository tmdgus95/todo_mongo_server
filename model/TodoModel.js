const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
    {
        id: Number,
        title: String,
        completed: Boolean,
    },
    { collection: "todos" }
);
const Todo = mongoose.model("Todo", todoSchema);
module.exports = { Todo };
