const Employee = require("../models/Employee");
const User = require("../models/User");


// ==========================
// Add Employee
// ==========================

exports.addEmployee = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            department,
            designation,
            salary,
            phone
        } = req.body;

        const checkUser = await User.findOne({ email });

        if (checkUser) {

            return res.status(400).json({
                message: "Employee already exists"
            });

        }

        const bcrypt = require("bcryptjs");

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword,
            role:"employee"

        });

        const employee = await Employee.create({

            user:user._id,

            employeeId:"EMP"+Date.now(),

            department,

            designation,

            salary,

            phone

        });

        res.status(201).json({

            message:"Employee Added",

            employee

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



// ==========================
// Get All Employees
// ==========================

exports.getEmployees = async(req,res)=>{

    try{

        const employees = await Employee.find()

        .populate("user");

        res.json(employees);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};




// ==========================
// Get Single Employee
// ==========================

exports.getEmployee = async(req,res)=>{

    try{

        const employee = await Employee.findById(req.params.id)

        .populate("user");

        if(!employee){

            return res.status(404).json({

                message:"Employee Not Found"

            });

        }

        res.json(employee);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};




// ==========================
// Update Employee
// ==========================

exports.updateEmployee = async(req,res)=>{

    try{

        const employee = await Employee.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true

            }

        );

        res.json(employee);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};




// ==========================
// Delete Employee
// ==========================

exports.deleteEmployee = async(req,res)=>{

    try{

        const employee = await Employee.findById(req.params.id);

        if(!employee){

            return res.status(404).json({

                message:"Employee Not Found"

            });

        }

        await User.findByIdAndDelete(employee.user);

        await Employee.findByIdAndDelete(req.params.id);

        res.json({

            message:"Employee Deleted"

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};