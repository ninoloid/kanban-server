const { Project, UserProject, Task } = require('../models')

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

  // deleteProject(req, res, next) {
  //   const { id } = req.params
  //   UserProject.destroy({ where: { ProjectId: id } })
  //     .then(deleted => {
  //       if (deleted) {
  //         Project.destroy({ where: { id } })
  //           .then(deleted => {
  //             if (deleted) {
  //               res
  //                 .status(200)
  //                 .json({ "Project deleted successfully"})
  //             } else {
  //               next({ msg: "Not Found" })
  //             }
  //           })
  //       } else {
  //         next({ msg: "Not Found" })
  //       }
  //     })
  // }

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