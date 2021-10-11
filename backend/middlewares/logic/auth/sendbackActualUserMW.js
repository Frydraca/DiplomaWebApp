export default function () {
  return function (req, res, next) {
    res.locals.retData = {
      id: req.user.id,
      email: req.user.email,
      userName: req.user.userName,
    };
    return next();
  };
}
