import mongoose from 'mongoose';
import BaseSchema from './baseSchema';

var taskSchema = mongoose.Schema({
    title: String,
    priority: { type: mongoose.Schema.Types.ObjectId, ref: 'Priority', required: true },
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true },
    percentComplete: { type: Number, default: 0 },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    description: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    completedDate: { type: Date },
    documentUrl: String
}, {
    timestamps: true
})

BaseSchema.replaceIndex(taskSchema);

const Task = mongoose.model('Task', taskSchema);

export default Task;

