module.exports = (req, res, next) => {
  res.locals.isAuth = req.session.isAuthenticated
  res.locals.tkn = req.csrfToken()
  next()
}