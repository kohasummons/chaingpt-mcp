# ChainGPT MCP
[![smithery badge](https://smithery.ai/badge/@kohasummons/chaingpt-mcp)](https://smithery.ai/server/@kohasummons/chaingpt-mcp)

A Model Context Protocol (MCP) server that allows you to bring ChainGPT capabilities into your AI Agent.

## Features
- Get the latest crypto news
- Get the latest crypto prices
- Get the latest crypto market trends
- Get the latest crypto market news

## Setup

- Get your [ChainGPT Secret Key](https://app.chaingpt.org/apidashboard)
- You need to have a [Nodejs environment](https://nodejs.org/en/download/) to run this server

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

## Tools

| Tool Name | Description | Prompt |
|-----------|-------------|--------|
| chaingpt_invoke_chat | Invoke a chat with ChainGPT AI and get a response based on the provided question. | Yesterday, I bought 0.001 ETH. How much is it worth now? |
| chaingpt_get_news | Get the latest crypto news | What's the latest news in the crypto world? |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)