export default function dateFilter(value, options) {
  if (!value) {
    return "";
  }

  if (options && options.includes("date")) {
    return new Date(value).toLocaleDateString("ru-RU");
  }

  return new Date(value).toLocaleString("ru-RU");
}
