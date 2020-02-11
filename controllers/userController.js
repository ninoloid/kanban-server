const { User } = require('../models')
const { compare } = require('../helpers/hash')
const { sign } = require('../helpers/jwt')

module.exports = {
  register(req, res, next) {
    const { email, password } = req.body
    User.create({
      email,
      password
    })
      .then(user => {
        const payload = {
          id: user.id
        }
        const access_token = sign(payload)
        res
          .status(200)
          .json({ token: access_token, username: user.username })
      })
      .catch(next)
  },

  login(req, res, next) {
    const { email, password } = req.body
    User.findOne({ where: { email } })
      .then(user => {
        const valid = compare(password, user.password)
        if (!valid) {
          // invalid password
          next({ msg: "Invalid Username / Password" })
        } else {
          const payload = {
            id: user.id
          }
          const access_token = sign(payload)
          res
            .status(200)
            .json({ token: access_token, username: user.username })
        }
      })
      .catch(err => {
        // invalid email
        next({ msg: "Invalid Username / Password" })
      })
  }
}