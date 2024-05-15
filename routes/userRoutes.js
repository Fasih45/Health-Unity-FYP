const express = require("express");
const router = express.Router();
const authenticateTokenPatient = require("../middleware/authMiddlewarepatient");
const authenticateTokenDocter = require("../middleware/authMiddlewareDocter");
const {
  registerUserasPatient,
  loginUserasPatient,
  verifyCodeAndLoginasPatient,
  registerUserasDoctor,
  loginUserasDocter,
  verifyCodeAndLoginasDocter,
  registerMedicalLab,
  loginUserasMedicallab,
  verifyCodeAndLoginasMedicallab,
  registerPharmacy,
  loginUserasPharmacy,
  verifyCodeAndLoginasPhamacy,
  verifyemailforpasscode,
  changepass,
} = require("../controllers/userController");

router.post("/patient/register", registerUserasPatient);
router.post("/patient/login", loginUserasPatient);
router.get("/patient/protected", authenticateTokenPatient, (req, res) => {
  res.json({ message: "Access granted! This route requires a valid token." });
});
router.post("/patient/verify", verifyCodeAndLoginasPatient);

router.post("/doctor/register", registerUserasDoctor);
router.post("/doctor/login", loginUserasDocter);
router.post("/doctor/verify", verifyCodeAndLoginasDocter);
router.get("/docter/protected", authenticateTokenDocter, (req, res) => {
  res.json({ message: "Access granted! This route requires a valid token." });
});
router.post("/medical_labs/register", registerMedicalLab);
router.post("/medical_labs/login", loginUserasMedicallab);
router.post("/medical_labs/verify", verifyCodeAndLoginasMedicallab);

router.post("/pharmacy/register", registerPharmacy);
router.post("/pharmacy/login", loginUserasPharmacy);
router.post("/pharmacy/verify", verifyCodeAndLoginasPhamacy);
router.post("/forget/verify", verifyemailforpasscode);
router.post("/changepassword",changepass);

module.exports = router;
