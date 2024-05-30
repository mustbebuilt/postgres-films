
import { fetchFilm } from '@/app/lib/db';
import Image from 'next/image'; 
import Summary from '@/app/components/summary';
 
export default async function PagePage({ params }) {
  const film = await fetchFilm(params.id);
  return (
        <>
            <h1>{film.film_title} ({film.film_certificate})</h1>
            <p>{film.film_description}</p>
            <p>Price: &pound;{film.film_price}</p>
            <p>Stars: {film.film_stars}</p>
            <p>Release Date: {new Date(film.film_releasedate).toLocaleDateString()}</p>
            <Image src={`/images/${film.film_image}`} alt={film.film_title} width={214} height={314} />
            <Summary film={film} />
  </>
    )
  }