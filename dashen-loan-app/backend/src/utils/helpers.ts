export const toNumber = (value: any, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);
