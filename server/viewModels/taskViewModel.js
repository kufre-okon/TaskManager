const TaskViewModel = {
    listViewModel(task) {
        return {
            title: task.title,
            priority: task.priority.name,
            status: task.status.name,
            percentComplete: task.percentComplete,
            assignedTo: task.assignedTo.firstName + ' ' + task.assignedTo.lastName,
            description: task.description,
            startDate: task.startDate,
            dueDate: task.dueDate,
            completedDate: task.completedDate,
            documentUrl: task.documentUrl
        }
    }
}

export default TaskViewModel;