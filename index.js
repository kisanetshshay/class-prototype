function FeatureToggle(featureName, isEnabled, userGroupAccess) {
    this.featureName = featureName;
    this.isEnabled = isEnabled;
    this.userGroupAccess = userGroupAccess; 
}


FeatureToggle.prototype.canAccess = function(userRole) {
    if (!this.isEnabled) {
        return false;
    }
    return this.userGroupAccess.includes(userRole);
};


FeatureToggle.prototype.toggleFeature = function(flag) {
    this.isEnabled = flag;
};


const feature = new FeatureToggle('Dashboard', false, ['betaTesters', 'admins']);
feature.toggleFeature(true);


function simulateAccessIfElse(userRole) {
    if (feature.canAccess(userRole)) {
        console.log(userRole + ' has access to ' + feature.featureName);
    } else {
        console.log(userRole + ' does NOT have access to ' + feature.featureName);
    }
}


function simulateAccess(userRole) {
    switch(userRole) {
        case 'betaTesters':
        case 'admins':
            if (feature.canAccess(userRole)) {
                console.log(userRole + ' has access to ' + feature.featureName);
            } else {
                console.log(userRole + ' does NOT have access to ' + feature.featureName);
            }
            break;
        default:
            console.log(userRole + ' does NOT have access to ' + feature.featureName);
    }
}


simulateAccess('betaTesters');   
simulateAccess('Users');   
simulateAccess('admins');         
simulateAccess('guests');         



function TimeLog(freelancerName, projectDetails, logs) {
    this.freelancerName = freelancerName;
    this.projectDetails = projectDetails; 
    this.logs = logs;
}

TimeLog.prototype.calculateTotalEarnings = function() {
    let totalHours = 0;
    for (let log of this.logs) {
        totalHours += log.hoursWorked;
    }
    return totalHours * this.projectDetails.hourlyRate;
};


TimeLog.prototype.filterLogsByDateRange = function(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.logs.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= start && logDate <= end;
    });
};


TimeLog.prototype.isWeeklyHoursExceeding = function() {
    let totalHours = 0;
    for (let log of this.logs) {
        totalHours += log.hoursWorked;
    }
    if (totalHours > 40) {
        return true;
    } else {
        return false;
    }
};


const exampleLogs = [
    {date: '2025-05-01', hoursWorked: 8},
    {date: '2025-05-02', hoursWorked: 7},
    {date: '2025-05-03', hoursWorked: 9},
    {date: '2025-05-04', hoursWorked: 6},
    {date: '2025-05-05', hoursWorked: 5},
    {date: '2025-05-06', hoursWorked: 4},
    {date: '2025-05-07', hoursWorked: 3}
];

const timeLog = new TimeLog('John ', {name: 'Javascriptproject', hourlyRate: 40}, exampleLogs);

const totalEarnings = timeLog.calculateTotalEarnings();
const filteredLogs = timeLog.filterLogsByDateRange('2024-08-03', '2025-09-06');
const isExceeding = timeLog.isWeeklyHoursExceeding();

console.log('Total Earnings:', totalEarnings);
console.log('Filtered Logs:', filteredLogs);
console.log('Is Weekly Hours Exceeding 40:', isExceeding);




function Order(customer, items, status) {
    this.customer = customer;
    this.items = items;
    this.status = status;
}

Order.prototype.computeTotalCost = function() {
    return this.items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
};

Order.prototype.updateStatus = function(paymentReceived) {
    this.status = paymentReceived ? "Paid" : "waiting";
};

Order.prototype.categorizeUrgency = function() {
    switch (this.status) {
        case "waiting":
            return "High Priority";
        case "Paid":
            return "Normal Priority";
        default:
            return "Unknown Status";
    }
};


const order = new Order({ name: "John", email: "John@example.com" }, [{ productName: "Mobile", quantity: 1, unitPrice: 1000 }], "waiting");
console.log(order.computeTotalCost()); 
order.updateStatus(true);
console.log(order.categorizeUrgency()); 



function Employee(id, name, performanceMetrics, feedback) {
    this.id = id;
    this.name = name;
    this.performanceMetrics = performanceMetrics; 
    this.feedback = feedback ;
}


Employee.prototype.calculateAverageScore = function() {
    const metrics = this.performanceMetrics;
    const scores = Object.values(metrics);
    if (scores.length === 0) return 0;
    
    const total = scores.reduce((sum, score) => sum + score, 0);
    return total / scores.length;
};


Employee.prototype.classifyPerformance = function() {
    const avgScore = this.calculateAverageScore();

    if (avgScore >= 8) {
        return 'Excellent';
    } else if (avgScore >= 6) {
        return 'Good';
    } else if (avgScore >= 4) {
        return 'Needs Improvement';
    } else {
        return 'Poor';
    }
};


Employee.prototype.addFeedback = function(newFeedback) {
    const performanceLevel = this.classifyPerformance();

    
    if (performanceLevel === 'Poor') {
        this.feedback.push('improvement needed: ' + newFeedback);
    } else if (performanceLevel === 'Needs Improvement') {
        this.feedback.push('Do practicce: ' + newFeedback);
    } else {
        this.feedback.push('Good job! ' + newFeedback);
    }
};

const emp = new Employee(
    100,
    'Marry',
    { communication: 7, efficiency: 6, reliability: 8 },
    []
);

console.log('Average Score:', emp.calculateAverageScore()); 
console.log('Performance Level:', emp.classifyPerformance()); 

emp.addFeedback('Improve managing  your time only');
console.log('Feedback:', emp.feedback);


class Course {
    constructor(title, instructor) {
        this.title = title;
        this.instructor = instructor;
        this.students = [];
    }

    addStudent(name, completionStatus) {
        this.students.push({ name, completionStatus });
    }

    getCompletedStudents() {
        return this.students.filter(student => student.completionStatus).map(student => student.name);
    }

    countStudentsByExpertise() {
        return this.students.length;
    }

    instructorMessage() {
        return this.students.length >= 5 ? "Instructor has a large class" : "Instructor has a manageable class";
    }
}


const course1 = new Course("JavaScript Basics", { name: "Merry", expertise: "Programming" });
course1.addStudent("Joy", true);
course1.addStudent("Micheal", false);
console.log(course1.getCompletedStudents()); 
console.log(course1.instructorMessage()); 

