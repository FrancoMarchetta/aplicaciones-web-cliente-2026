export function setupFilters(movies, renderFn) {
  const genreSelect = document.getElementById("genero");
  const ratingSelect = document.getElementById("clasificacion");
  const searchInput = document.querySelector(".filter-input");

  if (!genreSelect || !ratingSelect || !searchInput) return;

  function filterMovies() {
    const genre = genreSelect.value.toLowerCase();
    const rating = ratingSelect.value.toLowerCase();
    const query = searchInput.value.toLowerCase().trim();

    const filtered = movies.filter((movie) => {
      if (!movie.visible) return false;
      if (genre && movie.genero?.toLowerCase() !== genre) return false;
      if (rating && movie.clasificacion?.toLowerCase() !== rating) return false;
      if (query && !movie.titulo?.toLowerCase().includes(query)) return false;
      return true;
    });

    renderFn(filtered);
  }

  genreSelect.addEventListener("change", filterMovies);
  ratingSelect.addEventListener("change", filterMovies);
  searchInput.addEventListener("input", filterMovies);

  filterMovies();
}
