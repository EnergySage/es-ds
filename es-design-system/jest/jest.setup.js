import * as matchers from 'jest-extended';
import { toHaveNoViolations } from 'jest-axe';

// Add all matchers from jest-extended
// https://github.com/jest-community/jest-extended
expect.extend(matchers);

// https://github.com/nickcolley/jest-axe
expect.extend(toHaveNoViolations);
