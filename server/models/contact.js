import mongoose from 'mongoose';
import BaseSchema from './baseSchema';

var contactSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: {
        type: String, required: true, trim: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    mobilePhone: { type: String, required: true },
    jobTitle: String,
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    notes: { type: String },
    active: { type: Boolean, default: true },
    avatarUrl: String
}, {
    timestamps: true
});

BaseSchema.replaceIndex(contactSchema);

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;