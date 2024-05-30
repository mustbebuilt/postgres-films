'use client';
import { useState, useEffect } from 'react';
import Summary from '@/app/components/apisummary';

function App() {
  const API_URL = 'http://localhost:3000/api';
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('API not found');
        const listFilms = await response.json();
        setFilms(listFilms);
      } catch (err) {
        console.log(err.stack);
      }
    };
    fetchFilms();
  }, []);

  const viewFilm = (film) => {
    setSelectedFilm(film);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h1>Films</h1>
        {films.map((film) => (
          <div key={film.film_id}>
            <p onClick={() => viewFilm(film)}>
              {film.film_title} ({film.film_certificate})
            </p>
          </div>
        ))}
      </div>
      {selectedFilm && (
        <div>
          <Summary film={selectedFilm} />
        </div>
      )}
    </div>
  );
}

export default App;
