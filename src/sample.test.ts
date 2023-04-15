import sut from '@/sample.js';

describe('Verify sample', () => {
  it('should return result', () => {
    const result = sut();

    expect(result).toEqual(3);
  });
});
