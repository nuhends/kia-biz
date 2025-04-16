import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

// db.json 파일에서 약관 데이터 가져오기
const dbPath = path.join(process.cwd(), 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const termsData = dbData.terms;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: '허용되지 않는 메소드입니다.' });
  }

  const { termsClassID } = req.query;

  if (!termsClassID || typeof termsClassID !== 'string') {
    return res.status(400).json({ message: 'termsClassID 파라미터가 필요합니다.' });
  }

  const terms = termsData[termsClassID as keyof typeof termsData];

  if (!terms) {
    return res.status(404).json({ message: '해당 약관 정보를 찾을 수 없습니다.' });
  }

  return res.status(200).json(terms);
}
