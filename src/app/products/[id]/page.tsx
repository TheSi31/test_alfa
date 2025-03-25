import Product_More from "@/components/Product_More";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

interface Params {
    id: string; // Типизация параметра маршрута
}

type tParams = Promise<Params>;

const Page = async (props : { params: tParams }) => {
    // Преобразование id в числовой формат
    const id = await parseInt((await props.params).id, 10);

    if (isNaN(id)) {
        // Если id не является числом, возвращаем сообщение об ошибке
        return (
            <main className="p-4">
                <p>Неверный ID продукта</p>
            </main>
        );
    }

    return (
        <main className="p-4">
            {/* Ссылка для возврата к продуктам */}
            <Link href="/products">
                <ArrowLeftOutlined />
            </Link>
            {/* Отображение компонента с деталями продукта */}
            <Product_More id={id} />
        </main>
    );
};

export async function generateStaticParams() {
    const response = await fetch("https://fakestoreapi.com/products");

    return response.json().then((data) => data.map((product: any) => ({ id: product.id.toString() })));
}

export default Page;
