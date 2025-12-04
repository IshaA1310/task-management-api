import Task from '../models/Task.js';
import mongoose from 'mongoose';

export const createTask = async (req, res) => {
    try {
        const {title, description, status, priority} = req.body;
        if(!title) return res.status(500).send({ success: false, message: 'Title is Required'});
        const newTask = new Task({
            title,
            description,
            status: status || 'Pending',
            priority: priority || 'Low',
            userId: req.user._id
        });
        await newTask.save();
        return res.status(200).send({ success: true, message: 'Task has been created Successfully', data: newTask });
    } catch(err) {
        return res.status(500).send({ success: false, message: `Internal Server Error: ${err.message}`});
    }
};

export const getTasks = async(req, res) => {
    try {
        const userId = req.user._id;
        const filter = { userId };
        const { status, priority, sort } = req.query;
        if(status) filter.status = status;
        if(priority) filter.priority = priority;
        let sorting = { createdAt: -1 };

        if (sort) {
            if (sort === 'createdAt') sorting = { createdAt: 1 };
            else if (sort === '-createdAt') sorting = { createdAt: -1 };
            else if (sort === 'priority') sorting = { priority: 1 };
            else if (sort === '-priority') sorting = { priority: -1 };
            else sorting = { [sort]: 1 };
        }

        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 10));
        const skip = (page - 1) * limit;
        const total = await Task.countDocuments(filter);
        const tasks = await Task.find(filter).sort(sorting).skip(skip).limit(limit).lean().exec();
        if(tasks.length === 0) return res.status(200).send({ success: true, message: 'No Task has been created yet!', data: [], totalPages: 0, total: 0 });
        return res.status(200).send({ success: true, message: 'Task has been found Successfully', data: tasks, totalPages: Math.ceil(total / limit), total });
    } catch (error) {
        return res.status(500).send({ success: false, message: `Internal Server Error: ${error.message}`});
    }
};

export const getSingleTask = async(req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ success: false, messgae: 'Invalid Task Id' });
        const singleTask = await Task.findById(id);
        if(!singleTask) return res.status(404).send({ success: false, message: 'Task Not Found' });
        if(singleTask.userId.toString() !== req.user._id.toString()) {
            return res.status(403).send({ success: true, message: 'Forbidden' });
        }
        return res.status(200).send({ success: true, message: 'Task found Successfully', data: singleTask });
    } catch (error) {
        return res.status(500).send({ success: false, message: `Internal Server Error: ${error.message}`});
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ success: false, messgae: 'Invalid Task Id' });
        const existsTask = await Task.findById(id);
        if(!existsTask) return res.status(404).send({ success: false, message: 'Task Not Found' });
        if(existsTask.userId.toString() !== req.user._id.toString()) {
            return res.status(403).send({ success: true, message: 'Forbidden' });
        }
        existsTask.title = req.body.title ? req.body.title : existsTask.title;
        existsTask.description = req.body.description ? req.body.description : existsTask.description;
        existsTask.priority = req.body.priority ? req.body.priority : existsTask.priority;
        existsTask.status = req.body.status ? req.body.status : existsTask.status;
        return res.status(200).send({ success: true, message: 'Task has been updated Successfully', data: existsTask });
    } catch (error) {
        return res.status(500).send({ success: false, message: `Internal Server Error: ${error.message}`});
    }
};

export const deleteTask = async (req, res) => {
    try{
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, messgae: 'Invalid Task Id' });
        }
        const task = await Task.findById(id);
        if(!task) return res.status(404).send({ success: false, message: 'Task Not Found' });
        if(task.userId.toString() !== req.user._id.toString()) {
            return res.status(403).send({ success: true, message: 'Forbidden' });
        }
        await task.deleteOne();
        return res.status(200).send({ success: true, message: 'Task Deleted Successfully'});
    } catch (error) {
        return res.status(500).send({ success: false, message: `Internal Server Error: ${error.message}`});
    }
};
