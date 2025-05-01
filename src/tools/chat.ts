import { server } from "../index.js";
import { config } from "../config/index.js";
import { chatSchema, chatHistorySchema } from "../types/schema.js";
import { GeneralChat } from "@chaingpt/generalchat";

const generalchat = new GeneralChat({
  apiKey: config.chaingpt.secretKey,
});

export const registerChatTools = () => {
  server.tool(
    "chaingpt_invoke_chat",
    `
        Invoke a chat with ChainGPT AI and get a response based on the provided question.
        Web3-native AI assistant built specifically for the crypto world. 
        It has deep blockchain expertise, enabling seamless integration of crypto-aware AI into your applications. 
        The model is trained on blockchain data (smart contracts, DeFi protocols, NFTs, DAOs) and real-time market information, 
        making it ideal for use cases like customer support, on-chain analytics, trading assistance, and community engagement

        Capabilities:
            - Aggregate any amount of web3 market statistics
            - Interact with Blockchains 
            - Live information tracking of 5,000+ cryptos.
            - AI Generated News

        ⚠️ COST WARNING: This tool makes an API call to ChainGPT which may incur costs.

        This tool allows you to interact with ChainGPT's conversational AI capabilities.

        Args:
            question (str): The question or message to send to ChainGPT.
            chatHistory (str, optional): Whether to include chat history in the request.
                Defaults to "off" if not provided. Can be set to "on" to maintain conversation context.
            sdkUniqueId (str, optional): The unique identifier for the chat.
                Defaults to a random UUID if not provided
        Returns:
            The response from ChainGPT AI to the provided question or message.
        `,
    chatSchema,
    async (params) => {
      try {
        const response = await generalchat.createChatBlob({
          question: params.question,
          chatHistory: params.chatHistory,
        });
        return {
          content: [
            {
              type: "text",
              text: response.data.bot,
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "invoke_chat_Unknown_Error";
        return {
          content: [
            {
              type: "text",
              text: errorMessage,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "chaingpt_get_chat_history",
    `Get the chat history for a given chat blob id until the limit is reached
        retrieve saved chat history. By default, this will retrieve history entries associated with your API key.
        If you provide a specific sdkUniqueId, it will retrieve history entries associated with that chat blob id.

        Args:
            sdkUniqueId (str): The unique identifier for the chat.
            limit (int, optional): The maximum number of chat history items to return. Default is 10.
            offset (int, optional): The offset to start the chat history from. Default is 0.
            sortBy (str, optional): The field to sort the chat history by. Default is 'createdAt'.
            sortOrder (str, optional): The order to sort the chat history by. Default is 'ASC'.
        Returns:
            The chat history for the given chat blob id until the limit is reached.
        `,
    chatHistorySchema,
    async (params) => {
      try {
        const response = await generalchat.getChatHistory({
          limit: params.limit,
          offset: params.offset,
          sortBy: params.sortBy,
          sortOrder: params.sortOrder,
          sdkUniqueId: params.sdkUniqueId,
        });

        return {
          content: [
            {
              type: "text",
              text: response.data.chatHistory,
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "get_chat_history_Unknown_Error";
        return {
          content: [
            {
              type: "text",
              text: errorMessage,
            },
          ],
          isError: true,
        };
      }
    }
  );
};
