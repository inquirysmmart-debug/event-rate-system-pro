export function generateCode(value) {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  // Decimal hata do (416.00 -> 416)
  const number = Math.round(Number(value));

  if (isNaN(number)) {
    return "";
  }

  // Digit Mapping
  const map = {
    "0": "A",
    "1": "B",
    "2": "C",
    "3": "D",
    "4": "E",
    "5": "F",
    "6": "G",
    "7": "H",
    "8": "I",
    "9": "J",
    "-": "-"
  };

  return number
    .toString()
    .split("")
    .map((digit) => map[digit] || digit)
    .join("");
}