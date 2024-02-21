import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Mobile: {
        type: String,
        required: true
    },
    Dob: {
        type: Date
    },
    City: {
        type: String,
        required: true
    },
    hospitalName: {
        type: String,
        required: true
    },
    aboutYourSelf: {
        type: String
    },
    imageUrl: {
        type: String
    },
    specialization: {
        type: String,
        required: true,
        enum: ['Cardiologist', 'Dermatologist', 'Gynecologist', 'Pediatrician', 'Orthopedic Surgeon', 'Neurologist']
    },
    designation: {
        type: String,
        enum: ['Admin', 'User']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedDate: {
        type: Date
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedDate: {
        type: Date
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;

//========================================================================================================================================================================

const homeBannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    paragraph: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedDate: {
        type: Date
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedDate: {
        type: Date
    }
});

const HomeBanner = mongoose.models.HomeBanner || mongoose.model('HomeBanner', homeBannerSchema);
module.exports = HomeBanner;

//========================================================================================================================================================================

const announcementBannerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    linkUrl: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedDate: {
        type: Date
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedDate: {
        type: Date
    }
});

const AnnouncementBanner = mongoose.models.AnnouncementBanner || mongoose.model('AnnouncementBanner', announcementBannerSchema);
module.exports = AnnouncementBanner;

//========================================================================================================================================================================

const taskTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    updatedDate: {
        type: Date
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    deletedDate: {
        type: Date
    }
});

const TaskType = mongoose.models.TaskType || mongoose.model('TaskType', taskTypeSchema);
module.exports = TaskType;

//========================================================================================================================================================================

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    blogParagraph: {
        type: String,
        default: null
    },
    csDiagnosis: {
        type: String,
        default: null
    },
    csTreatment: {
        type: String,
        default: null
    },
    csQuestion1: {
        type: String,
        default: null
    },
    csQuestion2: {
        type: String,
        default: null
    },
    csDoctorName: {
        type: String,
        default: null
    },
    videoUrl: {
        type: String,
        default: null
    },
    infographic1: {
        type: String,
        default: null
    },
    infographic2: {
        type: String,
        default: null
    },
    infographic3: {
        type: String,
        default: null
    },
    infographic4: {
        type: String,
        default: null
    },
    infographic5: {
        type: String,
        default: null
    },
    infographic6: {
        type: String,
        default: null
    },
    dueDate: {
        type: Date,
        required: true
    },
    taskType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskType',
        required: true
    },
    selectedBlog: {
        type: String,
        default: null
    },
    selectedInfographic: {
        type: String,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    updatedDate: {
        type: Date,
        default: null
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    deletedDate: {
        type: Date,
        default: null
    }
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
module.exports = Task;

//========================================================================================================================================================================

const userTaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completionDate: { type: Date },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    updatedDate: {
        type: Date,
        default: null
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    deletedDate: {
        type: Date,
        default: null
    },
    approvedByAdmin: {
        type: Boolean,
        default: false
    },
    rejectionReason: {
        type: String
    }
});

userTaskSchema.methods.toggleLike = function (userId: string) {
    const index = this.likes.indexOf(userId);
    if (index === -1) {
        // User hasn't liked the task yet, add like
        this.likes.push(userId);
    } else {
        // User already liked the task, remove like
        this.likes.splice(index, 1);
    }
};

const UserTask = mongoose.models.UserTask || mongoose.model('UserTask', userTaskSchema);
module.exports = UserTask;

