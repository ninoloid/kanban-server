const { Task, User } = require('../models')

module.exports = (req, res, next) => {
  const { id } = req.params
  Task.findOne({ where: { id }, include: User })
    .then(task => {
      if (!task) {
        next({ msg: 'Not Found' })
      } else {
        let author = false
        task.Users.forEach(user => {
          if (user.id === req.currentUserId) {
            author = true
          }
        });
        author ? next() : next({ msg: 'Not authorized' })
      }
    })
    .catch(err => next(err))
}