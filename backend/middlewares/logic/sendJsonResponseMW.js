module.exports = function () {
  return function (req, res) {
    res.send(res.locals.retData);
  };
};
