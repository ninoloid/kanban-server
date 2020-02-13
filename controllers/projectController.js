const { Project, UserProject, Task, User } = require('../models')

module.exports = {
  addProject(req, res, next) {
    const { name } = req.body
    const UserId = req.currentUserId
    const authorUsername = req.currentUsername
    Project.create({
      name,
      authorUsername
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
    Project.findAll({
      include: {
        model: User,
        attributes: ['id', 'username', 'email']
      }
    })
      .then(projects => {
        const filtered = []
        projects.forEach(project => {
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
  },

  addPersonToProject(req, res, next) {
    const { identification, ProjectId } = req.body
    let UserId;
    User.findOne({ where: { username: identification } })
      .then(user => {
        if (!user) {
          return User.findOne({ where: { email: identification } })
        } else return user
      })
      .then(user => {
        if (user) {
          UserId = user.id
          UserProject.findOne({ where: { UserId: user.id, ProjectId } })
            .then(project => {
              if (!project) {
                return UserProject.create({
                  UserId,
                  ProjectId
                })
              } else {
                next({ msg: "User already added as project member" })
              }
            })
            .then(created => {
              if (!created) {
                next({ msg: "Failed to add member to this project" })
              } else {
                res
                  .status(201)
                  .json({ msg: `User '${identification}' added to project` })
              }
            })
            .catch(next)
        } else {
          next({ msg: "Failed to add user to project. User not found" })
        }
      })
      .catch(next)
  },

  getUserOnProject(req, res, next) {
    const { id } = req.params
    Project.findOne({
      where: {
        id
      },
      include: {
        model: User,
        attributes: ['id', 'username', 'email']
      }
    })
      .then(project => {
        if (!project) {
          next({ msg: "Not Found" })
        } else {
          res
            .status(200)
            .json(project)
        }
      })
      .catch(next)
  },

  deletePersonFromProject(req, res, next) {
    const { id } = req.params
    const { UserId } = req.body
    UserProject.destroy({ where: { UserId, ProjectId: id } })
      .then(deleted => {
        if (deleted) {
          res
            .status(200)
            .json({ msg: "User successfully deleted from project member" })
        } else {
          next({ msg: "Not Found" })
        }
      })
      .catch(next)
  }
}