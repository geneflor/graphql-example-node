import {getJson} from "./schema-utils";
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
    for (const item of order.items) {
        if (await itemIsOfCategory(item, categoryName)) {
            return true;
        }
    }

    return false;
}

export function findOrdersByLineItemCategory(categoryName: string) {
    return getOrders().then(
        async orders => {
            const result: Order[] = [];

            for (const order of orders) {
                if (await orderContainsCategory(order, categoryName)) {
                    result.push(order);
                }
            }

            return result;
        }
    )
}
