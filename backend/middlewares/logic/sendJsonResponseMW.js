module.exports = function () {
  return function (req, res) {
    console.log("Send response");
    res.send(res.locals.retData);
  };
};
