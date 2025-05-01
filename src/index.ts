#!/usr/bin/env node
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';

import {registerTools} from './tools/index.js';

/**
 * Initialize and configure the MCP server
 */
export const server = new McpServer({
  name: 'chaingpt-mcp',
  version: '0.1.0',
});

// Load the capabilities
registerTools();

/**
 * Entry point: Start the MCP server
 */
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error('ChainGPT MCP Server is running');

    // Handle process termination
    process.on('SIGINT', async () => {
      console.error('Shutting down ChainGPT MCP Server...');
      await server.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.error('Shutting down ChainGPT MCP Server...');
      await server.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Error starting ChainGPT MCP server:', error);
    process.exit(1);
  }
}

// Start the server
main().catch((error: Error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
