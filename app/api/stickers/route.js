import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const stickersDir = path.join(process.cwd(), 'public', 'stickers');
    const files = await fs.readdir(stickersDir);

    const stickers = files.map((file, index) => ({
      id: index + 1,
      name: path.basename(file, path.extname(file)),
      url: `/stickers/${file}`,
    }));

    return NextResponse.json(stickers);
  } catch (error) {
    console.error('Error reading stickers directory:', error);
    return NextResponse.json({ error: 'Failed to fetch stickers' }, { status: 500 });
  }
}