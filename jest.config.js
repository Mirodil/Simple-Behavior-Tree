module.exports = {
    clearMocks: true,
    collectCoverageFrom: ['src/**/*.ts'],
    coverageReporters: ['cobertura', 'html', 'text-summary', 'text'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    preset: 'ts-jest',
    reporters: ['default'],
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/',
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[t]sx?$',
};
