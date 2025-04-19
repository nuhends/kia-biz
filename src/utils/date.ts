/**
 * 타임스탬프를 YYYY.MM.DD 형식의 문자열로 변환합니다.
 * @param timestamp - 변환할 타임스탬프 (밀리초)
 * @returns 포맷팅된 날짜 문자열. timestamp가 0인 경우 '현재'를 반환
 */
export const formatDate = (timestamp: number): string => {
  if (timestamp === 0) return '현재';

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};
