const { Project, UserProject, Task, User } = require('../models')

module.exports = {
  addProject(req, res, next) {
    const { name } = req.body
    const UserId = req.currentUserId
    Project.create({
      name
    })
      .then(project => {
        return UserProject.create({
          UserId,
          ProjectId: project.id
        })
      })
      .then(() => {
        res
          .status(201)
          .json({ msg: `Project '${name}' has been created` })
      })
      .catch(next)
  },

  getProject(req, res, next) {
    Project.findAll({ include: User })
      .then(projects => {
        const filtered = []
        projects.forEach(project => {
          // res.send(project.Users)
          project.Users.forEach(user => {
            if (user.id === req.currentUserId) {
              filtered.push(project)
            }
          })
        })
        res.status(200).json(filtered)
      })
      .catch(next)
  },

  deleteProject(req, res, next) {
    const { id } = req.params

    const deleteFromUserProject = UserProject.destroy({ where: { ProjectId: id } })
    const deleteFromProject = Project.destroy({ where: { id } })
    const deleteFromTask = Task.destroy({ where: { ProjectId: id } })

    Promise.all([deleteFromUserProject, deleteFromProject, deleteFromTask])
      .then(values => {
        if (values[0] === 1 && values[1] === 1) {
          res
            .status(200)
            .json({ msg: "Project deleted successfully" })
        } else {
          next({ msg: "Not Found" })
        }
      })
      .catch(next)
  }
}