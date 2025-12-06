#!/usr/bin/env node
/**
 * Todoist MCP Server for Gemini CLI
 * 
 * A Model Context Protocol server providing complete Todoist integration.
 * Supports tasks, projects, sections, labels, and comments.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { TodoistClient } from "./todoist-client.js";
import { TODOIST_TOOLS } from "./tools.js";

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

// Initialize MCP Server
const server = new Server(
  {
    name: "todoist-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

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
    let result: unknown;

    switch (name) {
      // ==================== TASKS ====================
      case "create_task":
        result = await todoist.createTask({
          content: a.content as string,
          description: a.description as string | undefined,
          project_id: a.project_id as string | undefined,
          section_id: a.section_id as string | undefined,
          parent_id: a.parent_id as string | undefined,
          labels: a.labels as string[] | undefined,
          priority: a.priority as number | undefined,
          due_string: a.due_string as string | undefined,
          due_date: a.due_date as string | undefined,
          assignee_id: a.assignee_id as string | undefined,
          duration: a.duration as number | undefined,
          duration_unit: a.duration_unit as "minute" | "day" | undefined,
        });
        break;

      case "get_tasks":
        result = await todoist.getTasks({
          project_id: a.project_id as string | undefined,
          section_id: a.section_id as string | undefined,
          label: a.label as string | undefined,
          filter: a.filter as string | undefined,
          ids: a.ids as string[] | undefined,
        });
        break;

      case "get_task":
        result = await todoist.getTask(a.task_id as string);
        break;

      case "update_task":
        result = await todoist.updateTask(a.task_id as string, {
          content: a.content as string | undefined,
          description: a.description as string | undefined,
          labels: a.labels as string[] | undefined,
          priority: a.priority as number | undefined,
          due_string: a.due_string as string | undefined,
          due_date: a.due_date as string | undefined,
          assignee_id: a.assignee_id as string | undefined,
        });
        break;

      case "complete_task":
        await todoist.closeTask(a.task_id as string);
        result = { success: true, message: "Task completed successfully" };
        break;

      case "reopen_task":
        await todoist.reopenTask(a.task_id as string);
        result = { success: true, message: "Task reopened successfully" };
        break;

      case "delete_task":
        await todoist.deleteTask(a.task_id as string);
        result = { success: true, message: "Task deleted successfully" };
        break;

      // ==================== PROJECTS ====================
      case "get_projects":
        result = await todoist.getProjects();
        break;

      case "get_project":
        result = await todoist.getProject(a.project_id as string);
        break;

      case "create_project":
        result = await todoist.createProject({
          name: a.name as string,
          parent_id: a.parent_id as string | undefined,
          color: a.color as string | undefined,
          is_favorite: a.is_favorite as boolean | undefined,
          view_style: a.view_style as "list" | "board" | undefined,
        });
        break;

      case "update_project":
        result = await todoist.updateProject(a.project_id as string, {
          name: a.name as string | undefined,
          color: a.color as string | undefined,
          is_favorite: a.is_favorite as boolean | undefined,
          view_style: a.view_style as "list" | "board" | undefined,
        });
        break;

      case "delete_project":
        await todoist.deleteProject(a.project_id as string);
        result = { success: true, message: "Project deleted successfully" };
        break;

      // ==================== SECTIONS ====================
      case "get_sections":
        result = await todoist.getSections(a.project_id as string | undefined);
        break;

      case "get_section":
        result = await todoist.getSection(a.section_id as string);
        break;

      case "create_section":
        result = await todoist.createSection({
          name: a.name as string,
          project_id: a.project_id as string,
          order: a.order as number | undefined,
        });
        break;

      case "update_section":
        result = await todoist.updateSection(a.section_id as string, {
          name: a.name as string,
        });
        break;

      case "delete_section":
        await todoist.deleteSection(a.section_id as string);
        result = { success: true, message: "Section deleted successfully" };
        break;

      // ==================== LABELS ====================
      case "get_labels":
        result = await todoist.getLabels();
        break;

      case "get_label":
        result = await todoist.getLabel(a.label_id as string);
        break;

      case "create_label":
        result = await todoist.createLabel({
          name: a.name as string,
          color: a.color as string | undefined,
          order: a.order as number | undefined,
          is_favorite: a.is_favorite as boolean | undefined,
        });
        break;

      case "update_label":
        result = await todoist.updateLabel(a.label_id as string, {
          name: a.name as string | undefined,
          color: a.color as string | undefined,
          order: a.order as number | undefined,
          is_favorite: a.is_favorite as boolean | undefined,
        });
        break;

      case "delete_label":
        await todoist.deleteLabel(a.label_id as string);
        result = { success: true, message: "Label deleted successfully" };
        break;

      // ==================== COMMENTS ====================
      case "get_comments":
        result = await todoist.getComments({
          task_id: a.task_id as string | undefined,
          project_id: a.project_id as string | undefined,
        });
        break;

      case "get_comment":
        result = await todoist.getComment(a.comment_id as string);
        break;

      case "create_comment":
        result = await todoist.createComment({
          content: a.content as string,
          task_id: a.task_id as string | undefined,
          project_id: a.project_id as string | undefined,
        });
        break;

      case "update_comment":
        result = await todoist.updateComment(a.comment_id as string, {
          content: a.content as string,
        });
        break;

      case "delete_comment":
        await todoist.deleteComment(a.comment_id as string);
        result = { success: true, message: "Comment deleted successfully" };
        break;

      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${errorMessage}`,
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
