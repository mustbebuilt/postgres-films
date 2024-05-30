"use server";
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
 
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
    const data = await sql`SELECT * FROM films WHERE film_id = ${film_id}`;
    
    if (data.rows.length === 0) {
      throw new Error('Film not found');
    }
    
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch film data.');
  }
}

export async function insertFilm(formData) {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
     const film_title = await formData.get("filmTitle");
    const film_certificate = await formData.get("filmCertificate");
    const film_description = await formData.get("filmDescription");
    const film_image = await formData.get("filmImage");
    const film_price = await formData.get("filmPrice");
    const film_stars = await formData.get("stars");
    const film_releaseDate = await formData.get("releaseDate");
  console.log('Inserting film...');
  console.log(film_title, film_certificate, film_description, film_image, film_price, film_stars, film_releaseDate);
  try{

    await sql`
      INSERT INTO films
      (film_title, film_certificate, film_description, film_image, film_price, film_stars, film_releasedate)
      VALUES
      ( 
        ${film_title}::varchar, 
        ${film_certificate}::varchar, 
        ${film_description}::text, 
        ${film_image}::varchar, 
        ${film_price}::numeric, 
        ${film_stars}::int, 
        ${film_releaseDate}::timestamptz
    )`;
    console.log('Insertion complete.');
    
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to insert film.');
  }finally{
    revalidatePath('/films/') // Update cached posts
    redirect('/films');
  }
}

export async function editFilm(formData) {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  const film_id = await formData.get("filmId");
  const film_title = await formData.get("filmTitle");
  const film_certificate = await formData.get("filmCertificate");
  const film_description = await formData.get("filmDescription");
  const film_image = await formData.get("filmImage");
  const film_price = await formData.get("filmPrice");
  const film_stars = await formData.get("stars");
  const film_releaseDate = await formData.get("releaseDate");
  console.log('Editing film...');
  console.log(film_id, film_title, film_certificate, film_description, film_image, film_price, film_stars, film_releaseDate);
  try{
    await sql`
      UPDATE films
      SET
      film_title = ${film_title}::varchar, 
      film_certificate = ${film_certificate}::varchar, 
      film_description = ${film_description}::text, 
      film_image = ${film_image}::varchar, 
      film_price = ${film_price}::numeric, 
      film_stars = ${film_stars}::int, 
      film_releasedate = ${film_releaseDate}::timestamptz
      WHERE film_id = ${film_id}::int
    `;
    console.log('Editing complete.');
  } catch (error) { 
    console.error('Database Error:', error);
    throw new Error('Failed to edit film.');
  } finally{
    revalidatePath('/films/') // Update cached posts
    redirect('/films');
  }
}

export async function deleteFilm(formData) {
  const film_id = formData.get("film_id");
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  console.log('Deleting film...');
  try{
    await sql`
      DELETE FROM films
      WHERE film_id = ${film_id}::int
    `;
    console.log('Deletion complete.');
    
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete film.');
  }finally{
    revalidatePath('/films/') // Update cached posts
    redirect('/films');
  }
}

