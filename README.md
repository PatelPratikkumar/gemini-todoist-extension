# 🎯 Gemini CLI Todoist Extension

> Full Todoist task management integration for [Gemini CLI](https://github.com/google-gemini/gemini-cli) via Model Context Protocol (MCP).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Gemini CLI](https://img.shields.io/badge/Gemini%20CLI-Extension-blue.svg)](https://github.com/google-gemini/gemini-cli)

## ✨ Features

- **22 MCP Tools** covering all Todoist operations
- **Natural Language** - "Add groceries to my shopping list for tomorrow"
- **Smart Confirmations** - Confirms before completing or deleting
- **Organized Commands** - 15+ slash commands by category
- **Voice-Friendly** - Handles transcription errors gracefully

### Supported Operations

| Category | Operations |
|----------|------------|
| **Tasks** | Create, list, update, complete, reopen, delete |
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
| `/todo:add` | Add a new task |
| `/todo:list` | List tasks with filters |
| `/todo:complete` | Mark task as complete |
| `/todo:update` | Update a task |
| `/todo:delete` | Delete a task |
| `/todo:reopen` | Reopen completed task |

#### Projects
| Command | Description |
|---------|-------------|
| `/todo:projects` | List all projects |
| `/todo:project-create` | Create new project |
| `/todo:project-delete` | Delete a project |

#### Sections
| Command | Description |
|---------|-------------|
| `/todo:sections` | List sections in project |
| `/todo:section-create` | Create new section |

#### Labels
| Command | Description |
|---------|-------------|
| `/todo:labels` | List all labels |
| `/todo:label-create` | Create new label |

#### Comments
| Command | Description |
|---------|-------------|
| `/todo:comments` | View task comments |
| `/todo:comment-add` | Add comment to task |

### Command Syntax

```bash
# Add task with options
/todo:add Buy milk tomorrow @Shopping !2 #groceries

# List with filters
/todo:list --project Work --priority 1

# Complete by name
/todo:complete buy groceries
```

---

## 📁 Project Structure

```
gemini-todoist-extension/
├── commands/
│   ├── tasks/          # Task-related commands
│   │   ├── add.toml
│   │   ├── list.toml
│   │   ├── complete.toml
│   │   ├── update.toml
│   │   ├── delete.toml
│   │   └── reopen.toml
│   ├── projects/       # Project commands
│   │   ├── list.toml
│   │   ├── create.toml
│   │   └── delete.toml
│   ├── sections/       # Section commands
│   │   ├── list.toml
│   │   └── create.toml
│   ├── labels/         # Label commands
│   │   ├── list.toml
│   │   └── create.toml
│   └── comments/       # Comment commands
│       ├── list.toml
│       └── add.toml
├── src/
│   ├── server.ts       # MCP server entry point
│   ├── todoist-client.ts   # Todoist API client
│   └── tools.ts        # Tool definitions
├── GEMINI.md           # AI context instructions
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
