import { Router } from "express";
import { changeReportStatus, checkAuthority, getAllReports, getAuthorityDetails, getSingleReport, loginAuthority, logoutAuthority, registerAuthority} from "../controllers/authorityController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/register").post(registerAuthority)
router.route("/login").post(loginAuthority)
router.route("/logout").get(verifyJWT, logoutAuthority)

router.route("/all-reports").get(verifyJWT, getAllReports)
router.route("/report/:reportId").get(verifyJWT, getSingleReport)
router.route("/report-change-status/:reportId").put(verifyJWT, changeReportStatus)

router.route("/get-authority-details").get(verifyJWT, getAuthorityDetails)
router.route("/check").get(verifyJWT, checkAuthority)

export default router