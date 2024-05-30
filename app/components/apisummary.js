import './summary.css';
const Summary = (data) => {  
    const film = data.film;
    console.log(film.film_title);
    return (
    <div className="summary">
      <h2>{film.film_title}</h2>
      <p>
        Certificate: {film.film_certificate}
      </p>
      <p>
        Release year: {new Date(film.film_releasedate).toLocaleDateString()}
      </p>
     
    </div>
  )
}
export default Summary
