/**
 * Output Formatter for Todoist MCP Server
 * Converts raw API responses to human-readable formatted text
 */
import type { TodoistTask, TodoistProject, TodoistSection, TodoistLabel, TodoistComment } from "./todoist-client.js";
export declare function formatTask(task: TodoistTask): string;
export declare function formatTaskList(tasks: TodoistTask[], title?: string): string;
export declare function formatProject(project: TodoistProject): string;
export declare function formatProjectList(projects: TodoistProject[]): string;
export declare function formatSection(section: TodoistSection): string;
export declare function formatSectionList(sections: TodoistSection[], projectName?: string): string;
export declare function formatLabel(label: TodoistLabel): string;
export declare function formatLabelList(labels: TodoistLabel[]): string;
export declare function formatComment(comment: TodoistComment): string;
export declare function formatCommentList(comments: TodoistComment[]): string;
export declare function formatSuccess(action: string, itemType: string, itemName?: string): string;
export declare function formatCreatedTask(task: TodoistTask): string;
export declare function formatCreatedProject(project: TodoistProject): string;
export declare function formatCreatedSection(section: TodoistSection): string;
export declare function formatCreatedLabel(label: TodoistLabel): string;
export declare function formatCreatedComment(comment: TodoistComment): string;
export declare function formatUpdated(itemType: string, name: string): string;
//# sourceMappingURL=formatter.d.ts.map