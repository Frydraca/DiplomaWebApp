import requireOption from "../../../config/requireOption.js";

export default function (objectrepository) {
  const Script = requireOption(objectrepository, "Script");

  return function (req, res, next) {
    if (res.locals.script != undefined) {
      res.locals.script.content = req.body.content;
      res.locals.script.workspace = req.body.workspace;
      res.locals.script.lastModified = Date.now();
      res.locals.script.markModified("content");
      res.locals.script.markModified("workspace");
      res.locals.script.markModified("lastModified");

      res.locals.script.save(function (err) {
        if (err) {
          console.log("Error: update failed");
          return next(err);
        }
        return next();
      });
    }
    return next();
  };
}
