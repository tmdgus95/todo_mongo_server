const express = require("express");
const path = require("path");
const config = require("./config/key");
const app = express();
const port = 5000;
app.use(express.static(path.join(__dirname, "../client/build")));
const mongoose = require("mongoose");
const { Todo } = require("./model/TodoModel");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    mongoose
        .connect(config.mongoURI)
        .then(() => {
            console.log("성공");
        })
        .catch((err) => {
            console.log(`db 연결 실패${err}`);
        });

    console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.get("/home", (req, res) => {
    res.send("왔군요");
});

app.post("/api/post/submit", (req, res) => {
    let temp = req.body;
    const todoPost = new Todo(temp);
    todoPost
        .save()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((error) => {
            res.status(400).json({ success: false });
        });
});

app.post("/api/post/list", (req, res) => {
    console.log("전체목록 호출");
    Todo.find({})
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, initTodo: doc });
        })
        .catch((error) => {
            res.status(400).json({ success: false });
        });
});
