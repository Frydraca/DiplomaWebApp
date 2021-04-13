module.exports = function () {
  return function (req, res) {
    console.log("Send response");
    console.log(res.locals.retData);
    res.send(res.locals.retData);
  };
};
