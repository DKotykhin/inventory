import { db } from '@/lib/db';

import { ApiError } from '@/handlers/apiError';

import { Order, RoleTypes } from '@prisma/client';
import { checkAuth } from '@/utils/_index';

class OrderService {
    async getOrders(): Promise<Order[]> {
        try {
            return await db.order.findMany({
                include: {
                    items: {
                        include: {
                            price: true,
                        }
                    },
                },
            });
        } catch (error) {
            throw ApiError.internalError("Can't get orders");
        }
    }

    async getOrder(id: string): Promise<Order | null> {
        try {
            return await db.order.findUnique({ where: { id } });
        } catch (error) {
            throw ApiError.internalError("Can't get order");
        }
    }

    async createOrder(data: any): Promise<Order> {
        try {
            return await db.order.create({ data });
        } catch (error) {
            throw ApiError.internalError("Can't create order");
        }
    }

    async updateOrder(id: string, data: any): Promise<Order> {
        try {
            return await db.order.update({ where: { id }, data });
        } catch (error) {
            throw ApiError.internalError("Can't update order");
        }
    }

    async deleteOrder(id: string, token: string): Promise<Order> {

        const { role } = checkAuth(token);
        // if (role !== RoleTypes.ADMIN || role !== RoleTypes.SUBADMIN) {
        //     throw ApiError.unauthorized("You don't have permission to delete order");
        // }
        try {
            return await db.order.delete({ where: { id } });    
        } catch (error) {
            console.log(error);
            throw ApiError.internalError("Can't delete order");
        }
    }
}

const orderService = new OrderService();

export default orderService;
