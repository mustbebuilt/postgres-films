import { fetchFilm, editFilm } from '@/app/lib/db';
 

export default async function Page({ params }) {

  const film = await fetchFilm(params.id);

    // Function to format the date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format the film_releaseDate
  const formattedDate = film.film_releasedate ? formatDate(film.film_releasedate) : '-';
  return (
    <>
      <h1>Edit Film</h1>
      <h1>{film.film_title} ({film.film_certificate})</h1>
      <form action={editFilm}>
        <input type="hidden" name="filmId" defaultValue={params.id} />
        <div>
          <label htmlFor="filmTitle">Title:</label>
          <input type="text" id="filmTitle" name="filmTitle" defaultValue={film.film_title} required />
        </div>

        <div>
          <label htmlFor="filmCertificate">Certificate:</label>
          <input type="text" id="filmCertificate" name="filmCertificate" defaultValue={film.film_certificate} required />
        </div>
        <div>
          <label htmlFor="filmDescription">Description:</label>
          <textarea id="filmDescription" name="filmDescription" defaultValue={film.film_description} required />
        </div>
        <div>
          <label htmlFor="filmImage">Image:</label>
          <input type="text" id="filmImage" name="filmImage" defaultValue={film.film_image} required />
        </div>
        <div>
          <label htmlFor="filmPrice">Price:</label>
          <input type="number" id="filmPrice" name="filmPrice" defaultValue={film.film_price} required />
        </div>
        <div>
          <label htmlFor="stars">Stars:</label>
          <input type="number" id="stars" name="stars" defaultValue={film.film_stars} required />
        </div>
        <div>
          Date:{formattedDate}
        </div>
        <div>
          
        </div>
        <div>
          <label htmlFor="releaseDate">Release Date:</label>
          {/* <p>{film.film_releasedate}</p> */}
          {/* <p></p> */}
          <input type="date" id="releaseDate" name="releaseDate" defaultValue={formattedDate} />
        </div>
        <button type="submit">Update Film</button>
      </form>

    </>
  )
}