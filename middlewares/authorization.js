const { Task, UserProject, Project } = require('../models')

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
    console.log('idnyaaaaaaaa', id)
    Project.findAll({ where: { id } })
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
  }
}