const MMKV = jest.fn().mockImplementation(() => ({
  set: jest.fn(),
  getString: jest.fn().mockReturnValue(null),
  delete: jest.fn(),
}))
module.exports = { MMKV }
