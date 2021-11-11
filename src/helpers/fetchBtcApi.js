import { URL_CRYPTO_API } from "../../config";

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
