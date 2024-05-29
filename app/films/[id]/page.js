
import { fetchFilm } from '@/app/data/db';
import Link from 'next/link';
import Image from 'next/image'; 
 
export default async function PagePage({ params }) {
  const film = await fetchFilm(params.id);
  return (
        <>
            <h1>{film.filmtitle} ({film.filmcertificate})</h1>
            <p>{film.filmdescription}</p>
            <p>Price: &pound;{film.filmprice}</p>
            <p>Stars: {film.stars}</p>
            <p>Release Date: {new Date(film.releasedate).toLocaleDateString()}</p>
            <Image src={`/images/${film.filmimage}`} alt={film.filmtitle} width={214} height={314} />
  </>
    )
  }