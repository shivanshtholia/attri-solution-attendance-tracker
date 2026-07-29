const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ["Present", "Absent", "Leave"],
        required: true
    },

    checkIn: {
        type: String
    },

    checkOut: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);