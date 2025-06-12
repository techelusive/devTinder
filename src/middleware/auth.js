const adminAuth = (req, res, next) => {
  console.log("user auth is getting checked");
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";

  if (!isAdminAuthorised) {
    res.status(401).send("unauthorised user");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
