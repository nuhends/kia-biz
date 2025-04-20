import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { FaqCategoriesResponse, TabTypeSchema } from '@/src/utils/fetch/faq/schema';

// db.json 파일에서 FAQ 카테고리 데이터 가져오기
const dbPath = path.join(process.cwd(), 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const faqCategoriesData = dbData.faqCategories as FaqCategoriesResponse;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tab } = req.query;

    // tab 파라미터 검증
    if (!tab || typeof tab !== 'string') {
      return res.status(400).json({ error: 'tab parameter is required' });
    }

    // tab 값 검증
    const validatedTab = TabTypeSchema.safeParse(tab);
    if (!validatedTab.success) {
      return res.status(400).json({ error: 'invalid tab value' });
    }

    const categories = faqCategoriesData[validatedTab.data] || [];

    return res.status(200).json({ [validatedTab.data]: categories });
  } catch (error) {
    console.error('FAQ 카테고리 API 오류:', error);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}
