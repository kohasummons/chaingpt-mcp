import { z } from "zod";

export const chatSchema = {
    question: z.string().min(1, 'Question is required'),
    chatHistory: z.string(),
}

export const chatHistorySchema = {
    sdkUniqueId: z.string().describe("The unique id of the chat blob to get the history for. If not provided, it will return the chat history for all chat blobs until the limit is reached."),
    limit: z.number().describe("The maximum number of chat history items to return. Default is 10."),
    offset: z.number().describe("The offset to start the chat history from. Default is 0."),
    sortBy: z.string().describe("The field to sort the chat history by. Default is 'createdAt'."),
    sortOrder: z.string().describe("The order to sort the chat history by. Default is 'ASC'."),
}

export const aiNewsSchema = {
    categoryId: z.array(z.number()).optional().describe("The category ID of the news to fetch. "),
    subCategoryId: z.array(z.number()).optional().describe("The sub-category ID of the news to fetch."),
    tokenId: z.array(z.number()).optional().describe("The token ID of the news to fetch."),
    searchQuery: z.string().optional().describe("The search query to fetch the news."),
    sortBy: z.string().optional().describe("The field to sort the news by. Default and currently only supported field is 'createdAt'."),
    limit: z.number().optional().describe("The number of news to fetch. Default is 10. You can increase this to retrieve more articles in one call (e.g. limit: 20 for 20 articles). Note that higher limits will consume additional credits. MIN: 10"),
    offset: z.number().optional().describe("The offset of the news to fetch. Default is 0. This is used for pagination. For example, to get the second page of results when using a limit of 10, you would set offset: 10 (skip the first 10 articles, return the next set). Similarly, offset: 20 would fetch the third page (items 21–30), and so on."),
    fetchAfter: z.date().optional().describe("The date after which to fetch the news. Provide a JavaScript Date object or a date string (which will be interpreted in UTC by the API). For example, fetchAfter: new Date('2024-01-01') will fetch news items published from January 1, 2024 onward. This is useful for getting news within a certain time range (e.g., only recent news)."),
  }
  

  // Schema for price lookup
  export const priceSchema = {
    tokenIds: z.array(z.string()).describe("List of token IDs (e.g. ['bitcoin', 'ethereum'])"),
    currency: z.string().default("usd").describe("Fiat currency to get prices in (default: 'usd')"),
  };
  
  export const marketTrendSchema = {
    currency: z.string().default("usd").describe("Currency to fetch market data in (default: 'usd')"),
  };
