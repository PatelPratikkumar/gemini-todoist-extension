/**
 * Todoist API Client
 * Direct HTTP client for Todoist REST API v2 and Sync API v9
 */
export interface TodoistTask {
    id: string;
    project_id: string;
    section_id: string | null;
    content: string;
    description: string;
    is_completed: boolean;
    labels: string[];
    parent_id: string | null;
    order: number;
    priority: number;
    due: {
        string: string;
        date: string;
        is_recurring: boolean;
        datetime?: string;
        timezone?: string;
    } | null;
    url: string;
    comment_count: number;
    created_at: string;
    creator_id: string;
    assignee_id: string | null;
    assigner_id: string | null;
    duration: {
        amount: number;
        unit: "minute" | "day";
    } | null;
}
export interface TodoistProject {
    id: string;
    name: string;
    color: string;
    parent_id: string | null;
    order: number;
    comment_count: number;
    is_shared: boolean;
    is_favorite: boolean;
    is_inbox_project: boolean;
    is_team_inbox: boolean;
    view_style: "list" | "board";
    url: string;
}
export interface TodoistSection {
    id: string;
    project_id: string;
    order: number;
    name: string;
}
export interface TodoistLabel {
    id: string;
    name: string;
    color: string;
    order: number;
    is_favorite: boolean;
}
export interface TodoistComment {
    id: string;
    task_id: string | null;
    project_id: string | null;
    posted_at: string;
    content: string;
    attachment: object | null;
}
export declare class TodoistClient {
    private token;
    constructor(token: string);
    private request;
    getTasks(params?: {
        project_id?: string;
        section_id?: string;
        label?: string;
        filter?: string;
        ids?: string[];
    }): Promise<TodoistTask[]>;
    getTask(taskId: string): Promise<TodoistTask>;
    createTask(params: {
        content: string;
        description?: string;
        project_id?: string;
        section_id?: string;
        parent_id?: string;
        order?: number;
        labels?: string[];
        priority?: number;
        due_string?: string;
        due_date?: string;
        due_datetime?: string;
        due_lang?: string;
        assignee_id?: string;
        duration?: number;
        duration_unit?: "minute" | "day";
    }): Promise<TodoistTask>;
    updateTask(taskId: string, params: {
        content?: string;
        description?: string;
        labels?: string[];
        priority?: number;
        due_string?: string;
        due_date?: string;
        due_datetime?: string;
        due_lang?: string;
        assignee_id?: string | null;
        duration?: number | null;
        duration_unit?: "minute" | "day" | null;
    }): Promise<TodoistTask>;
    closeTask(taskId: string): Promise<void>;
    reopenTask(taskId: string): Promise<void>;
    deleteTask(taskId: string): Promise<void>;
    getProjects(): Promise<TodoistProject[]>;
    getProject(projectId: string): Promise<TodoistProject>;
    createProject(params: {
        name: string;
        parent_id?: string;
        color?: string;
        is_favorite?: boolean;
        view_style?: "list" | "board";
    }): Promise<TodoistProject>;
    updateProject(projectId: string, params: {
        name?: string;
        color?: string;
        is_favorite?: boolean;
        view_style?: "list" | "board";
    }): Promise<TodoistProject>;
    deleteProject(projectId: string): Promise<void>;
    getSections(projectId?: string): Promise<TodoistSection[]>;
    getSection(sectionId: string): Promise<TodoistSection>;
    createSection(params: {
        name: string;
        project_id: string;
        order?: number;
    }): Promise<TodoistSection>;
    updateSection(sectionId: string, params: {
        name: string;
    }): Promise<TodoistSection>;
    deleteSection(sectionId: string): Promise<void>;
    getLabels(): Promise<TodoistLabel[]>;
    getLabel(labelId: string): Promise<TodoistLabel>;
    createLabel(params: {
        name: string;
        order?: number;
        color?: string;
        is_favorite?: boolean;
    }): Promise<TodoistLabel>;
    updateLabel(labelId: string, params: {
        name?: string;
        order?: number;
        color?: string;
        is_favorite?: boolean;
    }): Promise<TodoistLabel>;
    deleteLabel(labelId: string): Promise<void>;
    getComments(params: {
        task_id?: string;
        project_id?: string;
    }): Promise<TodoistComment[]>;
    getComment(commentId: string): Promise<TodoistComment>;
    createComment(params: {
        content: string;
        task_id?: string;
        project_id?: string;
    }): Promise<TodoistComment>;
    updateComment(commentId: string, params: {
        content: string;
    }): Promise<TodoistComment>;
    deleteComment(commentId: string): Promise<void>;
    /**
     * Get all subtasks of a parent task (recursive).
     * This is needed to move tasks with their entire subtree.
     */
    getSubtasks(parentId: string): Promise<TodoistTask[]>;
    /**
     * Move a task to a different project, section, or parent.
     * Uses Sync API v9 because REST API doesn't support moving tasks.
     * Only ONE of project_id, section_id, or parent_id should be specified.
     *
     * When moving to a project with include_subtasks=true (default),
     * all subtasks are moved along with the parent maintaining their hierarchy.
     */
    moveTask(taskId: string, destination: {
        project_id?: string;
        section_id?: string;
        parent_id?: string;
    }, includeSubtasks?: boolean): Promise<{
        success: boolean;
        error?: string;
        movedCount?: number;
    }>;
}
//# sourceMappingURL=todoist-client.d.ts.map