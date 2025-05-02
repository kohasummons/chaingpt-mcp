import axios from "axios";
import { marketTrendSchema, priceSchema } from "../types/schema.js";
import { server } from "../index.js";



const COINGECKO_API = "https://api.coingecko.com/api/v3";
export const registerAnalyticsTools = () => {
    
    // Tool: Get current prices
    server.tool(
        "chaingpt_get_token_prices",
        `
    Get current crypto token prices using CoinGecko's free API.
    
    Args:
      tokenIds (string[]): List of token IDs (e.g. ['bitcoin', 'ethereum'])
      currency (string, optional): The fiat currency to convert to (default is 'usd')
    
    Returns:
      Current price data for each token.
  `,
        priceSchema,
        async ({ tokenIds, currency }) => {
            try {
                const ids = tokenIds.join(",");
                const res = await axios.get(`${COINGECKO_API}/simple/price`, {
                    params: { ids, vs_currencies: currency },
                });

                const data = res.data;
                const output = Object.entries(data)
                    .map(([token, prices]: any) => `${token.toUpperCase()}: ${prices[currency]} ${currency.toUpperCase()}`)
                    .join("\n");

                return {
                    content: [
                        {
                            type: "text",
                            text: `Current Prices:\n${output}`,
                        },
                    ],
                };
            } catch (err) {
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to fetch token prices. Please try again.",
                        },
                    ],
                    isError: true,
                };
            }
        }
    );

    // Tool: Get global market trends
    server.tool(
        "chaingpt_get_market_trends",
        `
    Get global crypto market statistics (market cap, volume, BTC dominance) using CoinGecko's API.
    
    Args:
      currency (string, optional): Fiat currency to convert market data to (default: 'usd')

    Returns:
      Global market trend summary.
  `,
        marketTrendSchema,
        async ({ currency }) => {
            try {
                const res = await axios.get(`${COINGECKO_API}/global`, {
                    params: { vs_currency: currency },
                });

                const data = res.data.data;

                const text = `
Global Crypto Market Summary:
- Total Market Cap: ${data.total_market_cap[currency].toLocaleString()} ${currency.toUpperCase()}
- 24h Volume: ${data.total_volume[currency].toLocaleString()} ${currency.toUpperCase()}
- BTC Dominance: ${data.market_cap_percentage.btc.toFixed(2)}%
- Active Cryptos: ${data.active_cryptocurrencies}
- Markets: ${data.markets}
      `.trim();

                return {
                    content: [{ type: "text", text }],
                };
            } catch (err) {
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to fetch market trend data.",
                        },
                    ],
                    isError: true,
                };
            }
        }
    );

    // Tool: Get 24-hour performance of top 10 cryptocurrencies
    server.tool(
        "chaingpt_get_top10_performance",
        `
      Get 24-hour performance of the top 10 cryptocurrencies by market cap.
  
      Args:
        currency (string, optional): Fiat currency to use (default: 'usd')
  
      Returns:
        24-hour price change for top 10 cryptos.
    `,
        marketTrendSchema,
        async ({ currency }) => {
            try {
                const res = await axios.get(`${COINGECKO_API}/coins/markets`, {
                    params: {
                        vs_currency: currency || "usd",
                        order: "market_cap_desc",
                        per_page: 10,
                        page: 1,
                        price_change_percentage: "24h",
                    },
                });

                const output = res.data
                    .map((coin: any, i: number) =>
                        `${i + 1}. ${coin.name} (${coin.symbol.toUpperCase()}): ${coin.price_change_percentage_24h?.toFixed(2)}%`
                    )
                    .join("\n");

                return {
                    content: [
                        {
                            type: "text",
                            text: `Top 10 Cryptos - 24h Performance:\n${output}`,
                        },
                    ],
                };
            } catch (err) {
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to fetch top 10 performance data.",
                        },
                    ],
                    isError: true,
                };
            }
        }
    );

};