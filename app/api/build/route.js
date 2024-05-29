import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Create the Films table
    await sql`
      CREATE TABLE IF NOT EXISTS Films (
        FilmID SERIAL PRIMARY KEY,
        FilmTitle VARCHAR(100) NOT NULL,
        FilmCertificate VARCHAR(5) NOT NULL,
        FilmDescription TEXT,
        FilmImage VARCHAR(100),
        FilmPrice DECIMAL(18, 2) NOT NULL,
        Stars INT NOT NULL,
        ReleaseDate TIMESTAMPTZ NOT NULL
      );
    `;

    // Insert the provided data into the Films table
    const filmsData = [
      {
        filmTitle: "Cinema Paradiso",
        filmCertificate: "15",
        filmDescription: "A famous film director returns home to a Sicilian village for the first time after almost 30 years. He reminisces about his childhood at the Cinema Paradiso where Alfredo, the projectionist, first brought about his love of films. He is also reminded of his lost teenage love, Elena, who he had to leave before he left for Rome.",
        filmImage: "cinemaParadiso.jpg",
        filmPrice: "0.99",
        stars: "5",
        releaseDate: "1988-02-23"
      },
      {
        filmTitle: "Hear My Song",
        filmCertificate: "15",
        filmDescription: "Nightclub owner Mickey O'Neill (Adrian Dunbar), a fast-talking charmer, has figured out a way to save his financial sinkhole of a business: book famous Irish tenor Josef Locke (William Hootkins) for a performance. There are several major problems, however -- Locke has been in exile for years and the man O'Neill has been in contact with is a con artist. O'Neill's reputation is destroyed, but, when the real Locke (Ned Beatty) shows up to perform, his luck may turn for the better.",
        filmImage: "hearMySong.jpg",
        filmPrice: "1.50",
        stars: "5",
        releaseDate: "1991-03-13"
      }
    ];

    const insertQueries = filmsData.map(film => {
      return sql`
        INSERT INTO Films (FilmTitle, FilmCertificate, FilmDescription, FilmImage, FilmPrice, Stars, ReleaseDate)
        VALUES (
          ${film.filmTitle},
          ${film.filmCertificate},
          ${film.filmDescription},
          ${film.filmImage},
          ${film.filmPrice},
          ${film.stars},
          ${film.releaseDate}
        );
      `;
    });

    // Execute all insert queries
    await Promise.all(insertQueries);

    return NextResponse.json({ message: 'Table created and data inserted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
