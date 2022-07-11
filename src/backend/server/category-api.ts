import {categories} from "./category-db";

export const getCategories =
    () => categories;

export const getCategoryById =
    (id: number) => categories.find(d => d.id === id);
