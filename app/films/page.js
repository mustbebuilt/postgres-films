
import { fetchFilms } from '@/app/lib/db';
import Link from 'next/link';
 
export default async function Page() {
  const films = await fetchFilms();
  return (
    <>
<h1>All Films</h1>
<div>
<ul>
{films.map((film,index) => (
  <div key={index}>
    <Link href={`/films/${film.film_id}`}>
  {film.film_title} ({film.film_certificate})
</Link>
<p>
                        <Link href={`films/edit/${film.film_id}`}>
                            Edit
                        </Link></p>
                        <p>
                        <Link href={`films/delete/${film.film_id}`}>
                            Delete
                        </Link>
                    </p>
</div>
))}
</ul>
</div>
</>
)
}