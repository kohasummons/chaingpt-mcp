import { server } from "../index.js";
import { config } from "../config/index.js";
import { aiNewsSchema } from "../types/schema.js";
import { AINews, Errors } from "@chaingpt/ainews";
import { formatArticlesToString } from "../utils/helper.js";

const aiNews = new AINews({
  apiKey: config.chaingpt.secretKey,
});


export const registerNewsTools = () => {
  server.tool(
    "chaingpt_get_ai_crypto_news",
    `
        Get the latest AI-related crypto and web3 articles.
        Web3-native AI assistant built specifically for the crypto world.
        it source, filter, deduplicate, and summarize up-to-date crypto news from many outlets in real time
        it continuously scans trusted crypto news sites (e.g. CoinDesk, CoinTelegraph, Decrypt) and even social platforms like Twitter for breaking updates.

        You can call this tool without any parameters to get the latest news. It returns 10 news articles by default. 

        Capabilities:
          - Source, filter, deduplicate, and summarize up-to-date crypto news from many outlets in real time
          - Continuously scans trusted crypto news sites (e.g. CoinDesk, CoinTelegraph, Decrypt) and even social platforms like Twitter for breaking updates.
          - Summarize news in a concise manner, providing the most important details and context.
          - Provides a link to the original article for more detailed information.

        ⚠️ COST WARNING: This tool makes an API call to ChainGPT which may incur costs. The key is charged 1 credit per 10 records returned

        This tool allows you to interact with ChainGPT's AI News Generator.

        Args:
            categoryId(number[], optional): The category ID of the news to fetch. Blockchain Gaming = [2], DAO = [3], DApps = [4], DeFi = [5], Lending = [6], Metaverse = [7], NFT = [8], Stablecoins = [9], Cryptocurrency = [64], Decentralized = [65], Smart Contracts = [66], Distributed Ledger = [67], Cryptography = [68], Digital Assets = [69], Tokenization = [70], Consensus Mechanisms = [71], ICO (Initial Coin Offering) = [72], Crypto Wallets = [73], Web3.0 = [74], Interoperability = [75], Mining = [76], Cross-Chain Transactions = [77], Exchange = [78].
            subCategoryId(number[], optional): The sub-category ID of the news to fetch. Bitcoin = [11], BNB Chain = [12], Celo = [13], Cosmos = [14], Ethereum = [15], Filecoin = [16], Flow = [17], Harmony = [41], Polygon = [20], XRP Ledger = [21], Solana = [22], TRON = [23], Cardano = [34], Monero = [19], Cronos = [36], Ontology = [44], WAX = [26], Optimism = [45], Other (Miscellaneous) = [46], PlatON = [47], Steem = [56], Rangers = [49], SX Network = [57], Ronin = [50], Telos = [58], Shiden = [51], Telos EVM = [59], SKALE = [52], Theta = [61], Stacks = [54], ThunderCore = [62], Stargaze = [55].
            tokenId(number[], optional): The token ID of the news to fetch. BTC = [79], MATIC = [91], ETH = [80], DOT = [92], USDT = [81], LTC = [93], BNB = [82], WBTC = [94], XRP = [83], BCH = [95], USDC = [84], LINK = [96], SOL = [85], SHIB = [97], ADA = [86], LEO = [98], DOGE = [87], TUSD = [99], TRX = [88], AVAX = [100], TON = [89], XLM = [101], DAI = [90], XMR = [102], UNI = [105], OKB = [103], ETC = [106], ATOM = [104], BUSD = [107], HBAR = [108].
            searchQuery(string, optional): The search query to fetch the news.
            limit(number, optional): The number of news to fetch. Default is 10. You can increase this to retrieve more articles in one call (e.g. limit: 20 for 20 articles). Note that higher limits will consume additional credits (see Rate Limits & Credits). If you only want a small number of the latest articles, you can set a smaller limit as well.
            offset(number, optional): The offset of the news to fetch. Default is 0. This is used for pagination. For example, to get the second page of results when using a limit of 10, you would set offset: 10 (skip the first 10 articles, return the next set). Similarly, offset: 20 would fetch the third page (items 21–30), and so on.
            fetchAfter(Datetime, optional): The date after which to fetch the news. Provide a JavaScript Date object or a date string (which will be interpreted in UTC by the API). For example, fetchAfter: new Date('2024-01-01') will fetch news items published from January 1, 2024 onward. This is useful for getting news within a certain time range (e.g., only recent news).
            sortBy(string, optional): The field by which to sort the news. Currently, the only supported sort key is 'createdAt', which corresponds to the article's publication time. By default, results are sorted by newest (most recent) first. If not provided, the SDK will sort by createdAt descending. (At this time, no other sort fields are supported.)
        Returns:
            The response from ChainGPT AI to the provided question or message.
        `,
    aiNewsSchema,
    async (params) => {
      try {
        const response = await aiNews.getNews(params);
        const formattedResponse = formatArticlesToString(response.data);
        console.error(response.data);
        return {
          content: [
            {
              type: "text",
              text: formattedResponse,
            },
          ],
        };
      } catch (error) {
        if (error instanceof Errors.AINewsError) {
          return {
            content: [
              {
                type: "text",
                text: error.message,
              },
            ],
            isError: true,
          };
        } else {
          return {
            content: [
              {
                type: "text",
                text: "get_ai_crypto_news_Unknown_Error",
              },
            ],
            isError: true,
          };
        }
      }
    }
  );
};