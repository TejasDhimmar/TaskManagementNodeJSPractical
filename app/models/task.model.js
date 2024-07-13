class Task {
    constructor(id, title, description, status, projectId, createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.projectId = projectId;
        this.createdAt = createdAt;
    }
}

module.exports = Task