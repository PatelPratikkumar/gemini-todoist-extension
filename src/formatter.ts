/**
 * Output Formatter for Todoist MCP Server
 * Converts raw API responses to human-readable formatted text
 */

import type { TodoistTask, TodoistProject, TodoistSection, TodoistLabel, TodoistComment } from "./todoist-client.js";

// Priority mapping (API uses inverted values)
const PRIORITY_DISPLAY: Record<number, string> = {
  4: "🔴 P1 (Urgent)",
  3: "🟠 P2 (High)",
  2: "🟡 P3 (Medium)",
  1: "⚪ P4 (Normal)",
};

const PRIORITY_SHORT: Record<number, string> = {
  4: "🔴 P1",
  3: "🟠 P2",
  2: "🟡 P3",
  1: "⚪ P4",
};

// Format a single task
export function formatTask(task: TodoistTask): string {
  const lines: string[] = [];
  
  lines.push(`📌 **${task.content}**`);
  lines.push(`   🆔 Task ID: ${task.id}`);
  
  if (task.description) {
    lines.push(`   📝 ${task.description}`);
  }
  
  const details: string[] = [];
  
  if (task.due) {
    const dueDate = task.due.datetime 
      ? new Date(task.due.datetime).toLocaleString()
      : task.due.date;
    details.push(`📅 Due: ${dueDate}${task.due.is_recurring ? " (recurring)" : ""}`);
  }
  
  details.push(PRIORITY_DISPLAY[task.priority] || "⚪ P4");
  
  if (task.labels && task.labels.length > 0) {
    details.push(`🏷️ Labels: ${task.labels.join(", ")}`);
  }
  
  if (task.comment_count > 0) {
    details.push(`💬 ${task.comment_count} comment${task.comment_count > 1 ? "s" : ""}`);
  }
  
  lines.push(`   ${details.join(" | ")}`);
  lines.push(`   🔗 ${task.url}`);
  
  return lines.join("\n");
}

// Helper interface for tree structure
interface TaskNode {
  task: TodoistTask;
  children: TaskNode[];
}

// Build a tree from a flat list of tasks
function buildTaskTree(tasks: TodoistTask[]): TaskNode[] {
  const taskMap = new Map<string, TaskNode>();
  const roots: TaskNode[] = [];

  // Initialize nodes
  tasks.forEach(task => {
    taskMap.set(task.id, { task, children: [] });
  });

  // Build hierarchy
  tasks.forEach(task => {
    const node = taskMap.get(task.id)!;
    // If parent exists in the current list, add as child
    if (task.parent_id && taskMap.has(task.parent_id)) {
      const parent = taskMap.get(task.parent_id)!;
      parent.children.push(node);
    } else {
      // Otherwise treat as root (even if it has a parent_id that isn't in this list)
      roots.push(node);
    }
  });

  // Sort by order (Todoist 'order' field)
  const sortNodes = (nodes: TaskNode[]) => {
    nodes.sort((a, b) => a.task.order - b.task.order);
    nodes.forEach(node => sortNodes(node.children));
  };
  
  sortNodes(roots);
  return roots;
}

// Recursive render function
function renderTaskNode(node: TaskNode, indentLevel: number = 0): string[] {
  const lines: string[] = [];
  const task = node.task;
  // Use 2 spaces for indentation to ensure markdown lists render correctly
  const indent = "  ".repeat(indentLevel);
  const bullet = "-"; 

  const priorityIcon = PRIORITY_SHORT[task.priority] || "⚪ P4";
  const due = task.due 
      ? ` 📅 ${task.due.datetime ? new Date(task.due.datetime).toLocaleDateString() : task.due.date}`
      : "";
  
  const labels = task.labels && task.labels.length > 0 ? ` 🏷️ ${task.labels.join(", ")}` : "";

  // Main task line
  lines.push(`${indent}${bullet} ${priorityIcon} **${task.content}** \`ID: ${task.id}\`${due}${labels}`);
  
  // Description (indented)
  if (task.description) {
     // Indent description to align with text
     lines.push(`${indent}    📝 _${task.description.split('\n')[0]}${task.description.includes('\n') ? '...' : ''}_`);
  }

  // Render children
  node.children.forEach(child => {
    lines.push(...renderTaskNode(child, indentLevel + 1));
  });

  return lines;
}

// Format a list of tasks as a hierarchical list
export function formatTaskList(tasks: TodoistTask[], title?: string): string {
  if (tasks.length === 0) {
    return "📋 No tasks found.";
  }

  const tree = buildTaskTree(tasks);
  const lines: string[] = [];

  lines.push(`📋 **${title || "Tasks"}** (${tasks.length} item${tasks.length > 1 ? "s" : ""})`);
  lines.push(""); // Empty line for markdown separation

  tree.forEach(node => {
    lines.push(...renderTaskNode(node));
  });

  return lines.join("\n");
}

// Format a single project
export function formatProject(project: TodoistProject): string {
  const lines: string[] = [];
  
  const icon = project.is_inbox_project ? "📥" : "📁";
  lines.push(`${icon} **${project.name}**`);
  
  const details: string[] = [];
  details.push(`🎨 ${project.color}`);
  details.push(`📋 ${project.view_style} view`);
  
  if (project.is_shared) {
    details.push("👥 Shared");
  }
  if (project.is_favorite) {
    details.push("⭐ Favorite");
  }
  if (project.comment_count > 0) {
    details.push(`💬 ${project.comment_count} comments`);
  }
  
  lines.push(`   ${details.join(" | ")}`);
  lines.push(`   🔗 ${project.url}`);
  
  return lines.join("\n");
}

