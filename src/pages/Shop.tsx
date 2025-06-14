import { useEffect, useState } from "react";
import { Product } from "../types";
import { fetchProducts } from "../services/productService";
import { SearchFilterInput } from "../components/shop/SearchFilterInput";
import AppLayout from "../layouts/AppLayout";
import { SortOptions } from "../components/shop/SortOptions";
import { ProductFilter } from "../components/shop/ProductFilter";
import { ProductCard } from "../components/ProductCard";

export const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <AppLayout>
            {loading ? (
                <div>loading..</div>
            )
                :
                <>
                    <div className="w-full h-[500px] bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('https://dunker.qodeinteractive.com/wp-content/uploads/2023/01/inner-img-6.jpg')" }}>
                        <h1 className="text-5xl font-bold tracking-wide uppercase">Shop</h1>
                    </div>
                    <div className="flex flex-row justify-around my-4">
                        <ProductFilter />
                        <SearchFilterInput />
                        <SortOptions />
                    </div>
                    <div className="flex flex-row">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </>
            }
        </AppLayout>

    )
}
