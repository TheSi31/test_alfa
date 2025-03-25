'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { addProduct } from '@/store/slice/productSlice';
import { useRouter } from 'next/navigation';

const Form_Create_Product = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const onFinish = (values: any) => {
        const newProduct = {
            id: Date.now(),
            title: values.title,
            price: Number(values.price),
            category: values.category,
            description: values.description,
            image: values.image || 'https://picsum.photos/150', 
            rating: { rate: 0, count: 0 },
        };

        dispatch(addProduct(newProduct));
        router.push('/products');
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Добавить новый продукт</h1>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Название"
                    name="title"
                    rules={[{ required: true, message: 'Введите название продукта' }]}
                >
                    <Input placeholder="Название продукта" />
                </Form.Item>

                <Form.Item
                    label="Цена"
                    name="price"
                    rules={[{ required: true, message: 'Введите цену' }]}
                >
                    <Input type="number" placeholder="Цена продукта" />
                </Form.Item>

                <Form.Item
                    label="Категория"
                    name="category"
                    rules={[{ required: true, message: 'Введите категорию' }]}
                >
                    <Input placeholder="Категория продукта" />
                </Form.Item>

                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[{ required: true, message: 'Введите описание продукта' }]}
                >
                    <Input.TextArea placeholder="Описание продукта" rows={4} />
                </Form.Item>

                <Form.Item
                    label="Ссылка на изображение (необязательно)"
                    name="image"
                >
                    <Input placeholder="URL изображения" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Form_Create_Product;
