import { db } from '@/lib/db';

import { ApiError } from '@/handlers/apiError';

import { Guarantee, Price, Product, RoleTypes } from '@prisma/client';
import { checkAuth } from '@/utils/_index';

class ProductService {
    async getProducts({
        limit,
        page,
        type,
    }: {
        limit: string | null;
        page: string | null;
        type: string | null;
    }): Promise<{
        products: Product[];
        totalCount: number;
        totalPages: number;
        productTypeList: { type: string | null }[];
    }> {
        const validPage = page ? +page : 1;
        const validLimit = limit ? +limit : 4;

        try {
            const products = await db.product.findMany({
                include: {
                    guarantee: true,
                    price: true,
                    orders: true,
                },
                orderBy: {
                    date: 'desc',
                },
                skip: (validPage - 1) * validLimit,
                take: validLimit,
                where: {
                    type: type ? (type === 'All' ? undefined : type) : undefined,
                },
            });
            const totalCount = await db.product.count({
                where: {
                    type: type ? (type === 'All' ? undefined : type) : undefined,
                },
            });
            const totalPages = Math.ceil(totalCount / validLimit);
            const productTypeList = await db.product.findMany({
                select: {
                    type: true,
                },
                distinct: ['type'],
            });

            return { products, totalCount, totalPages, productTypeList };
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

    async createProduct({
        productData,
        priceData,
        guaranteeData,
        orderId,
    }: {
        productData: Omit<Product, 'id' | 'createdAt'>;
        priceData: Price[];
        guaranteeData: Omit<Guarantee, 'id'>;
        orderId: string;
    }): Promise<Product> {
        try {
            const newProduct = await db.product.create({
                data: {
                    ...productData,
                    orderId,
                },
            });
            if (!newProduct) {
                throw ApiError.internalError("Can't create product");
            }
            await db.$transaction([
                db.price.createMany({
                    data: priceData.map((item) => ({ ...item, productId: newProduct.id })),
                }),
                db.guarantee.create({
                    data: {
                        ...guaranteeData,
                        productId: newProduct.id,
                    },
                }),
            ]);

            return newProduct;
        } catch (error) {
            console.log('error: ', error);
            throw ApiError.internalError("Can't create full product");
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
        // if (role !== RoleTypes.ADMIN || role !== RoleTypes.SUBADMIN) {
        //     throw ApiError.unauthorized("You don't have permission to delete order");
        // }
        try {
            return await db.product.delete({ where: { id } });
        } catch (error) {
            throw ApiError.internalError("Can't delete product");
        }
    }
}

const productService = new ProductService();

export default productService;
