const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

exports.getDashboard = async (req, res) => {

    try {

        const totalEmployees = await Employee.countDocuments();

        const present = await Attendance.countDocuments({
            status: "Present"
        });

        const absent = await Attendance.countDocuments({
            status: "Absent"
        });

        const leave = await Attendance.countDocuments({
            status: "Leave"
        });

        res.status(200).json({

            totalEmployees,

            present,

            absent,

            leave

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};