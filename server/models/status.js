import mongoose from 'mongoose';
import BaseSchema from './baseSchema';

var statusSchema = mongoose.Schema({
    name: String
})

BaseSchema.replaceIndex(statusSchema);

const Status = mongoose.model('Status', statusSchema);

export default Status;