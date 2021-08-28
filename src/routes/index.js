const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

const routes = app => {
    router.post("/upload", controller.upload);
    router.get("/file", controller.getFiles);
    router.get("/file/:name", controller.download);

    app.use(router);
};

module.exports = routes;