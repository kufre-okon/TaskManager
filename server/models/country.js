const mongoose = require('mongoose');
import BaseSchema from './baseSchema';

const countrySchema = mongoose.Schema({
    name: String,
    code: String
})


BaseSchema.replaceIndex(countrySchema);

module.exports = mongoose.model('Country', countrySchema);