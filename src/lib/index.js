import { writable, derived, get } from 'svelte/store';
import data from './data.json';

const store = writable([]);
const currentPage = writable(1);
export const pageSize = writable(10);

store.set(data);

export const paginate = derived(
  [store, currentPage, pageSize],
  ([$store, $currentPage, $pageSize]) => {
    let totalPages = Math.ceil($store.length / $pageSize);
    let start = $pageSize * ($currentPage - 1);
    let end = start + $pageSize;

    let paginatedItems = $store.slice(start, end);

    return {
      currentPage: $currentPage,
      paginatedItems,
      totalPages,
      total: $store.length,
      disableNext: $currentPage == totalPages,
      disableBack: $currentPage == 1,
      pages: Array.from({ length: totalPages }, (v, i) => i + 1),
    };
  }
);

export const next = () => {
  let currPage = get(currentPage);
  let len = get(store).length;
  let pSize = get(pageSize);
  let totalPages = Math.ceil(len / pSize);
  if (currPage == totalPages) return;
  currentPage.set(++currPage);
};

export const goTo = (page) => {
  currentPage.set(page);
};

export const back = () => {
  let currPage = get(currentPage);
  if (currPage <= 1) return;
  currentPage.set(--currPage);
};
