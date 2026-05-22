const mockStorage = {
  set: jest.fn(),
  getString: jest.fn().mockReturnValue(null),
  remove: jest.fn(),
}

const createMMKV = jest.fn().mockReturnValue(mockStorage)

module.exports = { createMMKV }
