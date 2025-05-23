import fs from 'fs';
import path from 'path';

import {
  Faq,
  FaqCategoryIDSchema,
  FaqsResponse,
  TabTypeSchema,
} from '@/src/utils/fetch/faq/schema';
import { ITEMS_PER_PAGE } from '@/src/screens/Faq/constants';

import type { NextApiRequest, NextApiResponse } from 'next';

// db.json 파일에서 FAQ 데이터 가져오기
const dbPath = path.join(process.cwd(), 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const faqsData = dbData.faqs as FaqsResponse;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tab, categoryID, limit, offset, question } = req.query;

    // tab 파라미터 검증
    if (!tab || typeof tab !== 'string') {
      return res.status(400).json({ error: 'tab parameter is required' });
    }

    // tab 값 검증
    const validatedTab = TabTypeSchema.safeParse(tab);
    if (!validatedTab.success) {
      return res.status(400).json({ error: 'invalid tab value' });
    }

    let filteredData = faqsData[validatedTab.data] || [];

    // categoryID가 있는 경우 추가 필터링
    if (categoryID && typeof categoryID === 'string') {
      // categoryID 값 검증
      const validatedCategoryID = FaqCategoryIDSchema.safeParse(categoryID);
      if (!validatedCategoryID.success) {
        return res.status(400).json({ error: 'invalid categoryID value' });
      }
      filteredData = filteredData.filter((faq: Faq) => faq.categoryID === validatedCategoryID.data);
    }

    // question 검색어가 있는 경우 추가 필터링
    if (question && typeof question === 'string') {
      const searchTerm = question.toLowerCase();
      filteredData = filteredData.filter((faq: Faq) => {
        const { question: faqQuestion, answer, categoryName, subCategoryName } = faq;
        return (
          faqQuestion.toLowerCase().includes(searchTerm) ||
          (answer && answer.toLowerCase().includes(searchTerm)) ||
          (categoryName && categoryName.toLowerCase().includes(searchTerm)) ||
          (subCategoryName && subCategoryName.toLowerCase().includes(searchTerm))
        );
      });
    }

    // 페이지네이션 처리
    const parsedLimit = limit ? parseInt(limit as string, 10) : ITEMS_PER_PAGE;
    const parsedOffset = offset ? parseInt(offset as string, 10) : 0;

    // 전체 데이터 개수
    const totalRecord = filteredData.length;

    // 페이지네이션된 데이터
    const paginatedData = filteredData.slice(parsedOffset, parsedOffset + parsedLimit);

    // 이전/다음 오프셋 계산
    const prevOffset = Math.max(0, parsedOffset - parsedLimit);
    const nextOffset =
      parsedOffset + parsedLimit < totalRecord ? parsedOffset + parsedLimit : parsedOffset;

    return res.status(200).json({
      items: paginatedData,
      pageInfo: {
        limit: parsedLimit,
        offset: parsedOffset,
        nextOffset,
        prevOffset,
        totalRecord,
      },
    });
  } catch (error) {
    console.error('FAQ API 오류:', error);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}
