'use client';

import { useState } from "react";
import List from "./List";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const FilterSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [rating, setRating] = useState(0);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center space-x-2">
                <Input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Поиск продуктов"
                    className="w-64 max-md:w-32"
                    suffix={<SearchOutlined />}
                />

                <Select
                    value={category}
                    onChange={(value) => setCategory(value)}
                    placeholder="Выберите категорию"
                    className="w-64 max-md:w-32"
                >
                    <Option value="">Все категории</Option>
                    <Option value="men's clothing">Мужская одежда</Option>
                    <Option value="women's clothing">Женская одежда</Option>
                    <Option value="electronics">Электроника</Option>
                    <Option value="jewelery">Ювелирные изделия</Option>
                </Select>
            </div>

            <div className="flex items-center space-x-2">
                <span className="text-sm">Цена от</span>
                <Input
                    type="number"
                    value={minPrice}
                    onChange={(event) => setMinPrice(Number(event.target.value))}
                    className="w-20"
                />
                <span className="text-sm">до</span>
                <Input
                    type="number"
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(Number(event.target.value))}
                    className="w-20"
                />
            </div>

            <div className="flex items-center space-x-2">
                <span className="text-sm">Оценка от</span>
                <Input
                    type="number"
                    value={rating}
                    onChange={(event) => setRating(Number(event.target.value))}
                    className="w-20"
                    min={0}
                    max={5}
                    step={0.1}
                />
            </div>

            <List
                searchQuery={searchQuery}
                category={category}
                minPrice={minPrice}
                maxPrice={maxPrice}
                rating={rating}
            />
        </div>
    );
};

export default FilterSearch;
