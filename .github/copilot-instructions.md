# Gemini CLI Todoist Extension - AI Agent Instructions

## Project Overview

This is a **Gemini CLI extension** providing full Todoist integration via the Model Context Protocol (MCP). It enables Gemini to manage tasks, projects, sections, labels, and comments through 22 tools.

## Voice Transcription Input

**CRITICAL:** User input often comes from voice transcription services. Expect:
- Misspellings and phonetic errors ("to do E" → "Todoist", "prority" → "priority")
- Missing punctuation and spacing
- Incomplete sentences

**Always interpret intent contextually. Ask for clarification when truly ambiguous.**

## Architecture

```
├── src/
│   ├── server.ts           # MCP server entry point - handles tool routing
│   ├── todoist-client.ts   # HTTP client for Todoist REST API v2
│   └── tools.ts            # Tool definitions (22 tools with JSON schemas)
├── commands/               # Slash command definitions (.toml)
├── GEMINI.md               # AI context for Gemini CLI
├── gemini-extension.json   # Extension manifest
└── .env                    # API token (git-ignored, NEVER commit)
```

## Key Patterns

### API Token Security
- Token stored in `.env` file (git-ignored)
- Loaded via `dotenv` at server startup
- Passed through `gemini-extension.json` env config
- **NEVER commit tokens or expose in logs**

### Todoist Client (`src/todoist-client.ts`)
- Direct HTTP client using `fetch` (no SDK dependency)
- Base URL: `https://api.todoist.com/rest/v2`
- Authorization: Bearer token header
- All methods are async and throw on API errors

### Tool Definitions (`src/tools.ts`)
- JSON Schema format for MCP protocol
- 22 tools across 5 categories: tasks, projects, sections, labels, comments
- Each tool has name, description, and inputSchema

### Server (`src/server.ts`)
- Uses `@modelcontextprotocol/sdk` for MCP protocol
- StdioServerTransport for Gemini CLI communication
- Switch-case routing for tool execution
- Returns JSON results or error messages

## Priority System (Todoist quirk)

| User Sees | API Value | Filter Syntax |
|-----------|-----------|---------------|
| p1 (urgent) | 4 | `p1` |
| p2 (high) | 3 | `p2` |
| p3 (medium) | 2 | `p3` |
| p4 (normal) | 1 | `p4` |

The API uses **inverted** priority values. Handle this mapping carefully.

## Development Workflow

```bash
# Install dependencies
npm install

# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Link extension locally for testing
gemini extensions link .
```

## Common Tasks

### Adding a New Tool
1. Add tool definition to `src/tools.ts`
2. Add handler case in `src/server.ts` switch statement
3. If new API endpoint, add method to `src/todoist-client.ts`
4. Update `GEMINI.md` with usage examples

### Modifying API Calls
- All API calls go through `TodoistClient.request()`
- Handle 204 No Content responses (returns empty object)
- Parse error responses for user-friendly messages

### Testing Changes
```bash
npm run build
gemini  # Start Gemini CLI with extension loaded
```

## Error Handling

- API errors thrown with status code and message
- Server wraps errors and returns `isError: true` in MCP response
- Common errors: 401 (bad token), 404 (not found), 400 (bad request)

## Dependencies

- `@modelcontextprotocol/sdk`: MCP server implementation
- `dotenv`: Environment variable loading
- `typescript`, `tsx`, `@types/node`: Development tooling

## File Locations

| Purpose | File |
|---------|------|
| API token | `.env` (create from `.env.example`) |
| Extension manifest | `gemini-extension.json` |
| AI context | `GEMINI.md` |
| Slash commands | `commands/*.toml` |
| Build output | `dist/` |
