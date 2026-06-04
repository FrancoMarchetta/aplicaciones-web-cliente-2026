import { SUPABASE_URL, SUPABASE_API_KEY } from "/config.js";

export async function getMovies() {
  try {
    let response = await fetch(SUPABASE_URL, {
      method: "GET",
      headers: {
        apikey: SUPABASE_API_KEY,
      },
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(`error ${error}`);
    return [];
  }
}

export async function postMovie(movieInfo) {
  try {
    let response = await fetch(SUPABASE_URL, {
      method: "POST",
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(movieInfo),
    });
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("error al subir usuario " + error);
  }
}

// let exampleObject = {
//   titulo: "El Padrino",
//   genero: "Crimen, Drama",
//   duracion: 120,
//   fecha_estreno: "1972-03-24",
//   director: "Francis Ford Coppola",
//   reparto: "Marlon Brando, Al Pacino, James Caan",
//   sinopsis:
//     "La historia de la familia Corleone, una de las más poderosas familias mafiosas de Nueva York, y su lucha por mantener su poder y proteger a sus seres queridos.",
//   clasificacion: "R",
//   visible: true,
// };

// postMovie(exampleObject);
