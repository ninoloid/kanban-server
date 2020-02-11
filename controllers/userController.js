const { User } = require('../models')
const { compare } = require('../helpers/hash')
const { sign } = require('../helpers/jwt')
const { Op } = require('sequelize')

module.exports = {
  register(req, res, next) {
    const { username, email, password } = req.body
    User.create({
      username,
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
    const { identification, password } = req.body
    User.findOne({
      where: {
        [Op.or]: [
          { username: identification },
          { email: identification }
        ]
      }
    })
      .then(user => {
        const valid = compare(password, user.password)
        if (!valid) {
          // invalid password
          next({ msg: "Invalid Username, Email, or Password" })
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
        next({ msg: "Invalid Username, Email, or Password" })
      })
  }
}