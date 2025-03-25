'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Rate } from "antd";


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

const Product_More = ({ id }: { id: number }) => {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Ошибка при загрузке продукта:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500 text-lg">Загрузка продукта...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-6 max-w-lg mx-auto bg-white border border-gray-300 shadow-lg rounded-lg">
            
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-contain"
                    draggable="false"
                    loading="lazy"
                />
            </div>

            <h1 className="text-xl font-bold text-gray-800 mt-4 line-clamp-1 text-center">
                {product.title}
            </h1>

            <p className="text-lg font-semibold text-green-600 mt-2">
                {product.price} $
            </p>

            <p className="text-sm text-gray-500 capitalize mt-2">
                Категория: {product.category}
            </p>

            <div className="flex items-center mt-2">
                <Rate disabled defaultValue={product.rating.rate} />
                <span className="text-gray-400 text-sm ml-2">({product.rating.count} оценок)</span>
            </div>

            <p className="text-gray-600 text-sm mt-4 line-clamp-3 text-center">
                {product.description}
            </p>
        </div>
    );
};

export default Product_More;
