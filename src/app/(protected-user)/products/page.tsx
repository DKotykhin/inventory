import React from 'react';

import productService from '@/services/productService';
import { Spinner } from '@/components/Spinner';

const ProductsPage = async () => {

    const products = await productService.getProducts();
    console.log('products: ', products);

    return products ? (
        <div>Products Page</div>
    ) : <Spinner />;
};

export default ProductsPage;