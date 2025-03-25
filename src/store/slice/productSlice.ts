import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface ProductState {
    products: Product[];
    favoriteProducts: number[];
}

const initialState: ProductState = {
    products: [],
    favoriteProducts: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            const newProducts = action.payload.filter(
                (newProduct) => !state.products.some((existingProduct) => existingProduct.id === newProduct.id)
            );
            state.products = [...state.products, ...newProducts];
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            if (state.favoriteProducts.includes(productId)) {
                state.favoriteProducts = state.favoriteProducts.filter(id => id !== productId);
            } else {
                state.favoriteProducts.push(productId);
            }
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const updatedProduct = action.payload;
            const index = state.products.findIndex((p) => p.id === updatedProduct.id);
            if (index !== -1) {
                state.products[index] = updatedProduct;
            }
        },   
        deleteProduct: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            state.products = state.products.filter(product => product.id !== productId);
            state.favoriteProducts = state.favoriteProducts.filter(id => id !== productId);
        },
    },
});

export const { setProducts, addProduct, toggleFavorite, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
