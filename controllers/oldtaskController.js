const { Task, UserTask, User } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  showAll(req, res, next) {
    Task.findAll({ include: User })
      .then(tasks => {
        const filtered = []
        tasks.forEach(task => {
          task.Users.forEach(user => {
            if (user.id === req.currentUserId) {
              filtered.push(task)
            }
          })
        })
        res
          .status(200)
          .json(filtered.reverse())
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
      }, include: User
    })
      .then(tasks => {
        const filtered = []
        tasks.forEach(task => {
          task.Users.forEach(user => {
            if (user.id === req.currentUserId) {
              filtered.push(task)
            }
          })
        })
        res
          .status(200)
          .json(filtered.reverse())
      })
      .catch(next)
  },

  addTask(req, res, next) {
    const UserId = req.currentUserId
    const { title, description, CategoryId, ProjectId } = req.body

    Task.create({
      title,
      description,
      CategoryId
    })
      .then(created => {
        UserTask.findOne({ where: UserId })
          .then(task => {
            if (task) {
              UserTask.findAll({ where: { TaskId: task.TaskId } })
                .then(users => {
                  users.forEach(user => {
                    UserTask.create({
                      UserId: user.UserId,
                      TaskId: created.id
                    })
                      .then(() => {
                        res
                          .status(201)
                          .json(created)
                      })
                      .catch(next)
                  });
                })
                .catch(next)
            } else {
              UserTask.create({
                UserId,
                TaskId: created.id
              })
                .then(() => {
                  res
                    .status(201)
                    .json(created)
                })
                .catch(next)
            }
          })
          .catch(next)
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
          UserTask.destroy({ where: { TaskId: req.params.id } })
          res
            .status(200)
            .json({ msg: "Task deleted successfully" })
        }
      })
      .catch(next)
  }

}