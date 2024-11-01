module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.(js|mjs)$': 'babel-jest',
    },
    testMatch: ['**/__tests__/*.test.js'],
  };