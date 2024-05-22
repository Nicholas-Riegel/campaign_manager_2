module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    coverageDirectory: './coverage',
    collectCoverage: true,
    collectCoverageFrom: ['**/models/**/*.js', '**/routes/**/*.js'],
    testTimeout: 45000, // Increase global timeout to 60 seconds
    setupFiles: ['dotenv/config'],
};
