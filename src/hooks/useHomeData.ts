import { useState, useEffect } from "react";
import { productService } from "../api/services/productService";
import { contentService } from "../api/services/contentService";
import { Product, SnsPost } from "../api/types";

export const useHomeData = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [forYouProducts, setForYouProducts] = useState<Product[]>([]);
  const [snsPosts, setSnsPosts] = useState<SnsPost[]>([]);
  const [trendingTags, setTrendingTags] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAllData = async () => {
    try {
      const [
        bannersData,
        productsData,
        snsData,
        tagsData,
      ] = await Promise.all([
        contentService.getBanners(),
        productService.getProducts(),
        contentService.getSnsPosts(),
        contentService.getTrendingTags(),
      ]);

      setBanners(bannersData);
      setNewArrivals(productsData.slice(0, 8));
      setForYouProducts(productsData.slice(8, 13)); // 추천 영역용 5개
      setSnsPosts(snsData);
      setTrendingTags(tagsData);
    } catch {
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchAllData();
  };

  return {
    banners,
    newArrivals,
    forYouProducts,
    snsPosts,
    trendingTags,
    isLoading,
    isRefreshing,
    onRefresh,
  };
};
