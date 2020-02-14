module.exports = (err, req, res, next) => {
  let status = 500
  let errObj = {
    msg: "Internal Server Error"
  }

  if (err.name === 'SequelizeValidationError') {
    status = 400
    errObj.msg = 'Validation Error'
    errObj.errors = err.errors.map(error => error.message)
  } else if (err.name === 'JsonWebTokenError') {
    status = 403
    errObj.msg = 'Invalid Token'
  } else if (err.msg === 'Not Found') {
    status = 404
    errObj.msg = err.msg
  } else if (err.msg === 'Invalid Username, Email, or Password') {
    status = 400
    errObj.msg = err.msg
  } else if (err.msg === 'User has been banned') {
    status = 404
    errObj.msg = err.msg
  } else if (err.msg === 'Not authorized') {
    status = 403
    errObj.msg = err.msg
  } else if (err.status === 403) {
    status = err.status
    errObj.msg = 'This page can only be accessed by registered user'
  } else if (err.msg === 'Failed. User already registered as a collaborator') {
    status = 403
    errObj.msg = err.msg
  } else if (err.msg === 'Please login first') {
    status = 403
    errObj.msg = err.msg
  } else if (err.msg === 'User already added as project member') {
    status = 403
    errObj.msg = err.msg
  } else if (err.msg === 'Failed to add user to project. User not found') {
    status = 404
    errObj.msg = err.msg
  } else if (err.msg === "Sorry, you're not an administrator of this project") {
    status = 403
    errObj.msg = err.msg
  }

  res
    .status(status)
    .json(errObj)
}