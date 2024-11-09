import { Router } from "express";
import { getSingleReport, getSubmitedReports, getUpdatesAndCommits, getUserDetails, giveCommitOnReport, loginUser, logoutUser, registerUser, submitAbuseReport } from "../controllers/userController.js";
import {verifyJWT} from "../middlewares/authMiddleware.js"

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(verifyJWT, logoutUser)

router.route("/submit-abuse-report").post(verifyJWT, submitAbuseReport)
router.route("/submited-reports/:userId").get(verifyJWT, getSubmitedReports)
router.route("/report/:reportId").get(verifyJWT, getSingleReport)

router.route("/get-user-details").get(verifyJWT, getUserDetails)

router.route("/give-commit").post(verifyJWT, giveCommitOnReport)
router.route("/get-updates-and-commits/:reportId").get(verifyJWT, getUpdatesAndCommits)

export default router