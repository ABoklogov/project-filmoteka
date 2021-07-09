import { getTrendItems } from "../js/base-api.js";
import { getMarcup } from "../js/start-site.js";

const paginList = document.querySelector("#pagination");
const listFilm = document.querySelector(".films-list");

let page = 1;
async function grtTotalPages() {
  const data = await getTrendItems(page);
  return data.total_pages;
}

async function renderPagination() {
  const pagesTotal = await grtTotalPages();

  const numbers = Array(pagesTotal)
    .fill(0)
    .map((el, i) => i + 1);

  const elements = numbers.map(
    (el) =>
      `<button class="pagination-btn ${
        el === page ? "active" : ""
      }">${el}</button>`
  );

  const backArrow = `<svg width="40" height="40" fill="none" id="back-arrow">
      <rect width="40" height="40" rx="5" fill="#F7F7F7" />
      <path
        d="M24.667 20h-9.334M20 24.667L15.333 20 20 15.334"
        stroke="#000"
        stroke-width="1.333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>`;
  const nextArrow = `<svg width="40" height="40" fill="none" id="next-arrow">
  <rect width="40" height="40" rx="5" transform="matrix(-1 0 0 1 40 0)" fill="#F7F7F7"/>
  <path d="M15.333 20h9.334M20 24.667L24.667 20 20 15.334" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  const step = 3;
  const startCondition = page - step > 1;
  const endCondition = page + step <= elements.length;
  const endConditionArrow = page + step < elements.length;
  const start = startCondition ? page - step : 0;
  const end = page + step - 1;
  const slicedElements = elements.slice(start, end);

  paginList.innerHTML =
    (page === 1 ? "" : backArrow) +
    (startCondition ? elements[0] + "&#8943" : "") +
    slicedElements.join("") +
    (endConditionArrow ? "&#8943" : "") +
    (endCondition ? elements[elements.length - 1] : "") +
    (page === elements.length ? "" : nextArrow);
  nextArrow;
}
renderPagination();

paginList.addEventListener("click", (ev) => {
  if (ev.target === ev.currentTarget || ev.target.textContent === `${page}`) {
    return;
  }

  const btns = [...ev.currentTarget.children];
  btns.forEach((btn) => btn.classList.remove("active"));
  ev.target.classList.add("active");

  if (ev.target.parentElement.id === "next-arrow") {
    incremRenderMarcup();
    return;
  }

  if (ev.target.parentElement.id === "back-arrow") {
    decremRenderMarcup();
    return;
  }

  page = Number(ev.target.textContent);
  nextRenderMarcup(page);

  renderPagination();
});

function nextRenderMarcup(page) {
  listFilm.innerHTML = "";
  // paginList.innerHTML = "Загружаю..."; или что-то еще сюда прикрутить
  getMarcup(page);
}

function incremRenderMarcup() {
  page += 1;
  nextRenderMarcup(page);
  renderPagination();
}

function decremRenderMarcup() {
  page -= 1;
  nextRenderMarcup(page);
  renderPagination();
}