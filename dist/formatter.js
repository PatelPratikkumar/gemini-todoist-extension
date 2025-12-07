/**
 * Output Formatter for Todoist MCP Server
 * Converts raw API responses to human-readable formatted text
 */
// Priority mapping (API uses inverted values)
const PRIORITY_DISPLAY = {
    4: "🔴 P1 (Urgent)",
    3: "🟠 P2 (High)",
    2: "🟡 P3 (Medium)",
    1: "⚪ P4 (Normal)",
};
const PRIORITY_SHORT = {
    4: "🔴 P1",
    3: "🟠 P2",
    2: "🟡 P3",
    1: "⚪ P4",
};
// Format a single task
export function formatTask(task) {
    const lines = [];
    lines.push(`📌 **${task.content}**`);
    lines.push(`   🆔 Task ID: ${task.id}`);
    if (task.description) {
        lines.push(`   📝 ${task.description}`);
    }
    const details = [];
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
// Build a tree from a flat list of tasks
function buildTaskTree(tasks) {
    const taskMap = new Map();
    const roots = [];
    // Initialize nodes
    tasks.forEach(task => {
        taskMap.set(task.id, { task, children: [] });
    });
    // Build hierarchy
    tasks.forEach(task => {
        const node = taskMap.get(task.id);
        // If parent exists in the current list, add as child
        if (task.parent_id && taskMap.has(task.parent_id)) {
            const parent = taskMap.get(task.parent_id);
            parent.children.push(node);
        }
        else {
            // Otherwise treat as root (even if it has a parent_id that isn't in this list)
            roots.push(node);
        }
    });
    // Sort by order (Todoist 'order' field)
    const sortNodes = (nodes) => {
        nodes.sort((a, b) => a.task.order - b.task.order);
        nodes.forEach(node => sortNodes(node.children));
    };
    sortNodes(roots);
    return roots;
}
// Recursive table row builder
function buildTableRows(node, indentLevel = 0, counter) {
    const rows = [];
    const task = node.task;
    // Create indentation for nested tasks (using simple spaces for visual hierarchy)
    const indent = indentLevel > 0 ? "  ".repeat(indentLevel) : "";
    const due = task.due
        ? (task.due.datetime
            ? new Date(task.due.datetime).toLocaleDateString()
            : task.due.date)
        : "—";
    const priority = PRIORITY_SHORT[task.priority] || "⚪ P4";
    const labels = task.labels?.length ? task.labels.join(", ") : "—";
    const content = indent + task.content;
    // Add row for current task
    rows.push(`| ${counter.value} | ${task.id} | ${content} | ${due} | ${priority} | ${labels} |`);
    counter.value++;
    // Add rows for children
    node.children.forEach(child => {
        rows.push(...buildTableRows(child, indentLevel + 1, counter));
    });
    return rows;
}
// Format a list of tasks as a hierarchical table
export function formatTaskList(tasks, title) {
    if (tasks.length === 0) {
        return "📋 No tasks found.";
    }
    const tree = buildTaskTree(tasks);
    const lines = [];
    lines.push(`📋 **${title || "Tasks"}** (${tasks.length} item${tasks.length > 1 ? "s" : ""})\n`);
    lines.push("| # | ID | Task | Due | Priority | Labels |");
    lines.push("|---|-----|------|-----|----------|--------|");
    const counter = { value: 1 };
    tree.forEach(node => {
        lines.push(...buildTableRows(node, 0, counter));
    });
    return lines.join("\n");
}
// Format a single project
export function formatProject(project) {
    const lines = [];
    const icon = project.is_inbox_project ? "📥" : "📁";
    lines.push(`${icon} **${project.name}**`);
    const details = [];
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
export function formatProjectList(projects) {
    if (projects.length === 0) {
        return "📁 No projects found.";
    }
    const lines = [];
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
export function formatSection(section) {
    return `📂 **${section.name}** (Section ID: ${section.id})`;
}
// Format a list of sections
export function formatSectionList(sections, projectName) {
    if (sections.length === 0) {
        return "📂 No sections found.";
    }
    const lines = [];
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
export function formatLabel(label) {
    const favorite = label.is_favorite ? " ⭐" : "";
    return `🏷️ **${label.name}**${favorite} (${label.color})`;
}
// Format a list of labels
export function formatLabelList(labels) {
    if (labels.length === 0) {
        return "🏷️ No labels found.";
    }
    const lines = [];
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
export function formatComment(comment) {
    const date = new Date(comment.posted_at).toLocaleString();
    return `💬 **Comment** (ID: ${comment.id}, ${date})\n   ${comment.content}`;
}
// Format a list of comments
export function formatCommentList(comments) {
    if (comments.length === 0) {
        return "💬 No comments found.";
    }
    const lines = [];
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
export function formatSuccess(action, itemType, itemName) {
    const name = itemName ? ` "${itemName}"` : "";
    return `✅ **Success!** ${itemType}${name} has been ${action}.`;
}
// Format created task confirmation
export function formatCreatedTask(task) {
    const lines = [];
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
export function formatCreatedProject(project) {
    const lines = [];
    lines.push(`✅ **Project Created Successfully!**\n`);
    lines.push(`🆔 Project ID: ${project.id}`);
    lines.push(`📁 **${project.name}**`);
    lines.push(`🎨 Color: ${project.color}`);
    lines.push(`📋 View: ${project.view_style}`);
    lines.push(`🔗 ${project.url}`);
    return lines.join("\n");
}
// Format created section confirmation
export function formatCreatedSection(section) {
    return `✅ **Section Created!** 📂 "${section.name}"`;
}
// Format created label confirmation  
export function formatCreatedLabel(label) {
    return `✅ **Label Created!** 🏷️ "${label.name}" (${label.color})`;
}
// Format created comment confirmation
export function formatCreatedComment(comment) {
    return `✅ **Comment Added!**\n💬 ${comment.content}`;
}
// Format updated item confirmation
export function formatUpdated(itemType, name) {
    return `✅ **${itemType} Updated!** "${name}"`;
}
//# sourceMappingURL=formatter.js.map