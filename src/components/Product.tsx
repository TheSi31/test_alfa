'use client';

import { Rate, Dropdown } from "antd";
import type { MenuProps } from "antd";
import Image from "next/image";
import { HeartOutlined, EllipsisOutlined } from "@ant-design/icons";
import Link from "next/link";

interface ProductProps {
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
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    onEdit: () => void;
    onDelete: () => void; 
}

const Product = (props: ProductProps) => {

    const menu: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <span
                    className="text-blue-500 hover:text-blue-600 cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault()
                        props.onEdit();
                    }}
                >
                    Редактировать продукт
                </span>
            ),
        },
        {
            key: "2",
            label: (
                <span
                    className="text-red-500 hover:text-red-600 cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault()
                        props.onDelete();
                    }}
                >
                    Удалить продукт
                </span>
            ),
        },
    ];

    return (
        <Link href={`/products/${props.id}`}>
            <div className="flex flex-col p-4 border rounded-lg shadow-lg hover:scale-105 transition-transform relative cursor-pointer">
                <Dropdown menu={{ items: menu }} trigger={["click"]} placement="bottomRight">
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
                        onClick={(e) => e.preventDefault()}
                    >
                        <EllipsisOutlined />
                    </button>
                </Dropdown>

                <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                        src={props.image}
                        alt={props.title}
                        width={150}
                        height={150}
                        className="object-contain"
                    />
                </div>

                <div className="flex flex-col mt-2">
                    <h2 className="text-lg font-bold line-clamp-1">{props.title}</h2>
                    <p className="text-sm text-gray-500 line-clamp-2">{props.description}</p>
                    <p className="text-sm text-gray-600">{props.category}</p>

                    <div className="flex justify-between mt-2">
                        <p className="text-md text-green-600 font-semibold">{props.price} $</p>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                props.onFavoriteToggle();
                            }}
                            className={`text-xl ${
                                props.isFavorite ? 'text-red-500' : 'text-gray-300'
                            }`}
                        >
                            <HeartOutlined />
                        </button>
                    </div>

                    <div className="flex items-center mt-2">
                        <Rate disabled defaultValue={props.rating.rate} className="text-yellow-400" />
                        <p className="text-xs text-gray-400 ml-2">({props.rating.count} оценок)</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Product;
