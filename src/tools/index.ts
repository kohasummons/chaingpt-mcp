import {registerChatTools} from "./chat.js";
import {registerNewsTools} from "./news.js";

export const registerTools = () => {
    registerChatTools();
    registerNewsTools();
}