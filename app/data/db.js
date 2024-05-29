import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
 
export async function fetchFilms() {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
      // Artificially delay a response for demo purposes.
      // Don't do this in production :)
  
      // console.log('Fetching revenue data...');
      // await new Promise((resolve) => setTimeout(resolve, 3000));
  
      const data = await sql `SELECT * FROM films`;
  
      // console.log('Data fetch completed after 3 seconds.');
  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
  }

export async function fetchFilm(film_id) {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Fetch the film data by film_id
    const data = await sql`SELECT * FROM Films WHERE FilmID = ${film_id}`;
    
    if (data.rows.length === 0) {
      throw new Error('Film not found');
    }
    
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch film data.');
  }
}


