import { useEffect, useState } from "react";
import { Product } from "../types";
import { fetchProducts } from "../services/productService";
import AppLayout from "../layouts/AppLayout";

export const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    console.info(products, loading)

    useEffect(() => {
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    return (
        <AppLayout>
            <div className="w-full h-[500px] bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('https://dunker.qodeinteractive.com/wp-content/uploads/2023/01/inner-img-6.jpg')" }}>
                <h1 className="text-5xl font-bold tracking-wide uppercase">Shop</h1>
            </div>
        </AppLayout>

    )
}
