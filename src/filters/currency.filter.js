export default function currencyFilter(value, currency = "RUB") {
  let currencySymbol;

  switch (currency) {
    case "RUB":
      currencySymbol = " &#8381";
      break;
    case "EUR":
      currencySymbol = " &#8364;";
      break;
    case "USD":
      currencySymbol = " &#36;";
      break;
  }

  return value + currencySymbol;
}
