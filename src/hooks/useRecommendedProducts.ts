import { useState, useEffect } from "react";
import { productService } from "../api/services/productService";
import { Product } from "../api/types";

export const useRecommendedProducts = (currentProductId: string, category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const allProducts = await productService.getProducts();
        
        let filtered = allProducts.filter(
          (p) => p.category === category && p.id !== currentProductId
        );

        if (filtered.length < 4) {
          const others = allProducts.filter(
            (p) => p.id !== currentProductId && !filtered.some((rp) => rp.id === p.id)
          );
          filtered = [...filtered, ...others];
        }

        setProducts(filtered.slice(0, 4));
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommended();
  }, [currentProductId, category]);

  return { products, isLoading };
};
