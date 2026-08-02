/**
 * Jest config. Pure `src/utils` functions are transformed through the
 * `jest-expo` (babel) preset — same babel that Metro uses — so TS + path
 * aliases behave the same in tests as in the app.
 *
 * `moduleNameMapper` mirrors tsconfig `paths`: Jest has its own resolver and
 * does NOT read tsconfig, so every `@alias` a tested file imports must be
 * mapped here or the import fails.
 */
module.exports = {
  preset: 'jest-expo',
  moduleNameMapper: {
    '^@types$': '<rootDir>/src/types/index.ts',
    '^@utils$': '<rootDir>/src/utils/index.ts',
    '^@constants$': '<rootDir>/src/constants/index.ts',
    '^@theme$': '<rootDir>/src/theme/index.ts',
    '^@services$': '<rootDir>/src/services/index.ts',
    '^@hooks$': '<rootDir>/src/hooks/index.ts',
    '^@providers$': '<rootDir>/src/providers/index.ts',
    '^@validation$': '<rootDir>/src/validation/index.ts',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
  },
}
