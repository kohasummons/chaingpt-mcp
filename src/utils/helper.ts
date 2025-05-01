interface Media {
  id: number;
  fileName: string;
  fileDescriptor: string;
  mimeType: string;
  fileSize: number;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}

interface Category {
  id: number;
  name: string;
  isBlockchain: boolean;
  isToken: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Token {
  id: number;
  name: string;
  isBlockchain: boolean;
  isToken: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Article {
  id: number;
  title: string;
  description: string;
  pubDate: string;
  isPublished: boolean;
  author: string;
  userId: number | null;
  isFeatured: number;
  categoryId: number | null;
  subCategoryId: number | null;
  isTopStory: number;
  viewsCount: number;
  imageUrl: string;
  mediaId: number;
  tokenId: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  category: Category | null;
  subCategory: Category | null;
  token: Token | null;
  newsTags: any[];
  media: Media;
}


export function formatArticlesToString(articles: Article[], detailed = true) {
  if (!Array.isArray(articles) || articles.length === 0) {
    return "No articles found.";
  }

  let result = "";
  
  articles.forEach((article, index) => {
    // Add a separator between articles except for the first one
    if (index > 0) {
      result += "\n\n" + "=".repeat(80) + "\n\n";
    }
    
    // Add title
    result += `${index + 1}. ${article.title}\n`;
    
    // Add publication date
    const pubDate = new Date(article.pubDate);
    result += `Published: ${pubDate.toLocaleString()}\n`;
    
    // Add category and tokens info
    const categoryName = article.category ? article.category.name : "Uncategorized";
    const tokenName = article.token ? article.token.name : "No specific token";
    result += `Category: ${categoryName} | Token: ${tokenName}\n`;
    
    // Add blockchain info (from subCategory)
    const blockchainName = article.subCategory ? article.subCategory.name : "No specific blockchain";
    result += `Blockchain: ${blockchainName}\n\n`;
    
    // Add description
    result += `${article.description}\n`;
    
    // Add additional details if detailed mode is enabled
    if (detailed) {
      result += `\nAuthor: ${article.author}\n`;
      result += `Image URL: ${article.imageUrl}\n`;
      
      if (article.isFeatured) {
        result += "Featured Article\n";
      }
      
      if (article.isTopStory) {
        result += "Top Story\n";
      }
      
      result += `Created: ${new Date(article.createdAt).toLocaleString()}\n`;
      result += `Last Updated: ${new Date(article.updatedAt).toLocaleString()}\n`;
    }
  });
  
  return result;
}

