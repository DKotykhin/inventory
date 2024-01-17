import { db } from '@/lib/db';

import { ApiError } from '@/handlers/apiError';

import { Product, RoleTypes } from '@prisma/client';
import { checkAuth } from '@/utils/_index';

class ProductService {
    async getProducts(): Promise<Product[]> {
        try {
            return await db.product.findMany();
        } catch (error) {
            throw ApiError.internalError("Can't get products");
        }
    }

    async getProduct(id: string): Promise<Product | null> {
        try {
            return await db.product.findUnique({ where: { id } });
        } catch (error) {
            throw ApiError.internalError("Can't get product");
        }
    }

    async createProduct(data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
        try {
            return await db.product.create({ data });
        } catch (error) {
            throw ApiError.internalError("Can't create product");
        }
    }

    async updateProduct(id: string, data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
        try {
            return await db.product.update({ where: { id }, data });
        } catch (error) {
            throw ApiError.internalError("Can't update product");
        }
    }

    async deleteProduct(id: string, token: string): Promise<Product> {
        const { role } = checkAuth(token);
        if (role !== RoleTypes.ADMIN || role !== RoleTypes.SUBADMIN) {
            throw ApiError.unauthorized("You don't have permission to delete order");
        }
        try {
            return await db.product.delete({ where: { id } });
        } catch (error) {
            throw ApiError.internalError("Can't delete product");
        }
    }
}

const productService = new ProductService();

export default productService;
