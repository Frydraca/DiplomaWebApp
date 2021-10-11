export default function () {
  return function (req, res, next) {
    console.log("Validate Password");
    if (req.body.password !== req.user.password) {
      return res.status(400).send("Wrong login credentials!");
    }
    return next();
  };
}
