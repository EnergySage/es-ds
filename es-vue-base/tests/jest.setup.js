import * as matchers from 'jest-extended';
import { toHaveNoViolations } from 'jest-axe';

// Add all matchers from jest-extended
// https://github.com/jest-community/jest-extended
expect.extend(matchers);

// https://github.com/nickcolley/jest-axe
expect.extend(toHaveNoViolations);

window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
}));
