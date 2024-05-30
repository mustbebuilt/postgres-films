import { fetchFilms } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
    const films = await fetchFilms();
    return NextResponse.json(films)
}

