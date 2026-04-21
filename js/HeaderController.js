let $headerHome = document.getElementById("header-inicio");
let $headerMovies = document.getElementById("header-cartelera");
let $headerAdmin = document.getElementById("header-administrar");

$headerHome.addEventListener("click", () => {
    window.location.href = "index.html";
});

$headerMovies.addEventListener("click", () => {
    window.location.href = "movies.html";
});

$headerAdmin.addEventListener("click", () => {
    window.location.href = "admin.html";
});


switch (window.location.pathname) {
    case "/":
        $headerHome.style.color = "#e50914";
        break;
    case "/index.html":
        $headerHome.style.color = "#e50914";
        break;
    case "/movies.html":
        $headerMovies.style.color = "#e50914";

        break;
    case "/admin.html":
        $headerAdmin.style.color = "#e50914";
        break;
}