// Format a list of projects as a table
export function formatProjectList(projects: TodoistProject[]): string {
  if (projects.length === 0) {
    return "📁 No projects found.";
  }
  
  const lines: string[] = [];
  
  lines.push(`📁 **Your Projects** (${projects.length} total)\n`);
  lines.push("| # | ID | Project | Color | View | Shared |");
  lines.push("|---|-----|---------|-------|------|--------|");
  
  projects.forEach((project, index) => {
    const icon = project.is_inbox_project ? "📥" : "📁";
    const shared = project.is_shared ? "✅" : "—";
    
    lines.push(`| ${index + 1} | ${project.id} | ${icon} ${project.name} | ${project.color} | ${project.view_style} | ${shared} |`);
  });
  
  return lines.join("\n");
}

// Format a single section
export function formatSection(section: TodoistSection): string {
  return `📂 **${section.name}** (Section ID: ${section.id})`;
}

// Format a list of sections
export function formatSectionList(sections: TodoistSection[], projectName?: string): string {
  if (sections.length === 0) {
    return "📂 No sections found.";
  }
  
  const lines: string[] = [];
  const title = projectName ? `Sections in "${projectName}"` : "Sections";
  
  lines.push(`📂 **${title}** (${sections.length} total)\n`);
  lines.push("| # | ID | Section Name |");
  lines.push("|---|-----|--------------|");
  
  sections.forEach((section, index) => {
    lines.push(`| ${index + 1} | ${section.id} | ${section.name} |`);
  });
  
  return lines.join("\n");
}

// Format a single label
export function formatLabel(label: TodoistLabel): string {
  const favorite = label.is_favorite ? " ⭐" : "";
  return `🏷️ **${label.name}**${favorite} (${label.color})`;
}

// Format a list of labels
export function formatLabelList(labels: TodoistLabel[]): string {
  if (labels.length === 0) {
    return "🏷️ No labels found.";
  }
  
  const lines: string[] = [];
  
  lines.push(`🏷️ **Your Labels** (${labels.length} total)\n`);
  lines.push("| # | ID | Label | Color | Favorite |");
  lines.push("|---|-----|-------|-------|----------|");
  
  labels.forEach((label, index) => {
    const favorite = label.is_favorite ? "⭐" : "—";
    lines.push(`| ${index + 1} | ${label.id} | ${label.name} | ${label.color} | ${favorite} |`);
  });
  
  return lines.join("\n");
}

// Format a single comment
export function formatComment(comment: TodoistComment): string {
  const date = new Date(comment.posted_at).toLocaleString();
  return `💬 **Comment** (ID: ${comment.id}, ${date})\n   ${comment.content}`;
}

// Format a list of comments
export function formatCommentList(comments: TodoistComment[]): string {
  if (comments.length === 0) {
    return "💬 No comments found.";
  }
  
  const lines: string[] = [];
  
  lines.push(`💬 **Comments** (${comments.length} total)\n`);
  lines.push("| # | ID | Date | Content |");
  lines.push("|---|-----|------|---------|");
  
  comments.forEach((comment, index) => {
    const date = new Date(comment.posted_at).toLocaleDateString();
    const content = comment.content.length > 50 
      ? comment.content.substring(0, 47) + "..." 
      : comment.content;
    lines.push(`| ${index + 1} | ${comment.id} | ${date} | ${content} |`);
  });
  
  return lines.join("\n");
}

// Format success messages
export function formatSuccess(action: string, itemType: string, itemName?: string): string {
  const name = itemName ? ` "${itemName}"` : "";
  return `✅ **Success!** ${itemType}${name} has been ${action}.`;
}

// Format created task confirmation
export function formatCreatedTask(task: TodoistTask): string {
  const lines: string[] = [];
  
  lines.push(`✅ **Task Created Successfully!**\n`);
  lines.push(`🆔 Task ID: ${task.id}`);
  lines.push(`📌 **${task.content}**`);
  
  if (task.description) {
    lines.push(`📝 ${task.description}`);
  }
  
  if (task.due) {
    const dueDate = task.due.datetime 
      ? new Date(task.due.datetime).toLocaleString()
      : task.due.date;
    lines.push(`📅 Due: ${dueDate}`);
  }
  
  lines.push(`${PRIORITY_DISPLAY[task.priority]}`);
  
  if (task.labels && task.labels.length > 0) {
    lines.push(`🏷️ Labels: ${task.labels.join(", ")}`);
  }
  
  lines.push(`🔗 ${task.url}`);
  
  return lines.join("\n");
}

// Format created project confirmation
export function formatCreatedProject(project: TodoistProject): string {
  const lines: string[] = [];
  
  lines.push(`✅ **Project Created Successfully!**\n`);
  lines.push(`🆔 Project ID: ${project.id}`);
  lines.push(`📁 **${project.name}**`);
  lines.push(`🎨 Color: ${project.color}`);
  lines.push(`📋 View: ${project.view_style}`);
  lines.push(`🔗 ${project.url}`);
  
  return lines.join("\n");
}

// Format created section confirmation
export function formatCreatedSection(section: TodoistSection): string {
  return `✅ **Section Created!** 📂 "${section.name}"`;
}

// Format created label confirmation  
export function formatCreatedLabel(label: TodoistLabel): string {
  return `✅ **Label Created!** 🏷️ "${label.name}" (${label.color})`;
}

// Format created comment confirmation
export function formatCreatedComment(comment: TodoistComment): string {
  return `✅ **Comment Added!**\n💬 ${comment.content}`;
}

// Format updated item confirmation
export function formatUpdated(itemType: string, name: string): string {
  return `✅ **${itemType} Updated!** "${name}"`;
}
