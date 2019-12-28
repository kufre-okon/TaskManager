import express from 'express';
import Task from '../models/task';
import Status from '../models/status';
import Priority from '../models/priority';
import { ApiResponse } from '../helpers/apiResponse';
import ModelHelper from '../helpers/modelHelper';
import TaskViewModel from '../viewModels/taskViewModel';
import moment from 'moment';

let router = express.Router();

router.get('/list', async (req, res) => {
    try {
        let status = req.query.status,
            priority = req.query.priority,
            assignedTo = req.query.assignedTo,
            dueDate = req.query.dueDate,
            completedDate = req.query.compledDate,
            page = parseInt(req.query.page) || 1,
            limit = parseInt(req.query.pageSize) || 20;

        let match = {};
        if (status)
            match.status = status;
        if (priority)
            match.priority = priority;
        if (assignedTo)
            match.assignedTo = assignedTo;
        if (dueDate) {
            match.dueDate = {
                '$gte': moment(dueDate).startOf('day').toDate(),
                '$lt': moment(dueDate).endOf('day').toDate()
            }
        }
        if (completedDate) {
            match.completedDate = {
                '$gte': moment(completedDate).startOf('day').toDate(),
                '$lt': moment(completedDate).endOf('day').toDate()
            }
        }

        let totalDoc = await Task.countDocuments(match);
        var tasks = await Task.find(match)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("assignedTo", 'firstName lastName')
            .populate('status', 'name')
            .populate('priority', 'name')
            .exec();
        var data = tasks.map(task => TaskViewModel.listViewModel(task));
        ApiResponse.successPaginate(res, page, limit, totalDoc, data);
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
});
router.get('/metadata', async (req, res) => {
    try {
        var statuses = await Status.find({});
        var priorities = await Priority.find({});
        ApiResponse.success(res, { statuses, priorities });
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
});
router.get('/:id', async (req, res) => {
    try {
        var task = await Task.findOne({ _id: req.params.id })
        ApiResponse.success(res, task);
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
})

router.post('/', async (req, res) => {
    try {
        var obj = req.body;
        obj.priority = ModelHelper.getObjectId(obj.priority);
        obj.assignedTo = ModelHelper.getObjectId(obj.assignedTo);
        obj.status = ModelHelper.getObjectId(obj.status);
        let task = new Task(obj);
        await task.save();
        ApiResponse.success(res, task);
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        let task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        ApiResponse.success(res, task);
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.id)
        ApiResponse.success(res, null, 'Task deleted successfully');
    } catch (err) {
        ApiResponse.handleError500(res, err.message || err);
    }
})


module.exports = router;