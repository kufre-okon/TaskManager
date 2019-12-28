import mongoose from 'mongoose';
import BaseSchema from './baseSchema';

var taskprioritySchema = mongoose.Schema({
    name: String
})


BaseSchema.replaceIndex(taskprioritySchema);

const Priority = mongoose.model('Priority', taskprioritySchema);

export default Priority;