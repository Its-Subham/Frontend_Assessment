import express from "express";
import { claimPoints, getAllUser, getMonthlyData, getTodayHistory, getUserHistory, getWeeklyData, getUserWithHelpOfUsername } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/get-users", getAllUser);
// router.post("/get-users-info", verifyToken, getUserWithHelpOfToken);
// router.post("/get-users-info", verifyToken, getUserWithHelpOfId);
router.post("/get-users-info-byusername", getUserWithHelpOfUsername);
router.patch("/claim-points", claimPoints);
router.get("/your-daily-history", getTodayHistory);
router.get("/your-weekly-history", getWeeklyData);
router.get("/your-monthly-history", getMonthlyData);
router.post("/your-history", getUserHistory);

export default router;
