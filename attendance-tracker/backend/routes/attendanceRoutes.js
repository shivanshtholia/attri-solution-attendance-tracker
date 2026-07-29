// router.post("/", auth, admin, markAttendance);
const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
    markAttendance,
    getAttendance,
    getSingleAttendance,
    updateAttendance,
    deleteAttendance,
    getEmployeeAttendance,
    getTodayAttendance,
    getAttendanceSummary
} = require("../controllers/attendanceController");

// POST
router.post("/", auth, admin, markAttendance);

// GET
router.get("/", auth, getAttendance);

router.get("/today", auth, getTodayAttendance);

router.get("/summary", auth, getAttendanceSummary);

router.get("/employee/:employeeId", auth, getEmployeeAttendance);

router.get("/:id", auth, getSingleAttendance);

// UPDATE
router.put("/:id", auth, admin, updateAttendance);

// DELETE
router.delete("/:id", auth, admin, deleteAttendance);

module.exports = router;