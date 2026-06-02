export async function fetchData() {
  try {
    let response = await fetch(
      "https://kqbcttbbyyjzelywihuc.supabase.co/rest/v1/Peliculas",
      {
        method: "GET",
        headers: {
          apikey: "sb_publishable_p52oj2Vdi2Kq_invRT1M_Q_2zS17-R_",
        },
      },
    );
    let data = await response.json();
    return data;
    console.log(data);
  } catch (error) {
    console.log(`error ${error}`);
    return [];
  }
}

