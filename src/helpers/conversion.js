import { fetchCurrency } from "../helpers/fetchBtcApi";

// Make the conversion from BTC -> BRL,USD or EUR
// It first convert BTC to BRL mandatory, then it will exchange the BRL to the desired currency
export async function convertion(convertionRateBTC_BRL, amount, currencyType) {
  try {
    const toBRL = convertionRateBTC_BRL * amount;
    if (currencyType === "BRL") return toBRL;
    if (currencyType === "USD") {
      const data = await fetchCurrency.fetchGenericCurrencies("USD-BRL");
      const result = toBRL / data.USDBRL.bid;
      return result;
    }
    if (currencyType === "EUR") {
      const data = await fetchCurrency.fetchGenericCurrencies("EUR-BRL");
      const result = toBRL / data.EURBRL.bid;
      return result;
    }
  } catch (error) {
    return error;
  }
}
