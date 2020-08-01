const { ObjectID } = require("mongodb");
const createError = require("http-errors");
const _ = require("lodash");
const Todo = require("./todo-model");
const {
  TEXT_VALUE_EMPTY,
  ID_VALUE_EMPTY,
  INVALID_ID,
  NO_TODO_WITH_ID,
  ERROR_OCCURED,
} = require("../constants/constants");

exports.list = async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    return res.json(todos);
  } catch (err) {
    return next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    // GOOD TASTE CODE HANDLING
    const text = _.get(req, "body.text", "");
    if (!text) {
      return next(new createError(400, TEXT_VALUE_EMPTY));
    }
    const todo = await Todo.create({
      text: text,
    });
    return res.json(todo);
  } catch (err) {
    return next(err);
  }
};

exports.removeById = async (req, res, next) => {
  // GOOD TASTE CODE HANDLING
  const id = _.get(req, "params.id", "");
  if (!id) {
    return next(new createError(400, ID_VALUE_EMPTY));
  }
  if (!ObjectID.isValid(id)) {
    return next(new createError(400, INVALID_ID));
  }
  try {
    const todo = await Todo.findOneAndRemove({
      _id: id,
    });
    if (!todo) {
      return next(new createError(404, NO_TODO_WITH_ID));
    }
    return res.json(todo);
  } catch (err) {
    return next(new createError(400, ERROR_OCCURED));
  }
};
