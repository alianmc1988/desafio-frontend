import { URL_CRYPTO_API } from "../../config";
// Fetch the currency exchange value from API
export const fetchCurrency = {
  fetchGenericCurrencies: async (exchangeParams) => {
    try {
      const response = await fetch(URL_CRYPTO_API + exchangeParams);
      return response.json();
    } catch (error) {
      return error;
    }
  },
};
