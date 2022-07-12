import {asyncContains, asyncFilter, getJson} from "./schema-utils";
import {LineItem, Order} from "../backend/client/order";
import {Category} from "../backend/client/category";

export function getCategoryById(id: number): Promise<Category> {
    return getJson(`category/${id}/`)
}

function getOrders(): Promise<Order[]> {
    return getJson(`order/`);
}

async function itemIsOfCategory(item: LineItem, categoryName: string) {
    const category = await getCategoryById(item.categoryId)

    return category.name.toLowerCase().includes(categoryName.toLowerCase());
}

async function orderContainsCategory(order: Order, categoryName: string) {
    return asyncContains(order.items, item => itemIsOfCategory(item, categoryName));
}

export function findOrdersByLineItemCategory(categoryName: string) {
    return getOrders().then(
        orders => asyncFilter(orders, order => orderContainsCategory(order, categoryName))
    )
}
