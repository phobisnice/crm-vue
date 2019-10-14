export default function dateFilter(value) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleString("ru-RU");
}
