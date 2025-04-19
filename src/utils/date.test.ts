import { describe, expect, it } from 'vitest';

import { formatDate } from './date';

describe('formatDate', () => {
  it('should return "현재" when timestamp is 0', () => {
    expect(formatDate(0)).toBe('현재');
  });

  it('should format timestamp to YYYY.MM.DD format', () => {
    // 2024년 1월 1일
    const timestamp = new Date(2024, 0, 1).getTime();
    expect(formatDate(timestamp)).toBe('2024.01.01');

    // 2023년 12월 25일
    const christmasTimestamp = new Date(2023, 11, 25).getTime();
    expect(formatDate(christmasTimestamp)).toBe('2023.12.25');

    // 2022년 5월 15일
    const anotherTimestamp = new Date(2022, 4, 15).getTime();
    expect(formatDate(anotherTimestamp)).toBe('2022.05.15');
  });
});
