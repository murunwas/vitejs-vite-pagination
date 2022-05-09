import { writable, derived, get } from 'svelte/store';
import data from './data.json';

const store = writable([]);
const currentPage = writable(1);
export const pageSize = writable(5);

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
    };
  }
);

export const next = () => {
  let mm = get(currentPage);
  let len = get(store).length;
  let pSize = get(pageSize);
  let totalPages = Math.ceil(len / pSize);
  if (mm == totalPages) return;
  currentPage.set(++mm);
};

export const goTo = (page) => {
  currentPage.set(page);
};

export const back = () => {
  let mm = get(currentPage);
  if (mm <= 1) return;
  currentPage.set(--mm);
};
