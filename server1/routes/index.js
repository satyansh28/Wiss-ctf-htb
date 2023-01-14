const express = require("express");
const multer = require("multer");
const os = require("os");
const userHomeDir = os.homedir();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `images`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorage,
  limits: {
    fieldNameSize: 300,
    fileSize: 1048576, // 10 Mb
  }
});

const route = express.Router();
const requestController = require("../controllers/index");

route.get("/", requestController.getIndex);
route.get("/complaints", requestController.getComplaints);
route.get("/maintenance", requestController.getMaintenance);
route.post("/maintenance",requestController.MaintenanceAuth);
route.post(
  "/complaints",
  upload.single("image"),
  requestController.postComplaints
);
route.post("/script",requestController.runScript);
module.exports = route;
