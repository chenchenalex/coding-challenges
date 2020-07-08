/**
 * Format phone number strings to readable format
 * @param {String} phone eg: 2130010012
 * @return {String} eg: (213)001 0012
 * */
export function formatPhone(phone) {
  if (typeof phone !== "string") return "";

  return `(${phone.slice(0, 3)})${phone.slice(3, 6)} ${phone.slice(6)}`;
}
