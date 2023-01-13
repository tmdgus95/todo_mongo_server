// express 서버
const express = require("express");
// 서버 경로 모듈
const path = require("path");

// mongoose 모듈
const mongoose = require("mongoose");
// const { Todo } = require("./model/TodoModel.js");

var cors = require("cors");

// 개발 인증관련
const config = require("./config/key.js");

// express 인스턴스 생성
const app = express();
// 포트번호
const port = 5000;

let corsOptions = {
    origin: "*", // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};
app.use(cors(corsOptions));

// 고정된(Static) Path 경로를 설정한다.
app.use(express.static(path.join(__dirname, "./build")));
// 요청이 들어오면 json 사용 및 url 인코딩 진행해줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Post 관련 Router 연결
app.use("/api/post", require("./router/Post.js"));
// User 관련 Router 연결
app.use("/api/user", require("./router/User.js"));

// 서버가 요청을 받아들이기 위해서 대기 중.
app.listen(port, () => {
    // MONGODB 관련
    mongoose
        .connect(config.mongoURI)
        .then(() => {
            console.log("DB 연결 성공");
            console.log(`Example app listening on port ${port}`);
        })
        .catch((err) => {
            console.log(`DB 연결 실패 ${err}`);
        });
});

// 요청 : Request
// 응답 : Response
app.get("/", (req, res) => {
    // 파일을 보여줌
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// 주소가 없는 경우에 강제 URL 이동
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
