/**
 * Tool Definitions for Todoist MCP Server
 * Defines all 22 tools for complete Todoist integration
 */

export const TODOIST_TOOLS = [
  // ==================== TASK TOOLS (7) ====================
  {
    name: "create_task",
    description:
      "Create a new task in Todoist. Supports rich options like due dates, priority, labels, and descriptions.",
    inputSchema: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "Task title/content (required). Supports markdown.",
        },
        description: {
          type: "string",
          description: "Detailed task description. Supports markdown.",
        },
        project_id: {
          type: "string",
          description: "Project ID to add task to. Defaults to Inbox if omitted.",
        },
        section_id: {
          type: "string",
          description: "Section ID within the project.",
        },
        parent_id: {
          type: "string",
          description: "Parent task ID for creating subtasks.",
        },
        labels: {
          type: "array",
          items: { type: "string" },
          description: "Label names to attach to the task.",
        },
        priority: {
          type: "number",
          enum: [1, 2, 3, 4],
          description: "Priority: 1 (normal) to 4 (urgent). Default is 1.",
        },
        due_string: {
          type: "string",
          description:
            "Natural language due date, e.g., 'tomorrow', 'next Monday at 3pm', 'every Friday'.",
        },
        due_date: {
          type: "string",
          description: "Specific due date in YYYY-MM-DD format.",
        },
        assignee_id: {
          type: "string",
          description: "User ID to assign the task to (for shared projects).",
        },
        duration: {
          type: "number",
          description: "Estimated duration amount (positive integer).",
        },
        duration_unit: {
          type: "string",
          enum: ["minute", "day"],
          description: "Unit for duration: 'minute' or 'day'.",
        },
      },
      required: ["content"],
    },
  },

  {
    name: "get_tasks",
    description:
      "Retrieve tasks with optional filtering by project, section, label, or custom filter query.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "Filter tasks by project ID.",
        },
        section_id: {
          type: "string",
          description: "Filter tasks by section ID.",
        },
        label: {
          type: "string",
          description: "Filter tasks by label name.",
        },
        filter: {
          type: "string",
          description:
            "Todoist filter query, e.g., 'today', 'overdue', 'p1', '#Work'.",
        },
        ids: {
          type: "array",
          items: { type: "string" },
          description: "Specific task IDs to retrieve.",
        },
      },
    },
  },

  {
    name: "get_task",
    description: "Get detailed information about a specific task by ID.",
    inputSchema: {
      type: "object",
      properties: {
        task_id: {
          type: "string",
          description: "The task ID to retrieve.",
        },
      },
      required: ["task_id"],
    },
  },

  {
    name: "update_task",
    description: "Update an existing task's content, due date, priority, labels, etc.",
    inputSchema: {
      type: "object",
      properties: {
        task_id: {
          type: "string",
          description: "The task ID to update.",
        },
        content: {
          type: "string",
          description: "New task title/content.",
        },
        description: {
          type: "string",
          description: "New task description.",
        },
        labels: {
          type: "array",
          items: { type: "string" },
          description: "New label names (replaces existing labels).",
        },
        priority: {
          type: "number",
          enum: [1, 2, 3, 4],
          description: "New priority: 1 (normal) to 4 (urgent).",
        },
        due_string: {
          type: "string",
          description: "New due date in natural language. Use 'no date' to remove.",
        },
        due_date: {
          type: "string",
          description: "New due date in YYYY-MM-DD format.",
        },
        assignee_id: {
          type: "string",
          description: "New assignee user ID, or null to unassign.",
        },
      },
      required: ["task_id"],
    },
  },

  {
    name: "complete_task",
    description:
      "Mark a task as complete. Recurring tasks will be rescheduled to their next occurrence.",
    inputSchema: {
      type: "object",
      properties: {
        task_id: {
          type: "string",
          description: "The task ID to complete.",
        },
      },
      required: ["task_id"],
    },
  },

  {
    name: "reopen_task",
    description: "Reopen a previously completed task.",
    inputSchema: {
      type: "object",
      properties: {
        task_id: {
          type: "string",
          description: "The task ID to reopen.",
        },
      },
      required: ["task_id"],
    },
  },

  {
    name: "delete_task",
    description: "Permanently delete a task and all its subtasks.",
    inputSchema: {
      type: "object",
      properties: {
        task_id: {
          type: "string",
          description: "The task ID to delete.",
        },
      },
      required: ["task_id"],
    },
  },

  {
    name: "move_task",
    description: "Move a task to a different project, section, or make it a subtask of another task. By default, all subtasks are moved along with the parent task, preserving the hierarchy. Only ONE destination should be specified.",
    inputSchema: {
      type: "object",
      properties: {
        task_id: {
          type: "string",
          description: "The task ID to move.",
        },
        project_id: {
          type: "string",
          description: "Destination project ID. Move task to this project's root.",
        },
        section_id: {
          type: "string",
          description: "Destination section ID. Move task to this section.",
        },
        parent_id: {
          type: "string",
          description: "Parent task ID. Move task as a subtask of this task.",
        },
        include_subtasks: {
          type: "boolean",
          description: "Whether to move all subtasks along with the parent task (default: true). Set to false to move only the specified task.",
        },
      },
      required: ["task_id"],
    },
  },

  // ==================== PROJECT TOOLS (5) ====================
  {
    name: "get_projects",
    description: "Get all projects in the user's Todoist account.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  {
    name: "get_project",
    description: "Get detailed information about a specific project by ID.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "The project ID to retrieve.",
        },
      },
      required: ["project_id"],
    },
  },

  {
    name: "create_project",
    description: "Create a new project in Todoist.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Project name (required).",
        },
        parent_id: {
          type: "string",
          description: "Parent project ID for creating sub-projects.",
        },
        color: {
          type: "string",
          enum: [
            "berry_red", "red", "orange", "yellow", "olive_green",
            "lime_green", "green", "mint_green", "teal", "sky_blue",
            "light_blue", "blue", "grape", "violet", "lavender",
            "magenta", "salmon", "charcoal", "grey", "taupe",
          ],
          description: "Project color.",
        },
        is_favorite: {
          type: "boolean",
          description: "Whether to mark as favorite.",
        },
        view_style: {
          type: "string",
          enum: ["list", "board"],
          description: "View style: 'list' or 'board'.",
        },
      },
      required: ["name"],
    },
  },

  {
    name: "update_project",
    description: "Update a project's name, color, or view style.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "The project ID to update.",
        },
        name: {
          type: "string",
          description: "New project name.",
        },
        color: {
          type: "string",
          description: "New project color.",
        },
        is_favorite: {
          type: "boolean",
          description: "Whether to mark as favorite.",
        },
        view_style: {
          type: "string",
          enum: ["list", "board"],
          description: "New view style.",
        },
      },
      required: ["project_id"],
    },
  },

  {
    name: "delete_project",
    description: "Delete a project and all its sections and tasks.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "The project ID to delete.",
        },
      },
      required: ["project_id"],
    },
  },

  // ==================== SECTION TOOLS (5) ====================
  {
    name: "get_sections",
    description: "Get all sections, optionally filtered by project.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "Filter sections by project ID.",
        },
      },
    },
  },

  {
    name: "get_section",
    description: "Get detailed information about a specific section by ID.",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "string",
          description: "The section ID to retrieve.",
        },
      },
      required: ["section_id"],
    },
  },

  {
    name: "create_section",
    description: "Create a new section within a project.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Section name (required).",
        },
        project_id: {
          type: "string",
          description: "Project ID to add section to (required).",
        },
        order: {
          type: "number",
          description: "Position of section in project.",
        },
      },
      required: ["name", "project_id"],
    },
  },

  {
    name: "update_section",
    description: "Rename a section.",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "string",
          description: "The section ID to update.",
        },
        name: {
          type: "string",
          description: "New section name.",
        },
      },
      required: ["section_id", "name"],
    },
  },

  {
    name: "delete_section",
    description: "Delete a section and all its tasks.",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "string",
          description: "The section ID to delete.",
        },
      },
      required: ["section_id"],
    },
  },

  // ==================== LABEL TOOLS (5) ====================
  {
    name: "get_labels",
    description: "Get all personal labels in the user's account.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  {
    name: "get_label",
    description: "Get detailed information about a specific label by ID.",
    inputSchema: {
      type: "object",
      properties: {
        label_id: {
          type: "string",
          description: "The label ID to retrieve.",
        },
      },
      required: ["label_id"],
    },
  },

  {
    name: "create_label",
    description: "Create a new personal label.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Label name (required).",
        },
        color: {
          type: "string",
          description: "Label color (e.g., 'red', 'blue', 'green').",
        },
        order: {
          type: "number",
          description: "Position in label list.",
        },
        is_favorite: {
          type: "boolean",
          description: "Whether to mark as favorite.",
        },
      },
      required: ["name"],
    },
  },

  {
    name: "update_label",
    description: "Update a label's name, color, or order.",
    inputSchema: {
      type: "object",
      properties: {
        label_id: {
          type: "string",
          description: "The label ID to update.",
        },
        name: {
          type: "string",
          description: "New label name.",
        },
        color: {
          type: "string",
          description: "New label color.",
        },
        order: {
          type: "number",
          description: "New position in label list.",
        },
        is_favorite: {
          type: "boolean",
          description: "Whether to mark as favorite.",
        },
      },
      required: ["label_id"],
    },
  },

  {
    name: "delete_label",
    description: "Delete a label. Removes it from all tasks.",
    inputSchema: {
      type: "object",
      properties: {
        label_id: {
          type: "string",
          description: "The label ID to delete.",
        },
      },
      required: ["label_id"],
    },
  },

  // ==================== COMMENT TOOLS (5) ====================
  {
    name: "get_comments",
    description: "Get all comments for a task or project.",
    inputSchema: {
      type: "object",
      properties: {
        task_id: {
          type: "string",
          description: "Task ID to get comments for.",
        },
        project_id: {
          type: "string",
          description: "Project ID to get comments for.",
        },
      },
    },
  },

  {
    name: "get_comment",
    description: "Get a specific comment by ID.",
    inputSchema: {
      type: "object",
      properties: {
        comment_id: {
          type: "string",
          description: "The comment ID to retrieve.",
        },
      },
      required: ["comment_id"],
    },
  },

  {
    name: "create_comment",
    description: "Add a comment to a task or project.",
    inputSchema: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "Comment text (required). Supports markdown.",
        },
        task_id: {
          type: "string",
          description: "Task ID to comment on.",
        },
        project_id: {
          type: "string",
          description: "Project ID to comment on.",
        },
      },
      required: ["content"],
    },
  },

  {
    name: "update_comment",
    description: "Update a comment's content.",
    inputSchema: {
      type: "object",
      properties: {
        comment_id: {
          type: "string",
          description: "The comment ID to update.",
        },
        content: {
          type: "string",
          description: "New comment content.",
        },
      },
      required: ["comment_id", "content"],
    },
  },

  {
    name: "delete_comment",
    description: "Delete a comment.",
    inputSchema: {
      type: "object",
      properties: {
        comment_id: {
          type: "string",
          description: "The comment ID to delete.",
        },
      },
      required: ["comment_id"],
    },
  },
];
