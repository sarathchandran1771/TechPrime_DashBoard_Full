const Record = require('../models/RecordSchema')
const User = require('../models/UserSchema')

const projectData = async(req,res)=>{
    const {
      projectName,
      reason,
      type,
      division,
      category,
      priority,
      department,
      startDate,
      endDate,
      location,
      userId
    } = req.body;
    console.log(req.body)
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newRecord = new Record({
            projectName,
            reason,
            type,
            division,
            category,
            priority,
            department,
            startDate,
            endDate,
            location,
            user: userId
        });

        await newRecord.save();
        res.status(201).json({ message: 'Record created successfully', record: newRecord });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create record', error: error.message });
    }
}

const getprojectData = async (req, res) => {
    const { userId } = req.query;
    try {
        const projects = await Record.find({user:userId})
        if(!projects){
            return res.status(401).json({message:'No Record Found'})
        }

        const projectData = projects.map(project => ({
            _id: project._id,
            projectName: project.projectName,
            reason: project.reason,
            type: project.type,
            division: project.division,
            category: project.category,
            priority: project.priority,
            department: project.department,
            startDate: project.startDate,
            endDate: project.endDate,
            location: project.location,
            status: project.status
        }));


        res.status(200).json({ projects: projectData });
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve projects', error: error.message });
    }
};


const searchProjects = async (req, res) => {
    const { projectName, type, status } = req.body;
    try {
        const query = {};
        if (projectName) query.projectName = { $regex: projectName, $options: 'i' }; // Case-insensitive search
        if (type) query.type = type;
        if (status) query.status = status;

        const projects = await Record.find(query);

        if(projects.length === 0){
            return res.status(200).json({message:'No records found'})
        }
        res.status(200).json({ projects });
    } catch (error) {
        res.status(400).json({ message: 'Failed to search projects', error: error.message });
    }
};

const getPaginatedProjects = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const projects = await Record.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalProjects = await Record.countDocuments();
        const totalPages = Math.ceil(totalProjects / limit);

        res.status(200).json({
            projects,
            currentPage: Number(page),
            totalPages,
            totalProjects
        });
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve projects', error: error.message });
    }
};

const statusUpdate = async (req, res) => {
    const { id, userId, status } = req.body;    
    try {
        let project = await Record.findOneAndUpdate(
            { _id: id, user: userId },
            { status: status },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: 'project not found' });
        }

        project = {
            _id: project._id,
            projectName: project.projectName,
            reason: project.reason,
            type: project.type,
            division: project.division,
            category: project.category,
            priority: project.priority,
            department: project.department,
            startDate: project.startDate,
            endDate: project.endDate,
            location: project.location,
            status: project.status
        };


        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve projects', error: error.message });
    }
};

const dataRecord = async (req, res) => {
    const { userId } = req.query;
    try {
        const projects = await Record.find({ user: userId });
        if (!projects || projects.length === 0) {
            return res.status(401).json({ message: 'No Record Found' });
        }

        const projectData = projects.map(project => ({
            startDate: new Date(project.startDate),
            endDate: new Date(project.endDate),
            status: project.status,
        }));

        const totalProject = projects.length || 0;

        let closedProject = 0;
        let runningProject = 0;
        let closureDelayProject = 0;
        let cancelledProject = 0;

        const currentDate = new Date();
        
        projectData.forEach(project => {
            if (project.status === 'close') {
                closedProject++;
            } else if (project.status === 'cancel') {
                cancelledProject++;
            } else if (currentDate >= project.startDate && currentDate <= project.endDate) {
                runningProject++;
            } else if (currentDate > project.endDate) {
                closureDelayProject++;
            }
        });


        res.status(200).json({ 
            cancelledProject,
            closedProject,
            closureDelayProject,
            runningProject,
            totalProject 
        });
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve projects', error: error.message });
    }
};

const departmentWiseProjects = async (req, res) => {
    const { userId } = req.query;
    try {
        const projects = await Record.find({ user: userId });
        if (!projects || projects.length === 0) {
            return res.status(401).json({ message: 'No Record Found' });
        }

        const departmentData = {};

        projects.forEach(project => {
            const department = project.department;
            if (!departmentData[department]) {
                departmentData[department] = { total: 0, closed: 0 };
            }
            departmentData[department].total++;
            if (project.status === 'close') {
                departmentData[department].closed++;
            }
        });

        const data = Object.keys(departmentData).map(department => ({
            department,
            total: departmentData[department].total,
            closed: departmentData[department].closed,
        }));

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve projects', error: error.message });
    }
};




module.exports = {
    projectData,
    searchProjects,
    getPaginatedProjects,
    statusUpdate,
    getprojectData,
    dataRecord,
    departmentWiseProjects
} 