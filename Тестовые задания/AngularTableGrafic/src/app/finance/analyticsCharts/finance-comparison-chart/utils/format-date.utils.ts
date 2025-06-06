export function formatDate(date: string | number | Date): string {
  let d = new Date(date);
  let day = String(d.getDate()).padStart(2, "0");
  let month = String(d.getMonth() + 1).padStart(2, "0");
  let year = d.getFullYear();
  return `${day}.${month}.${year}`;
} 