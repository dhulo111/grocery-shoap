async function isAdmin(req, res, next) {
  try {
    const role = req.user.role;

    if (role == "Admin") {
      next();
    } else {
      res.status(400).json({ message: "access denide" });
    }
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = isAdmin;
