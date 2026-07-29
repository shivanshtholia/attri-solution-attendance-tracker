const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

exports.markAttendance = async (req, res) => {

    try {

        const { employeeId, status, checkIn, checkOut } = req.body;

        const employee = await Employee.findById(employeeId);

        if (!employee) {

            return res.status(404).json({
                message: "Employee Not Found"
            });

        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);

        tomorrow.setDate(today.getDate() + 1);

        let attendance = await Attendance.findOne({

            employee: employeeId,

            date: {

                $gte: today,

                $lt: tomorrow

            }

        });

        if (attendance) {

            attendance.status = status;

            attendance.checkIn = checkIn || "";

            attendance.checkOut = checkOut || "";

            await attendance.save();

        }

        else {

            attendance = await Attendance.create({

                employee: employeeId,

                status,

                checkIn: checkIn || "",

                checkOut: checkOut || ""

            });

        }

        res.status(200).json({

            message: "Attendance Saved Successfully",

            attendance

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
exports.getAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.find()

            .populate({
                path: "employee",
                populate: {
                    path: "user"
                }
            });

        res.json(attendance);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
exports.getSingleAttendance = async (req,res)=>{

    try{

        const attendance = await Attendance.findById(req.params.id)

        .populate({

            path:"employee",

            populate:{

                path:"user"

            }

        });

        if(!attendance){

            return res.status(404).json({

                message:"Attendance Not Found"

            });

        }

        res.json(attendance);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};
exports.updateAttendance = async(req,res)=>{

    try{

        const attendance = await Attendance.findByIdAndUpdate(

            req.params.id,

            req.body,

            {new:true}

        );

        res.json({

            message:"Attendance Updated",

            attendance

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};
exports.deleteAttendance = async(req,res)=>{

    try{

        await Attendance.findByIdAndDelete(req.params.id);

        res.json({

            message:"Attendance Deleted"

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};
exports.getEmployeeAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.find({

            employee: req.params.employeeId

        })

        .populate({

            path: "employee",

            populate: {

                path: "user"

            }

        });

        res.status(200).json(attendance);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};
exports.getTodayAttendance = async(req,res)=>{

    try{

        const today = new Date();

        today.setHours(0,0,0,0);

        const tomorrow = new Date(today);

        tomorrow.setDate(today.getDate()+1);

        const attendance = await Attendance.find({

            date:{

                $gte:today,

                $lt:tomorrow

            }

        })

        .populate({

            path:"employee",

            populate:{

                path:"user"

            }

        });

        res.json(attendance);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};
exports.getAttendanceSummary = async(req,res)=>{

    try{

        const summary = await Attendance.aggregate([

            {

                $group:{

                    _id:"$status",

                    total:{

                        $sum:1

                    }

                }

            }

        ]);

        res.json(summary);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};