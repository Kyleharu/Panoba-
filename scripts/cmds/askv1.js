const axios = require('axios');

const GPT_API_URL = 'https://sandipapi.onrender.com/gpt';
const PREFIXES = ['askv1'];
const horizontalLine = "━━━━━━━━━━━━━━━";

module.exports = {
  config: {
    name: "askv1",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {
    // Initialization logic if needed
  },
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = PREFIXES.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (!prompt) {
        const defaultMessage = getCenteredHeader("𝗮𝘀𝗸𝘃𝟭 𝗚𝗣𝗧 𝘃𝗲𝗿𝘀𝗶𝗼𝗻 𝟭.𝟬") + "\n" + horizontalLine + "\nHey! How can I assist you in your AI journey?\n" + horizontalLine;
        await message.reply(defaultMessage);
        return;
      }

      const answer = await getGPTResponse(prompt);

      // Adding header and horizontal lines to the answer
      const answerWithHeader = getCenteredHeader("𝗮𝘀𝗸𝘃𝟭 𝗚𝗣𝗧 𝘃𝗲𝗿𝘀𝗶𝗼𝗻 𝟭.𝟬") + "\n" + horizontalLine + "\n" + answer + "\n" + horizontalLine;

      await message.reply(answerWithHeader);
    } catch (error) {
      console.error("Error:", error.message);
      // Additional error handling if needed
    }
  }
};

function getCenteredHeader(header) {
  const totalWidth = 32; // Adjust the total width as needed
  const padding = Math.max(0, Math.floor((totalWidth - header.length) / 2));
  return " ".repeat(padding) + header;
}

async function getGPTResponse(prompt) {
  // Implement caching logic here

  const response = await axios.get(`${GPT_API_URL}?prompt=${encodeURIComponent(prompt)}`);
  return response.data.answer;
}
