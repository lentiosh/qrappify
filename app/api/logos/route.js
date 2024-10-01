import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const logosDir = path.join(process.cwd(), 'public', 'logos');
    const files = await fs.readdir(logosDir);

    const logos = files.map((file, index) => ({
      id: index + 1,
      name: path.basename(file, path.extname(file)),
      url: `/logos/${file}`,
    }));

    return NextResponse.json(logos);
  } catch (error) {
    console.error('Error reading logos directory:', error);
    return NextResponse.json({ error: 'Failed to fetch logos' }, { status: 500 });
  }
}