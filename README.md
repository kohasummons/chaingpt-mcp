# ChainGPT MCP

[![smithery badge](https://smithery.ai/badge/@kohasummons/chaingpt-mcp)](https://smithery.ai/server/@kohasummons/chaingpt-mcp)

A Model Context Protocol (MCP) server that allows you to bring ChainGPT capabilities into your AI Agent.

<a href="https://glama.ai/mcp/servers/@kohasummons/chaingpt-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@kohasummons/chaingpt-mcp/badge" alt="ChainGPT MCP server" />
</a>

## Features

- Get the latest crypto news
- Get the latest crypto prices
- Get the latest crypto market trends
- Get the latest crypto market news

## Setup

- Get your [ChainGPT Secret Key](https://app.chaingpt.org/apidashboard)
- You need to have a [Nodejs environment](https://nodejs.org/en/download/)(v18 or higher) to run this server
- A Compatible MCP Client. I recommend [Claude Desktop](https://claude.ai/download)

## Installation

### via Smithery

To install ChainGPT MCP Server for any MCP client automatically via [Smithery](https://smithery.ai/server/@kohasummon/chaingpt-mcp):

```bash
npx -y @smithery/cli install @kohasummon/chaingpt-mcp --client claude
```

This adds the server to claude desktop config. Replace `claude` with the name of the client you are using. See the list of clients [here](https://smithery.ai/server/@kohasummon/chaingpt-mcp).

### Manual Installation

```bash
pnpm install -g @kohasummon/chaingpt-mcp
```

### Configure Claude Desktop to recognize the ChainGPT MCP server

You can find claude_desktop_config.json inside the settings of Claude Desktop app:

Open the Claude Desktop app and enable Developer Mode from the top-left menu bar.

Once enabled, open Settings (also from the top-left menu bar) and navigate to the Developer Option, where you'll find the Edit Config button. Clicking it will open the claude_desktop_config.json file, allowing you to make the necessary edits.

OR (if you want to open claude_desktop_config.json from terminal)

#### For macOS:

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

#### For Windows:

```powershell
code %APPDATA%\Claude\claude_desktop_config.json
```

### 2. Add the ChainGPT MCP server configuration:

```json
{
  "mcpServers": {
    "chaingpt": {
      "command": "npx",
      "args": ["/path/to/chaingpt-mcp/build/index.js"],
      "env": {
        "CHAINGPT_SECRET_KEY": "your-secret-key-here"
      },
      "toolCallTimeoutMillis": 120000
    }
  }
}
```

Replace `your-secret-key-here` with your actual ChainGPT secret key from [app.chaingpt.org/apidashboard](https://app.chaingpt.org/apidashboard).

### 3. Restart Claude Desktop

For the changes to take effect:

1. Completely quit Claude Desktop (not just close the window)
2. Start Claude Desktop again
3. Look for the 🔌 icon to verify the ChainGPT MCP server is connected

## Troubleshooting

### Common Issues

1. **Server Not Found**

   - Verify the npm link is correctly set up
   - Check Claude Desktop configuration syntax
   - Ensure Node.js is properly installed

2. **API Key Issues**

   - Confirm your CHAINGPT_SECRET_KEY is valid
   - Check the CHAINGPT_SECRET_KEY is correctly set in the Claude Desktop config
   - Verify no spaces or quotes around the API key

3. **Connection Issues**

   - Restart Claude Desktop completely
   - Check Claude Desktop logs:

4. **Node.js should be minimum v18 (or higher)**

   ```bash
   # macOS
   tail -n 20 -f ~/Library/Logs/Claude/mcp*.log

   # Windows
   type "%APPDATA%\Claude\logs\mcp*.log"
   ```

5. **Tool Call Timeout**

   - Set the tool call timeout to 120 seconds or higher
   - This can be changed in the claude_desktop_config.json file

## Tools

| Tool Name            | Description                                                                       | Prompt                                                   |
| -------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- |
| chaingpt_invoke_chat | Invoke a chat with ChainGPT AI and get a response based on the provided question. | Yesterday, I bought 0.001 ETH. How much is it worth now? |
| chaingpt_get_news    | Get the latest crypto news                                                        | What's the latest news in the crypto world?              |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

<br>

Built with ❤️ by [Joshua Omobola](https://koha.wtf)