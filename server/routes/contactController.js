import express from 'express';
import Contact from '../models/contact';
import { ApiResponse } from '../helpers/apiResponse';
import modelHelper from '../helpers/modelHelper';
import ContactViewModel from '../viewModels/contactViewModel';
import Country from '../models/country';

let router = express.Router();

router.get('/list/:status?', async (req, res) => {
    try {

        let page = parseInt(req.query.page) || 1,
            limit = parseInt(req.query.pageSize) || 20;

        var match = {};
        if (req.query.status != undefined)
            match.active = req.query.status;
        let totalDoc = await Contact.countDocuments(match);
        var contacts = await Contact.find(match)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("country", 'name')
            .exec();

        let data = contacts.map((con) => ContactViewModel.listViewModel(con));
        ApiResponse.successPaginate(res, page, limit, totalDoc, data);
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
});

router.post('/', async (req, res) => {
    try {
        var obj = req.body;
        obj.country = modelHelper.getObjectId(obj.country);
        var contact = new Contact(obj);
        await contact.save();
        ApiResponse.success(res, contact);
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
})

router.get('/metadata', async (req, res) => {
    try {
        var countries = await Country.find({});
        ApiResponse.success(res, { countries });
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        var contact = await Contact.findOne({ _id: req.params.id })
        ApiResponse.success(res, contact);
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        var obj = req.body;
        obj.country = modelHelper.getObjectId(obj.country);
        var contact = await Contact.findByIdAndUpdate(req.params.id, obj, { new: true });
        ApiResponse.success(res, contact);
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
})

router.put('/:id/setstatus/:status', async (req, res) => {
    try {
        await Contact.updateOne({ _id: req.params.id }, {
            $set: { active: req.params.status }
        })
        ApiResponse.success(res, null, 'Contact status changed successfully');
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
})

module.exports = router;