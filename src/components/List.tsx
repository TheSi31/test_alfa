'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Checkbox, Modal, Input, Form } from 'antd';
import Product from './Product';
import { setProducts, toggleFavorite, deleteProduct, updateProduct } from '@/store/slice/productSlice';
import { RootState, AppDispatch } from '@/store/store';

interface ListProps {
    searchQuery: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    rating: number;
}

const List = ({ searchQuery, category, minPrice, maxPrice, rating }: ListProps) => {
    const dispatch: AppDispatch = useDispatch();
    const products = useSelector((state: RootState) => state.productsReducer.products);
    const favoriteProducts = useSelector((state: RootState) => state.productsReducer.favoriteProducts);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Управление модальным окном
    const [editingProduct, setEditingProduct] = useState<any | null>(null); // Редактируемый продукт

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            dispatch(setProducts(data));
        };

        fetchProducts();
    }, [dispatch]);

    const startIndex = (currentPage - 1) * pageSize;

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = category === '' || product.category === category;
        const matchesPriceMin = product.price >= minPrice;
        const matchesPriceMax = product.price <= maxPrice;
        const matchesRating = product.rating.rate >= rating;
        const matchesFavorites = !showFavoritesOnly || favoriteProducts.includes(product.id);

        return matchesSearch && matchesCategory && matchesPriceMin && matchesPriceMax && matchesRating && matchesFavorites;
    });

    const currentData = filteredProducts.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleShowFavoritesOnly = (checked: boolean) => {
        setShowFavoritesOnly(checked);
        setCurrentPage(1);
    };

    const handleToggleFavorite = (productId: number) => {
        dispatch(toggleFavorite(productId));
    };

    const handleDelete = (productId: number) => {
        dispatch(deleteProduct(productId));
    };

    const openEditModal = (product: any) => {
        setEditingProduct(product); // Устанавливаем редактируемый продукт
        setIsModalOpen(true); // Показываем модал
    };

    const handleEditSave = (values: any) => {
        dispatch(updateProduct({ ...editingProduct, ...values }));
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    return (
        <div className="p-4">
            <Checkbox
                checked={showFavoritesOnly}
                onChange={(e) => handleShowFavoritesOnly(e.target.checked)}
                className="mb-4"
            >
                Показывать только избранные
            </Checkbox>

            <div className="grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 gap-4">
                {currentData.map((product) => (
                    <Product
                        key={product.id}
                        {...product}
                        isFavorite={favoriteProducts.includes(product.id)}
                        onFavoriteToggle={() => handleToggleFavorite(product.id)}
                        onDelete={() => handleDelete(product.id)}
                        onEdit={() => openEditModal(product)}
                    />
                ))}
            </div>

            <div className="mt-6 flex justify-center">
                <Pagination
                    current={currentPage}
                    total={filteredProducts.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>

            <Modal
                title="Редактирование продукта"
                open={isModalOpen}
                onCancel={handleModalCancel}
                footer={null}
            >
                <Form
                    initialValues={editingProduct}
                    onFinish={handleEditSave}
                >
                    <Form.Item
                        label="Название"
                        name="title"
                        rules={[{ required: true, message: 'Введите название продукта' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Цена"
                        name="price"
                        rules={[{ required: true, message: 'Введите цену' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Категория"
                        name="category"
                        rules={[{ required: true, message: 'Введите категорию' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Описание"
                        name="description"
                        rules={[{ required: true, message: 'Введите описание' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Сохранить
                        </button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default List;
