const { Task, Category } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  showAll(req, res, next) {
    const { ProjectId } = req.body
    console.log(ProjectId)
    Task.findAll({ where: { ProjectId }, include: Category })
      .then(tasks => {
        res
          .status(200)
          .json(tasks.reverse())
      })
      .catch(next)
  },

  showOne(req, res, next) {
    Task.findOne({ where: { id: req.params.id } })
      .then(task => {
        if (!task) {
          next({ msg: "Not Found" })
        } else {
          res
            .status(200)
            .json(task)
        }
      })
      .catch(next)
  },

  searchTask(req, res, next) {
    const { words } = req.body
    Task.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${words}%` } },
          { description: { [Op.iLike]: `%${words}%` } }
        ]
      }, include: Category
    })
      .then(tasks => {
        res
          .status(200)
          .json(tasks.reverse())
      })
      .catch(next)
  },

  addTask(req, res, next) {
    const { title, description, CategoryId, ProjectId } = req.body

    Task.create({
      title,
      description,
      CategoryId,
      ProjectId
    })
      .then(created => {
        res
          .status(201)
          .json(created)
      })
      .catch(next)
  },

  updateTask(req, res, next) {
    const { id } = req.params
    const { title, description, CategoryId } = req.body

    Task.update({
      title,
      description,
      CategoryId
    }, { where: { id } })
      .then(result => {
        if (result[0]) {
          res
            .status(200)
            .json({ msg: "Task updated successfully" })
        } else {
          next({ msg: "Not Found" })
        }
      })
      .catch(next)
  },

  updateCategory(req, res, next) {
    const { id } = req.params
    const { CategoryId } = req.body

    Task.update({
      CategoryId
    }, { where: { id } })
      .then(result => {
        if (result[0]) {
          res
            .status(200)
            .json({ msg: "Task category updated successfully" })
        } else {
          next({ msg: "Not Found" })
        }
      })
      .catch(next)
  },

  deleteTask(req, res, next) {
    const { id } = req.params
    Task.destroy({ where: { id } })
      .then(result => {
        if (!result) {
          next({ msg: "Not Found" })
        } else {
          res
            .status(200)
            .json({ msg: "Task deleted successfully" })
        }
      })
      .catch(next)
  }
}