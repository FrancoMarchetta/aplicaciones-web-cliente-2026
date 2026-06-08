import { deleteMovie } from "/js/db/supabase-client.js";

const $modal = document.getElementById("deleteModal");
const $modalTitle = document.getElementById("modalMovieTitle");
const $modalConfirm = document.getElementById("modalConfirmBtn");
const $modalCancel = document.getElementById("modalCancelBtn");

let movieIdToDelete = null;

function openDeleteModal(id, title) {
  movieIdToDelete = id;
  $modalTitle.textContent = title;
  $modal.showModal();
}

function closeDeleteModal() {
  movieIdToDelete = null;
  $modal.close();
}

document
  .querySelector(".table-container tbody")
  .addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".btn-action.delete");
    if (!deleteBtn) return;

    const row = deleteBtn.closest("tr");
    const title = row.children[1]?.textContent ?? "";
    const id = row.dataset.id;

    openDeleteModal(id, title);
  });

$modalConfirm.addEventListener("click", async () => {
  if (movieIdToDelete !== null) {
    await deleteMovie(movieIdToDelete);
    const row = document.querySelector(`tr[data-id="${movieIdToDelete}"]`);
    if (row) row.remove();
  }
  closeDeleteModal();
});

$modalCancel.addEventListener("click", closeDeleteModal);

// dejo comentado por las dudas pero esto mismo lo puedo hacer agregando colsedby="any" en el <dialog/>
// $modal.addEventListener("click", (e) => {
//   if (e.target === $modal) closeDeleteModal();
// });
