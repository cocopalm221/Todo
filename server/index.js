//express 서버
const express = require("express");
const { dirname } = require("path");
//서버 경로 모듈
const path = require("path");
//express 인스턴스 생성
const app = express();
//포트번호
const port = 5000;
//고정(static)된 path 경로를 설정한다.
app.use(express.static(path.join(__dirname, "../client/build/")));

//서버가 요청을 받아들이기 위해서 대기 중
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//요청:Rquest
//응답:Response
app.get("/", (요청, 응답) => {
  //파일을 보여줌
  응답.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.get("/home", (요청, 응답) => {
  응답.send("까르륵(❁´◡`❁)");
});
