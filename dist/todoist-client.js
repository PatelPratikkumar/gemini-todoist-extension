/**
 * Todoist API Client
 * Direct HTTP client for Todoist REST API v2
 */
const API_BASE = "https://api.todoist.com/rest/v2";
export class TodoistClient {
    token;
    constructor(token) {
        this.token = token;
    }
    async request(method, endpoint, body) {
        const url = `${API_BASE}${endpoint}`;
        const headers = {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        };
        const options = {
            method,
            headers,
        };
        if (body && (method === "POST" || method === "PUT")) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Todoist API error (${response.status}): ${errorText}`);
        }
        // Handle 204 No Content
        if (response.status === 204) {
            return {};
        }
        return response.json();
    }
    // ==================== TASKS ====================
    async getTasks(params) {
        let endpoint = "/tasks";
        const queryParams = [];
        if (params?.project_id)
            queryParams.push(`project_id=${params.project_id}`);
        if (params?.section_id)
            queryParams.push(`section_id=${params.section_id}`);
        if (params?.label)
            queryParams.push(`label=${encodeURIComponent(params.label)}`);
        if (params?.filter)
            queryParams.push(`filter=${encodeURIComponent(params.filter)}`);
        if (params?.ids?.length)
            queryParams.push(`ids=${params.ids.join(",")}`);
        if (queryParams.length > 0) {
            endpoint += `?${queryParams.join("&")}`;
        }
        return this.request("GET", endpoint);
    }
    async getTask(taskId) {
        return this.request("GET", `/tasks/${taskId}`);
    }
    async createTask(params) {
        return this.request("POST", "/tasks", params);
    }
    async updateTask(taskId, params) {
        return this.request("POST", `/tasks/${taskId}`, params);
    }
    async closeTask(taskId) {
        await this.request("POST", `/tasks/${taskId}/close`);
    }
    async reopenTask(taskId) {
        await this.request("POST", `/tasks/${taskId}/reopen`);
    }
    async deleteTask(taskId) {
        await this.request("DELETE", `/tasks/${taskId}`);
    }
    // ==================== PROJECTS ====================
    async getProjects() {
        return this.request("GET", "/projects");
    }
    async getProject(projectId) {
        return this.request("GET", `/projects/${projectId}`);
    }
    async createProject(params) {
        return this.request("POST", "/projects", params);
    }
    async updateProject(projectId, params) {
        return this.request("POST", `/projects/${projectId}`, params);
    }
    async deleteProject(projectId) {
        await this.request("DELETE", `/projects/${projectId}`);
    }
    // ==================== SECTIONS ====================
    async getSections(projectId) {
        let endpoint = "/sections";
        if (projectId) {
            endpoint += `?project_id=${projectId}`;
        }
        return this.request("GET", endpoint);
    }
    async getSection(sectionId) {
        return this.request("GET", `/sections/${sectionId}`);
    }
    async createSection(params) {
        return this.request("POST", "/sections", params);
    }
    async updateSection(sectionId, params) {
        return this.request("POST", `/sections/${sectionId}`, params);
    }
    async deleteSection(sectionId) {
        await this.request("DELETE", `/sections/${sectionId}`);
    }
    // ==================== LABELS ====================
    async getLabels() {
        return this.request("GET", "/labels");
    }
    async getLabel(labelId) {
        return this.request("GET", `/labels/${labelId}`);
    }
    async createLabel(params) {
        return this.request("POST", "/labels", params);
    }
    async updateLabel(labelId, params) {
        return this.request("POST", `/labels/${labelId}`, params);
    }
    async deleteLabel(labelId) {
        await this.request("DELETE", `/labels/${labelId}`);
    }
    // ==================== COMMENTS ====================
    async getComments(params) {
        let endpoint = "/comments";
        if (params.task_id) {
            endpoint += `?task_id=${params.task_id}`;
        }
        else if (params.project_id) {
            endpoint += `?project_id=${params.project_id}`;
        }
        return this.request("GET", endpoint);
    }
    async getComment(commentId) {
        return this.request("GET", `/comments/${commentId}`);
    }
    async createComment(params) {
        return this.request("POST", "/comments", params);
    }
    async updateComment(commentId, params) {
        return this.request("POST", `/comments/${commentId}`, params);
    }
    async deleteComment(commentId) {
        await this.request("DELETE", `/comments/${commentId}`);
    }
}
//# sourceMappingURL=todoist-client.js.map