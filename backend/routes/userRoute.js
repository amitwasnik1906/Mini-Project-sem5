import { Router } from "express";
import { getSingleReport, getSubmitedReports, getUserDetails, loginUser, logoutUser, registerUser, submitAbuseReport } from "../controllers/userController.js";
import {verifyJWT} from "../middlewares/authMiddleware.js"

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)

router.route("/submit-abuse-report").post(verifyJWT, submitAbuseReport)
router.route("/submited-reports/:userId").get(verifyJWT, getSubmitedReports)
router.route("/report/:reportId").get(verifyJWT, getSingleReport)

router.route("/get-user-details").get(verifyJWT, getUserDetails)

export default router