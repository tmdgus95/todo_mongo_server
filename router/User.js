// User 를 위한 라우터
let express = require("express");
let router = express.Router();

// User 모델을 가지고 온다.
const { User } = require("../model/UserModel");

// 사용자 가입 등록
router.post("/register", (req, res) => {
    // console.log(req.body);
    const userData = new User(req.body);
    userData
        .save()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        });
});

// 이름 중복 검사
router.post("/namecheck", (req, res) => {
    // console.log(req.body.displayName);
    User.findOne({ displayName: req.body.displayName })
        .exec()
        .then((doc) => {
            // console.log(doc);
            // 사용자가 기본값으로 등록가능
            let check = true;
            if (doc) {
                // 만약 사용자 정보가 있다면 등록 불가능으로 리턴
                check = false;
            }
            res.status(200).json({ success: true, check });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        });
});

// 사용자 정보 업데이트
router.post("/update", (req, res) => {
    let temp = {
        email: req.body.email,
        displayName: req.body.displayName,
        uid: req.body.uid,
    };
    console.log(temp);
    User.updateOne({ uid: req.body.uid }, { $set: temp })
        .exec()
        .then(() => {
            console.log("completed 업데이트 완료");
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        });
});

module.exports = router;
