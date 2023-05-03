export function errorParser(e) {
  console.error(e.response.data.message);
  process.exit(0);
}