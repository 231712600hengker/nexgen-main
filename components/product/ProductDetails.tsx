"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import ProductTab from "./ProductTab";
import ProductDescription from "./ProductDescription";
import AddToWishlistBtn from "../buttons/AddToWishlistBtn";
import { Product } from "@/types";
import Link from "next/link";


const ProductDetails = ({ product }: { product: Product }) => {

  return (
    <div className="space-y-2 mt-2">
      {/* Category */}
      <Link
        href={`/shop?category=${product.category}`}
        className="bg-lime-500 py-1 px-4 rounded-full w-fit"
      >
        {product?.category}
      </Link>
      {/* Product Name */}
      <h2 className="text-2xl md:text-3xl font-bold capitalize">
        {product?.name}
      </h2>
      {/* Product Description */}
      <ProductDescription description={product?.description as string} />

      {/* product stock */}
      <div>
        {product.stockItems === 0 ? (
          <p className="text-lg  w-fit rounded-md text-muted-foreground">out of stock</p>
        ) : (
          <p className="text-lg w-fit rounded-md text-muted-foreground">
            Only <span className="text-lg text-black dark:text-white">({product.stockItems})</span> items in stock
          </p>
        )}
      </div>
      <div className="flex items-center gap-6">
        <div className="">
          {/* Original Price */}
          <p className="text-lg text-black dark:text-white">
            Rp{product?.price}
          </p>
          <p className="flex flex-col md:flex-row mt-4 items-center gap-2 max-w-96 ml-auto justify-end"
          onClick={(e) => e.preventDefault()}
        >
          <AddToWishlistBtn product={product} />
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 !my-6">
      </div>
      {/* Separator */}
      <Separator className="!mt-4" />
      {/* Product Tab */}
      <ProductTab aboutItem={product?.aboutItem!} />
    </div>
  );
};

export default ProductDetails;
