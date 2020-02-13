const { Task, UserProject, Project, User } = require('../models')

module.exports = {
  taskAuthorization(req, res, next) {
    const { id } = req.params
    const UserId = req.currentUserId
    Task.findOne({ where: { id } })
      .then(task => {
        if (!task) {
          next({ msg: 'Not Found' })
        } else {
          UserProject.findAll({ where: { UserId } })
            .then(projects => {
              let author = false
              projects.forEach(project => {
                if (project.ProjectId === task.ProjectId) {
                  author = true
                }
              })
              author ? next() : next({ msg: 'Not authorized' })
            })
            .catch(next)
        }
      })
      .catch(next)
  },

  projectAuthorization(req, res, next) {
    const { id } = req.params
    Project.findOne({
      where: { id },
      include: {
        model: User,
        attributes: ['id', 'username', 'email']
      }
    })
      .then(project => {
        if (!project) {
          next({ msg: 'Not Found' })
        } else {
          let author = false
          project.Users.forEach(user => {
            if (user.id === req.currentUserId) {
              author = true
            }
          })
          author ? next() : next({ msg: 'Not authorized' })
        }
      })
      .catch(next)
  },

  projectOwnerAuthorization(req, res, next) {
    const { id } = req.params
    Project.findOne({
      where: { id }
    })
      .then(project => {
        if (!project) {
          next({ msg: 'Not Found' })
        } else {
          project.authorUsername === req.currentUsername ? next() : next({ msg: "Sorry, you're not an administrator of this project" })
        }
      })
      .catch(next)
  }
}