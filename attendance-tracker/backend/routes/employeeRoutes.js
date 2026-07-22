const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const{

addEmployee,

getEmployees,

getEmployee,

updateEmployee,

deleteEmployee

}=require("../controllers/employeeController");



router.post("/",auth,admin,addEmployee);

router.get("/",auth,getEmployees);

router.get("/:id",auth,getEmployee);

router.put("/:id",auth,admin,updateEmployee);

router.delete("/:id",auth,admin,deleteEmployee);


module.exports=router;