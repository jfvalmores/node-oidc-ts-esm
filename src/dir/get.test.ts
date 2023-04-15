import sut from './get.js';

describe('Verify get', () => {
  it('should return result', () => {
    const result = sut();

    expect(result).toEqual(4);
  });
});
