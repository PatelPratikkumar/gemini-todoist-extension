# 🎯 Gemini CLI Todoist Extension

> Full Todoist task management integration for [Gemini CLI](https://github.com/google-gemini/gemini-cli) via Model Context Protocol (MCP).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Gemini CLI](https://img.shields.io/badge/Gemini%20CLI-Extension-blue.svg)](https://github.com/google-gemini/gemini-cli)

## ✨ Features

- **23 MCP Tools** covering all Todoist operations
- **Natural Language** - "Add groceries to my shopping list for tomorrow"
- **Hierarchical View** - See tasks and subtasks in a nested tree structure
- **Smart Formatting** - Clean, readable output (no raw JSON!)
- **Move with Subtasks** - Move parent tasks with all subtasks preserved
- **Smart Confirmations** - Confirms before completing or deleting
- **Organized Commands** - 15+ slash commands by category
- **Voice-Friendly** - Handles transcription errors gracefully

### Supported Operations

| Category | Operations |
|----------|------------|
| **Tasks** | Create, list, update, move, complete, reopen, delete |
| **Projects** | Create, list, update, delete |
| **Sections** | Create, list, update, delete |
| **Labels** | Create, list, update, delete |
| **Comments** | Create, list, update, delete |

---

## 🔑 Prerequisites

Before installing, you need:

1. **Node.js 18+** - [Download here](https://nodejs.org/)
2. **Gemini CLI** - Install globally:
   ```bash
   npm install -g @google/gemini-cli
   ```
3. **Todoist API Token** - Get yours below 👇

---

## 🔐 Getting Your Todoist API Token

1. Log in to [Todoist](https://todoist.com)
2. Go to **Settings** → **Integrations** → **Developer**
   - Direct link: https://todoist.com/prefs/integrations
3. Scroll to **API token** section
4. Click **Copy** to copy your token

> ⚠️ **Keep your token secret!** Never share it or commit it to git.

---

## ⚙️ Setting Up Your API Token

The extension reads your token from the `TODOIST_API_TOKEN` environment variable. Choose your operating system:

<details>
<summary><b>🪟 Windows</b></summary>

### Option 1: PowerShell (Recommended - Permanent)

Open **PowerShell as Administrator** and run:

```powershell
[System.Environment]::SetEnvironmentVariable('TODOIST_API_TOKEN', 'your_token_here', 'User')
```

**Then restart your terminal** for changes to take effect.

### Option 2: Command Prompt (Permanent)

```cmd
setx TODOIST_API_TOKEN "your_token_here"
```

**Then restart your terminal.**

### Option 3: GUI Method

1. Press `Win + R`, type `sysdm.cpl`, press Enter
2. Go to **Advanced** tab → **Environment Variables**
3. Under **User variables**, click **New**
4. Variable name: `TODOIST_API_TOKEN`
5. Variable value: `your_token_here`
6. Click **OK** and restart your terminal

### Verify It's Set

```powershell
echo $env:TODOIST_API_TOKEN
```

</details>

<details>
<summary><b>🍎 macOS</b></summary>

### For Zsh (default on macOS)

Add to your `~/.zshrc`:

```bash
echo 'export TODOIST_API_TOKEN="your_token_here"' >> ~/.zshrc
source ~/.zshrc
```

### For Bash

Add to your `~/.bash_profile`:

```bash
echo 'export TODOIST_API_TOKEN="your_token_here"' >> ~/.bash_profile
source ~/.bash_profile
```

### Verify It's Set

```bash
echo $TODOIST_API_TOKEN
```

</details>

<details>
<summary><b>🐧 Linux</b></summary>

### For Bash

Add to your `~/.bashrc`:

```bash
echo 'export TODOIST_API_TOKEN="your_token_here"' >> ~/.bashrc
source ~/.bashrc
```

### For Zsh

Add to your `~/.zshrc`:

```bash
echo 'export TODOIST_API_TOKEN="your_token_here"' >> ~/.zshrc
source ~/.zshrc
```

### For Fish

```fish
set -Ux TODOIST_API_TOKEN "your_token_here"
```

### Verify It's Set

```bash
echo $TODOIST_API_TOKEN
```

</details>

---

## 📦 Installation

### Option 1: Install from GitHub with Auto-Update (Recommended)

```bash
gemini extensions install https://github.com/PatelPratikkumar/gemini-todoist-extension --auto-update --consent
```

This enables automatic updates when new versions are released.

### Option 2: Install without Auto-Update

```bash
gemini extensions install https://github.com/PatelPratikkumar/gemini-todoist-extension --consent
```

### Option 3: Install from Local Clone (For Development)

```bash
# Clone the repository
git clone https://github.com/PatelPratikkumar/gemini-todoist-extension.git
cd gemini-todoist-extension

# Install dependencies
npm install

# Build the extension
npm run build

# Link to Gemini CLI
gemini extensions link .
```

---

## 🔄 Updates

### With Auto-Update Enabled

If you installed with `--auto-update`, the extension updates automatically when you start Gemini CLI.

### Manual Update

```bash
# Update this extension
gemini extensions update todoist-extension

# Or update all extensions
gemini extensions update --all
```

### Check for Updates

```bash
gemini extensions list
```

---

## 🚀 Usage

Start Gemini CLI and use natural language or slash commands:

```bash
gemini
```

### Natural Language Examples

```
> Add a task to buy groceries tomorrow
> What's on my list for today?
> Show me overdue tasks
> Mark the groceries task as done
> Create a project called "Q1 Planning" with blue color
> Delete the old shopping task
```

### Slash Commands

#### Tasks
| Command | Description |
|---------|-------------|
| `/tasks:add` | Add a new task |
| `/tasks:list` | List tasks with filters |
| `/tasks:complete` | Mark task as complete |
| `/tasks:update` | Update a task |
| `/tasks:delete` | Delete a task |
| `/tasks:reopen` | Reopen completed task |

#### Projects
| Command | Description |
|---------|-------------|
| `/projects:list` | List all projects |
| `/projects:create` | Create new project |
| `/projects:delete` | Delete a project |

#### Sections
| Command | Description |
|---------|-------------|
| `/sections:list` | List sections in project |
| `/sections:create` | Create new section |

#### Labels
| Command | Description |
|---------|-------------|
| `/labels:list` | List all labels |
| `/labels:create` | Create new label |

#### Comments
| Command | Description |
|---------|-------------|
| `/comments:list` | View task comments |
| `/comments:add` | Add comment to task |

### Command Syntax

```bash
# Add task with options
/tasks:add Buy milk tomorrow @Shopping !2 #groceries

# List with filters
/tasks:list --project Work --priority 1

# Complete by name
/tasks:complete buy groceries
```

---

## 📁 Project Structure

```
gemini-todoist-extension/
├── commands/
│   ├── tasks/              # Task-related slash commands
│   │   ├── add.toml
│   │   ├── list.toml
│   │   ├── complete.toml
│   │   ├── update.toml
│   │   ├── delete.toml
│   │   └── reopen.toml
│   ├── projects/           # Project slash commands
│   │   ├── list.toml
│   │   ├── create.toml
│   │   └── delete.toml
│   ├── sections/           # Section slash commands
│   │   ├── list.toml
│   │   └── create.toml
│   ├── labels/             # Label slash commands
│   │   ├── list.toml
│   │   └── create.toml
│   └── comments/           # Comment slash commands
│       ├── list.toml
│       └── add.toml
├── src/
│   ├── server.ts           # MCP server entry point & tool handlers
│   ├── todoist-client.ts   # Todoist REST & Sync API client
│   ├── formatter.ts        # Human-readable output formatting
│   └── tools.ts            # 23 MCP tool definitions
├── dist/                   # Compiled JavaScript output
│   └── bundle.js           # Bundled extension (esbuild)
├── GEMINI.md               # AI context instructions
├── gemini-extension.json   # Extension manifest
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Test the extension
gemini extensions link .
gemini
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📋 Changelog

### v1.7.0 (2025-12-07)
- 📊 **Hierarchical Table Format** - Tasks displayed in table with indented subtasks
- ✨ Full task names (no truncation) with natural line wrapping
- 🎯 Clean visual hierarchy using simple space indentation

### v1.6.0 (2025-12-07)
- 🌳 **Hierarchical Task View** - Tasks are now displayed in a nested tree structure
- 📋 Improved list formatting with indentation for subtasks
- 👁️ Better visual organization for complex projects

### v1.5.0 (2025-12-07)
- 🔧 **Move Task with Subtasks** - `move_task` now preserves parent-child hierarchy
- 📦 Subtasks are automatically moved with their parent task
- ✨ Added `include_subtasks` option (default: true)
- 📊 Shows count of moved subtasks in output

### v1.4.0 (2025-12-07)
- ✨ **New `move_task` Tool** - Move tasks between projects, sections, or make subtasks
- 🔄 Uses Todoist Sync API for moving (REST API doesn't support this)

### v1.3.0 (2025-12-07)
- 📋 **Task IDs in Output** - All list outputs now include IDs for reference
- 🎨 Improved table formatting with ID columns

### v1.2.0 (2025-12-07)
- 🎨 **Server-Side Formatting** - Clean, human-readable output instead of raw JSON
- 📊 Beautiful tables for tasks, projects, sections, labels, comments
- 🔴🟠🟡⚪ Priority emojis for visual clarity

### v1.1.0 (2025-12-06)
- 📦 Added esbuild bundling for smaller extension size
- 🔧 Fixed TypeScript compilation issues
- 📁 Extension now works properly from GitHub installation

### v1.0.0 (2025-12-06)
- 🎉 **Initial Release**
- 22 MCP tools for complete Todoist integration
- 15 slash commands for quick access
- Full support for tasks, projects, sections, labels, and comments
- Natural language processing for voice-friendly input
- System environment variable for secure API token storage

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file.

---

## 🙏 Acknowledgments

- [Todoist](https://todoist.com) for their excellent API
- [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) team
- [Model Context Protocol](https://modelcontextprotocol.io/) specification

---

## ❓ Troubleshooting

### "TODOIST_API_TOKEN not set"

Make sure you've set the environment variable and restarted your terminal. Verify with:
- Windows: `echo $env:TODOIST_API_TOKEN`
- Mac/Linux: `echo $TODOIST_API_TOKEN`

### "Extension not loading"

1. Rebuild: `npm run build`
2. Relink: `gemini extensions uninstall todoist-extension && gemini extensions link .`

### "API errors"

- Verify your token at https://todoist.com/prefs/integrations
- Check you have internet connectivity
- Ensure token has correct permissions

---

**Made with ❤️ for productivity enthusiasts**
