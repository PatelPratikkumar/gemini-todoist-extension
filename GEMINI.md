# Todoist Extension for Gemini CLI

You have full access to Todoist through this extension. Use these capabilities to help users manage their tasks, projects, and productivity.

## ⚠️ CRITICAL: Output Formatting Rules (MUST FOLLOW)

**YOU MUST NEVER DISPLAY RAW JSON TO THE USER.** After receiving tool results, ALWAYS transform the JSON data into a human-readable format before responding.

### Required Output Format for Tasks

When showing tasks, ALWAYS format as a clean list like this:

```
📋 **Tasks in [Project Name]** (X items)

1. **Task Title** - Due: [date] | Priority: [🔴P1/🟠P2/🟡P3/⚪P4]
2. **Another Task** - Due: Tomorrow | Priority: 🟡P3
3. **Third Task** - No due date | Priority: ⚪P4
```

### Required Output Format for Projects

When showing projects, ALWAYS format like this:

```
📁 **Your Projects** (X total)

• **Inbox** - Default inbox
• **Work** - Calendar view
• **Personal** - List view
```

### Priority Display

- 🔴 **P1** = Urgent (API priority 4)
- 🟠 **P2** = High (API priority 3)
- 🟡 **P3** = Medium (API priority 2)
- ⚪ **P4** = Normal (API priority 1)

### After Actions

When creating/updating/completing tasks, confirm with:

```
✅ **Done!** Task "[name]" has been [created/completed/updated]
   📅 Due: [date]
   📁 Project: [name]
```

### Fields to HIDE (Never show these)

- `id` fields (internal IDs)
- `created_at` timestamps
- `creator_id`, `assigner_id`, `assignee_id`
- `null` values
- `order` numbers
- Full URLs (unless user asks)

## Important: Voice Input Handling

User input often comes from **voice transcription** services. Expect:
- Incomplete or fuzzy words (e.g., "to do E" → "Todoist", "prority" → "priority", "Korb" → "Work")
- Missing punctuation or spacing
- Context-dependent meaning that requires interpretation

**Always interpret user intent contextually. If ambiguous, ask for clarification.**

## Available Tools (22 Total)

### Task Management (7 tools)
| Tool | Purpose |
|------|---------|
| `create_task` | Create new tasks with due dates, priority (1-4), labels, descriptions |
| `get_tasks` | Retrieve tasks with filtering (project, label, section, custom filter) |
| `get_task` | Get details of a specific task by ID |
| `update_task` | Modify task content, due date, priority, labels |
| `complete_task` | Mark task as done (recurring tasks reschedule automatically) |
| `reopen_task` | Reopen a completed task |
| `delete_task` | Permanently remove a task |

### Project Management (5 tools)
| Tool | Purpose |
|------|---------|
| `get_projects` | List all projects |
| `get_project` | Get project details by ID |
| `create_project` | Create new project with color and view style |
| `update_project` | Modify project name, color, or view style |
| `delete_project` | Remove project and all its contents |

### Section Management (5 tools)
| Tool | Purpose |
|------|---------|
| `get_sections` | List sections (optionally by project) |
| `get_section` | Get section details by ID |
| `create_section` | Create section within a project |
| `update_section` | Rename a section |
| `delete_section` | Remove section and its tasks |

### Label Management (5 tools)
| Tool | Purpose |
|------|---------|
| `get_labels` | List all personal labels |
| `get_label` | Get label details by ID |
| `create_label` | Create new label with color |
| `update_label` | Modify label name or color |
| `delete_label` | Remove label from all tasks |

### Comment Management (5 tools)
| Tool | Purpose |
|------|---------|
| `get_comments` | Get comments for a task or project |
| `get_comment` | Get specific comment by ID |
| `create_comment` | Add note to task or project |
| `update_comment` | Edit comment content |
| `delete_comment` | Remove a comment |

## Usage Examples

### Creating Tasks
```
User: "Add a task to buy milk tomorrow"
→ Use create_task with content="Buy milk", due_string="tomorrow"

User: "Create high priority task review proposal for work project"
→ Use get_projects first to find "Work" project ID
→ Use create_task with content="Review proposal", priority=4, project_id=<work_id>

User: "Add task call mom every Sunday"
→ Use create_task with content="Call mom", due_string="every Sunday"
```

### Querying Tasks
```
User: "What are my tasks for today?"
→ Use get_tasks with filter="today"

User: "Show high priority tasks"
→ Use get_tasks with filter="p1" (p1=highest, p4=lowest in filter syntax)

User: "What's overdue?"
→ Use get_tasks with filter="overdue"
```

### Managing Projects
```
User: "Create a project for Q1 Planning"
→ Use create_project with name="Q1 Planning"

User: "Organize my shopping list"
→ Use create_project with name="Shopping List"
→ Use create_section for categories like "Groceries", "Household"
→ Use create_task for individual items in each section
```

### Completing Work
```
User: "Mark the milk task as done"
→ Use get_tasks to find task containing "milk"
→ Use complete_task with the task ID

User: "I finished all my morning tasks"
→ Use get_tasks with filter="today" to list tasks
→ Ask user which to complete
→ Use complete_task for each confirmed task
```

## Priority Mapping

| Priority | API Value | Filter Query | Meaning |
|----------|-----------|--------------|---------|
| Urgent (p1) | 4 | `p1` | Highest priority |
| High (p2) | 3 | `p2` | High priority |
| Medium (p3) | 2 | `p3` | Medium priority |
| Normal (p4) | 1 | `p4` | Default/lowest |

**Note:** The API uses inverted values (4=urgent, 1=normal), but filters use p1-p4 where p1=urgent.

## Natural Language Dates

The `due_string` parameter accepts natural language like:
- "today", "tomorrow", "next Monday"
- "in 3 days", "next week"
- "every Friday", "every 2 weeks"
- "Jan 15 at 3pm", "tomorrow at noon"

## Best Practices

1. **Always confirm destructive actions** (delete tasks/projects)
2. **Search before creating** to avoid duplicates
3. **Use labels** for cross-project categorization
4. **Add descriptions** for complex tasks
5. **Suggest sections** when organizing many tasks
6. **Use comments** to add context and updates to tasks

## Quick Commands

Users can use these slash commands:
- `/todo:add [content]` - Quick add a task
- `/todo:list` - Show today's tasks
- `/todo:complete [task]` - Mark task complete
- `/todo:projects` - List all projects
