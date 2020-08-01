const express = require("express");
const todoCtrl = require("../todos/todo-controller");

const router = express.Router();

router
  .route("/todos")
  .get((...params) => todoCtrl.list(...params))
  .post((...params) => todoCtrl.create(...params));

router
  .route("/todos/:id")
  .delete((...params) => todoCtrl.removeById(...params));

module.exports = router;
