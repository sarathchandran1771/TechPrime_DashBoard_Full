const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    projectName:{
        type: String,
        required: true, 
    },
    reason: {
        type: String,
        required: true,
    },
    type: {
        type: String, 
        required: true,
        enum: ['Internal', 'External', 'Vendor'], 
    },
    division: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Quality A', 'Quality B', 'Quality C', 'Quality D'], 
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
    },
    department: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Registered', 'Running', 'Cancelled','Closed'],
        default:'Registered',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    }
}, {
    timestamps: true,
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
