type FormatNumberOptions = {
  minimumFractionDigits: number;
  maximumFractionDigits: number;
};

const toLocaleString = (
  value: number,
  options: FormatNumberOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  },
): string => {
  const { minimumFractionDigits, maximumFractionDigits } = options;

  return value.toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits,
  });
};

const getUnitAndDivisor = (value: number) => {
  const unitMapping: [string, number][] = [
    ["T", 10e11],
    ["B", 10e8],
    ["M", 10e5],
    ["k", 10e2],
  ];

  for (const [unit, divisor] of unitMapping) {
    if (Math.abs(value) >= divisor) {
      return { unit, divisor };
    }
  }

  return { unit: "", divisor: 1 };
};

const abbreviateNumber = (
  value: number,
  options: FormatNumberOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  },
) => {
  const { unit, divisor } = getUnitAndDivisor(value);
  const localeString = toLocaleString(value / divisor, options);
  return `${localeString} ${unit}`;
};

const hyphenate = (s: string) => {
  return s.replaceAll(" ", "-");
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export {
  toLocaleString,
  getUnitAndDivisor,
  abbreviateNumber,
  hyphenate,
  formatDate,
};
