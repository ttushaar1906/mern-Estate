export default {
  testEnvironment: 'node',
  verbose: true,
  testTimeout: 30000,
  setupFilesAfterEnv: ['./__tests__/test.setup.js'],
  resetModules: false,
  moduleFileExtensions: ['js', 'json', 'node'],
};
