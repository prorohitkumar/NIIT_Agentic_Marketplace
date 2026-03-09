import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      'lib',
      'templates',
      'test.json'
    );

    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename=test.json',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Template not found' },
      { status: 404 }
    );
  }
}