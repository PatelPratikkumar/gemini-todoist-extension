#!/usr/bin/env node
/**
 * Todoist MCP Server for Gemini CLI
 *
 * A Model Context Protocol server providing complete Todoist integration.
 * Supports tasks, projects, sections, labels, and comments.
 * Returns pre-formatted human-readable output (not raw JSON).
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { TodoistClient } from "./todoist-client.js";
import { TODOIST_TOOLS } from "./tools.js";
import { formatTask, formatTaskList, formatProject, formatProjectList, formatSectionList, formatLabelList, formatCommentList, formatComment, formatCreatedTask, formatCreatedProject, formatCreatedSection, formatCreatedLabel, formatCreatedComment, formatUpdated, } from "./formatter.js";
// Validate API token (injected by Gemini CLI from user's system environment)
const API_TOKEN = process.env.TODOIST_API_TOKEN;
if (!API_TOKEN) {
    console.error("Error: TODOIST_API_TOKEN environment variable is not set.");
    console.error("Set it as a system environment variable:");
    console.error("  Windows: setx TODOIST_API_TOKEN \"your_token\"");
    console.error("  Linux/Mac: export TODOIST_API_TOKEN=\"your_token\"");
    console.error("Get your token: https://todoist.com/prefs/integrations");
    process.exit(1);
}
// Initialize Todoist client
const todoist = new TodoistClient(API_TOKEN);
// Cache for project names (for better task display)
const projectCache = new Map();
async function getProjectName(projectId) {
    if (projectCache.has(projectId)) {
        return projectCache.get(projectId);
    }
    try {
        const project = await todoist.getProject(projectId);
        projectCache.set(projectId, project.name);
        return project.name;
    }
    catch {
        return "Unknown Project";
    }
}
// Initialize MCP Server
const server = new Server({
    name: "todoist-mcp-server",
    version: "1.3.0",
}, {
    capabilities: {
        tools: {},
    },
});
// Register tool listing handler
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TODOIST_TOOLS,
}));
// Register tool execution handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    // Ensure args is defined (default to empty object)
    const a = args ?? {};
    try {
        let formattedResult;
        switch (name) {
            // ==================== TASKS ====================
            case "create_task": {
                const task = await todoist.createTask({
                    content: a.content,
                    description: a.description,
                    project_id: a.project_id,
                    section_id: a.section_id,
                    parent_id: a.parent_id,
                    labels: a.labels,
                    priority: a.priority,
                    due_string: a.due_string,
                    due_date: a.due_date,
                    assignee_id: a.assignee_id,
                    duration: a.duration,
                    duration_unit: a.duration_unit,
                });
                formattedResult = formatCreatedTask(task);
                break;
            }
            case "get_tasks": {
                const tasks = await todoist.getTasks({
                    project_id: a.project_id,
                    section_id: a.section_id,
                    label: a.label,
                    filter: a.filter,
                    ids: a.ids,
                });
                // Get project name for title if filtering by project
                let title = "Tasks";
                if (a.project_id) {
                    const projectName = await getProjectName(a.project_id);
                    title = `Tasks in "${projectName}"`;
                }
                else if (a.filter) {
                    title = `Tasks (filter: ${a.filter})`;
                }
                else if (a.label) {
                    title = `Tasks with label "${a.label}"`;
                }
                formattedResult = formatTaskList(tasks, title);
                break;
            }
            case "get_task": {
                const task = await todoist.getTask(a.task_id);
                formattedResult = formatTask(task);
                break;
            }
            case "update_task": {
                const task = await todoist.updateTask(a.task_id, {
                    content: a.content,
                    description: a.description,
                    labels: a.labels,
                    priority: a.priority,
                    due_string: a.due_string,
                    due_date: a.due_date,
                    assignee_id: a.assignee_id,
                });
                formattedResult = `${formatUpdated("Task", task.content)}\n\n${formatTask(task)}`;
                break;
            }
            case "complete_task": {
                await todoist.closeTask(a.task_id);
                formattedResult = "✅ **Task Completed!** Great job! 🎉";
                break;
            }
            case "reopen_task": {
                await todoist.reopenTask(a.task_id);
                formattedResult = "🔄 **Task Reopened!** It's back on your list.";
                break;
            }
            case "delete_task": {
                await todoist.deleteTask(a.task_id);
                formattedResult = "🗑️ **Task Deleted!** It's gone forever.";
                break;
            }
            // ==================== PROJECTS ====================
            case "get_projects": {
                const projects = await todoist.getProjects();
                // Update cache
                projects.forEach(p => projectCache.set(p.id, p.name));
                formattedResult = formatProjectList(projects);
                break;
            }
            case "get_project": {
                const project = await todoist.getProject(a.project_id);
                projectCache.set(project.id, project.name);
                formattedResult = formatProject(project);
                break;
            }
            case "create_project": {
                const project = await todoist.createProject({
                    name: a.name,
                    parent_id: a.parent_id,
                    color: a.color,
                    is_favorite: a.is_favorite,
                    view_style: a.view_style,
                });
                projectCache.set(project.id, project.name);
                formattedResult = formatCreatedProject(project);
                break;
            }
            case "update_project": {
                const project = await todoist.updateProject(a.project_id, {
                    name: a.name,
                    color: a.color,
                    is_favorite: a.is_favorite,
                    view_style: a.view_style,
                });
                projectCache.set(project.id, project.name);
                formattedResult = `${formatUpdated("Project", project.name)}\n\n${formatProject(project)}`;
                break;
            }
            case "delete_project": {
                await todoist.deleteProject(a.project_id);
                projectCache.delete(a.project_id);
                formattedResult = "🗑️ **Project Deleted!** All tasks and sections in this project have been removed.";
                break;
            }
            // ==================== SECTIONS ====================
            case "get_sections": {
                const sections = await todoist.getSections(a.project_id);
                let projectName;
                if (a.project_id) {
                    projectName = await getProjectName(a.project_id);
                }
                formattedResult = formatSectionList(sections, projectName);
                break;
            }
            case "get_section": {
                const section = await todoist.getSection(a.section_id);
                formattedResult = `📂 **${section.name}**`;
                break;
            }
            case "create_section": {
                const section = await todoist.createSection({
                    name: a.name,
                    project_id: a.project_id,
                    order: a.order,
                });
                formattedResult = formatCreatedSection(section);
                break;
            }
            case "update_section": {
                const section = await todoist.updateSection(a.section_id, {
                    name: a.name,
                });
                formattedResult = `${formatUpdated("Section", section.name)}`;
                break;
            }
            case "delete_section": {
                await todoist.deleteSection(a.section_id);
                formattedResult = "🗑️ **Section Deleted!** All tasks in this section have been removed.";
                break;
            }
            // ==================== LABELS ====================
            case "get_labels": {
                const labels = await todoist.getLabels();
                formattedResult = formatLabelList(labels);
                break;
            }
            case "get_label": {
                const label = await todoist.getLabel(a.label_id);
                const favorite = label.is_favorite ? " ⭐" : "";
                formattedResult = `🏷️ **${label.name}**${favorite} (${label.color})`;
                break;
            }
            case "create_label": {
                const label = await todoist.createLabel({
                    name: a.name,
                    color: a.color,
                    order: a.order,
                    is_favorite: a.is_favorite,
                });
                formattedResult = formatCreatedLabel(label);
                break;
            }
            case "update_label": {
                const label = await todoist.updateLabel(a.label_id, {
                    name: a.name,
                    color: a.color,
                    order: a.order,
                    is_favorite: a.is_favorite,
                });
                formattedResult = `${formatUpdated("Label", label.name)}`;
                break;
            }
            case "delete_label": {
                await todoist.deleteLabel(a.label_id);
                formattedResult = "🗑️ **Label Deleted!** It has been removed from all tasks.";
                break;
            }
            // ==================== COMMENTS ====================
            case "get_comments": {
                const comments = await todoist.getComments({
                    task_id: a.task_id,
                    project_id: a.project_id,
                });
                formattedResult = formatCommentList(comments);
                break;
            }
            case "get_comment": {
                const comment = await todoist.getComment(a.comment_id);
                formattedResult = formatComment(comment);
                break;
            }
            case "create_comment": {
                const comment = await todoist.createComment({
                    content: a.content,
                    task_id: a.task_id,
                    project_id: a.project_id,
                });
                formattedResult = formatCreatedComment(comment);
                break;
            }
            case "update_comment": {
                const comment = await todoist.updateComment(a.comment_id, {
                    content: a.content,
                });
                formattedResult = `✅ **Comment Updated!**\n💬 ${comment.content}`;
                break;
            }
            case "delete_comment": {
                await todoist.deleteComment(a.comment_id);
                formattedResult = "🗑️ **Comment Deleted!**";
                break;
            }
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
        return {
            content: [
                {
                    type: "text",
                    text: formattedResult,
                },
            ],
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            content: [
                {
                    type: "text",
                    text: `❌ **Error:** ${errorMessage}`,
                },
            ],
            isError: true,
        };
    }
});
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Todoist MCP Server started successfully");
}
main().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map