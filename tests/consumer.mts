import { centeredDerivative } from '@lp-labs/finite-difference';
if (centeredDerivative([1, 0, 1], 1, 2) !== 2) throw new Error('Derivative');
// @ts-expect-error invalid argument must be rejected by declarations
centeredDerivative([1, 2, 3], 1, 3);
