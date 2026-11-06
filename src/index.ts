function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
export function centeredDerivative(
  values: readonly number[],
  spacing: number,
  derivative: 1 | 2 = 1,
): number {
  if (!Array.isArray(values) || (values.length !== 3 && values.length !== 5))
    throw new RangeError('Three or five samples required');
  for (const v of values) finite(v);
  finite(spacing, Number.MIN_VALUE);
  if (derivative !== 1 && derivative !== 2) throw new RangeError('Derivative1 or2');
  const weights =
      derivative === 1
        ? values.length === 3
          ? [-1, 0, 1]
          : [1, -8, 0, 8, -1]
        : values.length === 3
          ? [1, -2, 1]
          : [-1, 16, -30, 16, -1],
    divisor = values.length === 3 ? (derivative === 1 ? 2 : 1) : 12;
  let sum = 0;
  for (let i = 0; i < values.length; i++) sum = finite(sum + weights[i]! * values[i]!);
  let result = finite(sum / divisor / spacing);
  if (derivative === 2) result = finite(result / spacing);
  return result;
}
