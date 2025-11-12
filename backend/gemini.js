import axios from 'axios';

export const getGeminiData = async () => {
  const response = await axios.get('https://api.gemini.com/v1/pubticker/btcusd');
  return response.data;
};
