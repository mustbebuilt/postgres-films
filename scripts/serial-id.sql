SELECT setval('films_film_id_seq', COALESCE((SELECT MAX(film_id) FROM public.films), 1) + 1, false);