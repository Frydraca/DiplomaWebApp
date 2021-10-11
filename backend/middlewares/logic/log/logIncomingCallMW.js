export default function () {
  return function (req, res, next) {
    // console.log(`\n\nA call came to ${req.path}`);
    return next();
  };
}
