"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { brandsData } from "@/data/brands/brandsdata";
import { Label } from "../ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { dummyCategories } from "@/data/category/categoryData";

const FilterProducts = () => {
  // State variables for filters
  const [minValue, setMinValue] = useState(1000000); // Default min: 1jt IDR
  const [maxValue, setMaxValue] = useState(100000000); // Default max: 100jt IDR
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Access search params
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get filter values from search params on initial render
  const initialMinPrice = searchParams.get("min") || "1000000";
  const initialMaxPrice = searchParams.get("max") || "100000000";
  const initialCategory = searchParams.get("category");
  const initialBrand = searchParams.get("brand");

  // Update state with initial values
  useEffect(() => {
    setMinValue(Number(initialMinPrice));
    setMaxValue(Number(initialMaxPrice));
    setSelectedCategory(initialCategory as string);
    setSelectedBrand(initialBrand as string);
  }, [initialMinPrice, initialMaxPrice, initialCategory, initialBrand]);

  // Selection handler functions with search param updates
  const handleCategorySelection = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === selectedCategory) {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", category);
    }
    setSelectedCategory(category);
    router.push(`${pathname}?${newSearchParams}`);
  };

  // Update min price
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Number(event.target.value);
    setMinValue(newMinValue);
    setMinAndMaxPrice(newMinValue, maxValue);
  };

  // Update max price
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Number(event.target.value);
    setMaxValue(newMaxValue);
    setMinAndMaxPrice(minValue, newMaxValue);
  };

  // Update price range in URL
  const setMinAndMaxPrice = (minPrice: number, maxPrice: number) => {
    const min = Math.min(minPrice, maxPrice);
    const max = Math.max(minPrice, maxPrice);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("min", `${min}`);
    newSearchParams.set("max", `${max}`);
    router.push(`${pathname}?${newSearchParams}`);
  };

  // Handle price range slider change
  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Number(event.target.value);
    setMaxValue(newMaxValue);
    setMinAndMaxPrice(minValue, newMaxValue);
  };

  const handleBrandSelection = (brand: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (brand === selectedBrand) {
      newSearchParams.delete("brand");
    } else {
      newSearchParams.set("brand", brand);
    }
    setSelectedBrand(brand);
    router.push(`${pathname}?${newSearchParams}`);
  };

  const clearFilter = () => {
    // Reset to default values
    setMinValue(1000000);
    setMaxValue(100000000);
    setSelectedCategory("");
    setSelectedBrand("");
    router.push(`${pathname}`);
  };

  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <aside className="w-72 p-2 space-y-4">
      <h2 className="text-xl font-bold capitalize my-2">Filter Products</h2>
      <Separator />
      
      {/* Filter by price */}
      <div>
        <h3 className="text-lg font-medium my-2">By Price</h3>
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="min">Min :</Label>
            <Input
              id="min"
              placeholder="Rp1.000.000"
              value={minValue}
              min={100000}
              max={100000000}
              type="number"
              onChange={handleMinPriceChange}
            />
          </div>
          <div>
            <Label htmlFor="max">Max :</Label>
            <Input
              id="max"
              placeholder="Rp100.000.000"
              min={100000}
              max={100000000}
              value={maxValue}
              type="number"
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <Input
            onChange={handleRangeChange}
            type="range"
            min={100000}
            max={100000000}
            step={1000000}
            value={maxValue}
            className="w-full"
          />
          <p className="text-center text-green-500 text-lg">
            {formatPrice(minValue)} - {formatPrice(maxValue)}
          </p>
        </div>
      </div>

      {/* Filter by category */}
      <div>
        <h3 className="text-lg font-medium my-2">By Categories</h3>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          {dummyCategories.map((category) => (
            <p
              onClick={() => handleCategorySelection(category.name)}
              className={cn(
                "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer",
                category.name === selectedCategory &&
                  "bg-blue-400 dark:bg-blue-700"
              )}
              key={category.id}
            >
              {category.name}
            </p>
          ))}
        </div>
      </div>

      {/* Filter by Brand name */}
      <div>
        <h3 className="text-lg font-medium my-2">By Brands</h3>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          {brandsData.map((brand) => (
            <p
              onClick={() => handleBrandSelection(brand)}
              className={cn(
                "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer",
                selectedBrand === brand && "bg-blue-400 dark:bg-blue-700"
              )}
              key={brand}
            >
              {brand}
            </p>
          ))}
        </div>
      </div>
      
      <div>
        <Button onClick={clearFilter} variant={"outline"} className="w-full">
          Clear Filter
        </Button>
      </div>
    </aside>
  );
};

export default FilterProducts;