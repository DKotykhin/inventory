import { db } from '@/lib/db';

import { ApiError } from '@/handlers/apiError';

import { Product, RoleTypes } from '@prisma/client';
import { checkAuth } from '@/utils/_index';

class ProductService {
    getProducts(): Promise<Product[]> {
        try {
            return db.product.findMany();
        } catch (error) {
            throw ApiError.internalError("Can't get products");
        }
    }

    getProduct(id: string): Promise<Product | null> {
        try {
            return db.product.findUnique({ where: { id } });
        } catch (error) {
            throw ApiError.internalError("Can't get product");
        }
    }

    createProduct(data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
        try {
            return db.product.create({ data });
        } catch (error) {
            throw ApiError.internalError("Can't create product");
        }
    }

    updateProduct(id: string, data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
        try {
            return db.product.update({ where: { id }, data });
        } catch (error) {
            throw ApiError.internalError("Can't update product");
        }
    }

    deleteProduct(id: string, token: string): Promise<Product> {
        const { role } = checkAuth(token);
        if (role !== RoleTypes.ADMIN || role !== RoleTypes.SUBADMIN) {
            throw ApiError.unauthorized("You don't have permission to delete order");
        }
        try {
            return db.product.delete({ where: { id } });
        } catch (error) {
            throw ApiError.internalError("Can't delete product");
        }
    }
}

const productService = new ProductService();

export default productService;
