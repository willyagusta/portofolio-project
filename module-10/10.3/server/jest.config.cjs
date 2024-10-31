module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.(js|mjs)$': 'babel-jest',
    },
    testMatch: [
      '**/__test__/dbConnection.test.js',
      '**/__test__/blog.test.js'
    ],
  };