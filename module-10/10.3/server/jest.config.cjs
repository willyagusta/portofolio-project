module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.(js|mjs)$': 'babel-jest',
    },
    testMatch: [
      '**/__test__/auth.test.js'
    ],
  };