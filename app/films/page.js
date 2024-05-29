
import { fetchFilms } from '@/app/data/db';
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
    <Link href={`/films/${film.filmid}`}>
  {film.filmtitle} ({film.filmcertificate})
</Link>
<p>
                        <Link href={`films/edit/${film.filmid}`}>
                            Edit
                        </Link></p>
                        <p>
                        <Link href={`films/delete/${film.filmid}`}>
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