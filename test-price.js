function parseBrlPrice(value) {
  if (!value) return null;

  const cleaned = value.replace(/[^\d,.]/g, "");
  if (!cleaned) return null;

  const lastCommaIndex = cleaned.lastIndexOf(",");
  const lastDotIndex = cleaned.lastIndexOf(".");

  let decimalSeparator = "";
  if (lastCommaIndex > -1 && lastDotIndex > -1) {
    decimalSeparator = lastCommaIndex > lastDotIndex ? "," : ".";
  } else if (lastCommaIndex > -1) {
    decimalSeparator = ",";
  } else if (lastDotIndex > -1) {
    const parts = cleaned.split(".");
    const lastPart = parts[parts.length - 1];
    if (lastPart.length === 2) {
      decimalSeparator = ".";
    } else {
      decimalSeparator = "";
    }
  }

  let normalized = "";
  const actualDecimalIndex = Math.max(lastCommaIndex, lastDotIndex);
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === decimalSeparator && i === actualDecimalIndex) {
      normalized += ".";
    } else if (char !== "." && char !== ",") {
      normalized += char;
    }
  }

  const price = Number.parseFloat(normalized);
  return Number.isFinite(price) ? price : null;
}

const cases = [
  "R$ 2700",
  "R$ 2.700",
  "2700.00",
  "R$ 2700,00",
  "2.700,50",
  "2,700.50",
  "2.700.000",
  "2.700.000,00"
];

cases.forEach(c => console.log(`${c} -> ${parseBrlPrice(c)}`));
