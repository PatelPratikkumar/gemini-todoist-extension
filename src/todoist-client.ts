/**
 * Todoist API Client
 * Direct HTTP client for Todoist REST API v2 and Sync API v9
 */

const API_BASE = "https://api.todoist.com/rest/v2";
const SYNC_API_BASE = "https://api.todoist.com/sync/v9";

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
  duration: { amount: number; unit: "minute" | "day" } | null;
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

export class TodoistClient {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: object
  ): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Todoist API error (${response.status}): ${errorText}`
      );
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json() as Promise<T>;
  }

  // ==================== TASKS ====================

  async getTasks(params?: {
    project_id?: string;
    section_id?: string;
    label?: string;
    filter?: string;
    ids?: string[];
  }): Promise<TodoistTask[]> {
    let endpoint = "/tasks";
    const queryParams: string[] = [];

    if (params?.project_id) queryParams.push(`project_id=${params.project_id}`);
    if (params?.section_id) queryParams.push(`section_id=${params.section_id}`);
    if (params?.label) queryParams.push(`label=${encodeURIComponent(params.label)}`);
    if (params?.filter) queryParams.push(`filter=${encodeURIComponent(params.filter)}`);
    if (params?.ids?.length) queryParams.push(`ids=${params.ids.join(",")}`);

    if (queryParams.length > 0) {
      endpoint += `?${queryParams.join("&")}`;
    }

    return this.request<TodoistTask[]>("GET", endpoint);
  }

  async getTask(taskId: string): Promise<TodoistTask> {
    return this.request<TodoistTask>("GET", `/tasks/${taskId}`);
  }

  async createTask(params: {
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
  }): Promise<TodoistTask> {
    return this.request<TodoistTask>("POST", "/tasks", params);
  }

  async updateTask(
    taskId: string,
    params: {
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
    }
  ): Promise<TodoistTask> {
    return this.request<TodoistTask>("POST", `/tasks/${taskId}`, params);
  }

  async closeTask(taskId: string): Promise<void> {
    await this.request<void>("POST", `/tasks/${taskId}/close`);
  }

  async reopenTask(taskId: string): Promise<void> {
    await this.request<void>("POST", `/tasks/${taskId}/reopen`);
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.request<void>("DELETE", `/tasks/${taskId}`);
  }

  // ==================== PROJECTS ====================

  async getProjects(): Promise<TodoistProject[]> {
    return this.request<TodoistProject[]>("GET", "/projects");
  }

  async getProject(projectId: string): Promise<TodoistProject> {
    return this.request<TodoistProject>("GET", `/projects/${projectId}`);
  }

  async createProject(params: {
    name: string;
    parent_id?: string;
    color?: string;
    is_favorite?: boolean;
    view_style?: "list" | "board";
  }): Promise<TodoistProject> {
    return this.request<TodoistProject>("POST", "/projects", params);
  }

  async updateProject(
    projectId: string,
    params: {
      name?: string;
      color?: string;
      is_favorite?: boolean;
      view_style?: "list" | "board";
    }
  ): Promise<TodoistProject> {
    return this.request<TodoistProject>("POST", `/projects/${projectId}`, params);
  }

  async deleteProject(projectId: string): Promise<void> {
    await this.request<void>("DELETE", `/projects/${projectId}`);
  }

  // ==================== SECTIONS ====================

  async getSections(projectId?: string): Promise<TodoistSection[]> {
    let endpoint = "/sections";
    if (projectId) {
      endpoint += `?project_id=${projectId}`;
    }
    return this.request<TodoistSection[]>("GET", endpoint);
  }

  async getSection(sectionId: string): Promise<TodoistSection> {
    return this.request<TodoistSection>("GET", `/sections/${sectionId}`);
  }

  async createSection(params: {
    name: string;
    project_id: string;
    order?: number;
  }): Promise<TodoistSection> {
    return this.request<TodoistSection>("POST", "/sections", params);
  }

  async updateSection(
    sectionId: string,
    params: { name: string }
  ): Promise<TodoistSection> {
    return this.request<TodoistSection>("POST", `/sections/${sectionId}`, params);
  }

  async deleteSection(sectionId: string): Promise<void> {
    await this.request<void>("DELETE", `/sections/${sectionId}`);
  }

  // ==================== LABELS ====================

  async getLabels(): Promise<TodoistLabel[]> {
    return this.request<TodoistLabel[]>("GET", "/labels");
  }

  async getLabel(labelId: string): Promise<TodoistLabel> {
    return this.request<TodoistLabel>("GET", `/labels/${labelId}`);
  }

  async createLabel(params: {
    name: string;
    order?: number;
    color?: string;
    is_favorite?: boolean;
  }): Promise<TodoistLabel> {
    return this.request<TodoistLabel>("POST", "/labels", params);
  }

  async updateLabel(
    labelId: string,
    params: {
      name?: string;
      order?: number;
      color?: string;
      is_favorite?: boolean;
    }
  ): Promise<TodoistLabel> {
    return this.request<TodoistLabel>("POST", `/labels/${labelId}`, params);
  }

  async deleteLabel(labelId: string): Promise<void> {
    await this.request<void>("DELETE", `/labels/${labelId}`);
  }

  // ==================== COMMENTS ====================

  async getComments(params: {
    task_id?: string;
    project_id?: string;
  }): Promise<TodoistComment[]> {
    let endpoint = "/comments";
    if (params.task_id) {
      endpoint += `?task_id=${params.task_id}`;
    } else if (params.project_id) {
      endpoint += `?project_id=${params.project_id}`;
    }
    return this.request<TodoistComment[]>("GET", endpoint);
  }

  async getComment(commentId: string): Promise<TodoistComment> {
    return this.request<TodoistComment>("GET", `/comments/${commentId}`);
  }

  async createComment(params: {
    content: string;
    task_id?: string;
    project_id?: string;
  }): Promise<TodoistComment> {
    return this.request<TodoistComment>("POST", "/comments", params);
  }

  async updateComment(
    commentId: string,
    params: { content: string }
  ): Promise<TodoistComment> {
    return this.request<TodoistComment>("POST", `/comments/${commentId}`, params);
  }

  async deleteComment(commentId: string): Promise<void> {
    await this.request<void>("DELETE", `/comments/${commentId}`);
  }

  // ==================== SYNC API OPERATIONS ====================

  /**
   * Move a task to a different project, section, or parent.
   * Uses Sync API v9 because REST API doesn't support moving tasks.
   * Only ONE of project_id, section_id, or parent_id should be specified.
   */
  async moveTask(
    taskId: string,
    destination: {
      project_id?: string;
      section_id?: string;
      parent_id?: string;
    }
  ): Promise<{ success: boolean; error?: string }> {
    // Generate UUID for the command
    const uuid = crypto.randomUUID();

    const command = {
      type: "item_move",
      uuid: uuid,
      args: {
        id: taskId,
        ...destination,
      },
    };

    const response = await fetch(`${SYNC_API_BASE}/sync`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `commands=${encodeURIComponent(JSON.stringify([command]))}`,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Todoist Sync API error (${response.status}): ${errorText}`);
    }

    const result = await response.json() as { sync_status?: Record<string, string | { error?: string }> };
    
    // Check sync_status for our command
    if (result.sync_status && result.sync_status[uuid]) {
      const status = result.sync_status[uuid];
      if (status === "ok") {
        return { success: true };
      } else if (typeof status === "object" && status.error) {
        return { success: false, error: status.error };
      } else {
        return { success: false, error: "Unknown error" };
      }
    }

    return { success: true };
  }
}
