const { Task, UserProject } = require('../models')

module.exports = (req, res, next) => {
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
}