import { SUPABASE_URL, SUPABASE_API_KEY } from "/config.js";

export async function getMovies() {
  try {
    let response = await fetch(SUPABASE_URL, {
      method: "GET",
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
      },
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(`error ${error}`);
    return [];
  }
}

export async function getMovie(id) {
  try {
    let response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
      },
    });
    let data = await response.json();
    return data[0];
  } catch (error) {
    console.error(`error ${error}`);
  }
}

export async function updateMovie(id, movieInfo) {
  try {
    let response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
      method: "PATCH",
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
    return data;
  } catch (error) {
    console.error("error al actualizar película " + error);
  }
}

export async function deleteMovie(id) {
  try {
    let response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
      },
    });
    if (!response.ok) throw new Error("Error al eliminar");
    console.log("Película eliminada:", id);
  } catch (error) {
    console.error("error al eliminar película", error);
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


