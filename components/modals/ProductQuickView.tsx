"use client";
import React, { useEffect, useState } from "react";
import ProductDescription from "../product/ProductDescription";
import Rating from "../others/Rating";
import ProductGallery from "../product/ProductGallery";
import { useProductQuickViewStore } from "@/store/productQuickViewStore";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import ProductTab from "../product/ProductTab";


const ProductQuickViewModal = () => {
  const [quantity, setQuantity] = useState(1);
  const { isOpen, closeModal, product } = useProductQuickViewStore();

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore background scrolling when modal is closed
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal when clicking outside of it
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 m-auto flex items-center justify-center bg-black/70"
          onClick={handleCloseModal}
        >
          <div className="absolute top-0 right-0 m-4 z-50">
            {/* Close button */}
            <Button
              variant={"outline"}
              className="p-2 text-white rounded-full bg-black/50 hover:bg-black/70"
              onClick={closeModal}
            >
              <X />
            </Button>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 lg:p-8 rounded-lg shadow-lg h-[95%] w-[90%] lg:w-[80%] lg:h-[90%] overflow-auto hide-scrollbar">
            {product && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Product Gallery */}
                <ProductGallery isInModal={true} images={product.images} />
                <div className="space-y-2">
                  {/* Category */}
                  <small className="bg-lime-500 py-1 px-4 rounded-full w-fit">
                    {product.category}
                  </small>
                  {/* Product Name */}
                  <h2 className="text-2xl md:text-3xl font-bold capitalize">
                    {product.name}
                  </h2>
                  {/* Rating and Review */}
                  <Rating
                    rating={product.rating || 0}
                  />
                  {/* Product Description */}
                  <ProductDescription description={product.description} />

                  {/* product stock */}
                  <div className="">
                    {product.stockItems === 0 ? (
                      <p className="text-lg w-fit rounded-md">
                        out of stock
                      </p>
                    ) : (
                      <p className="text-lg w-fit rounded-md text-muted-foreground">
                        Only {product.stockItems} items in stock
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-6 !my-4">
                    <div className="">
                      {/* Original Price */}
                      <p className="text-muted-foreground line-through">
                        Rp{product.price}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex flex-col md:flex-row items-center gap-2"
                    onClick={closeModal}
                  >
                  </div>
                  <ProductTab
                    aboutItem={product?.aboutItem!}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductQuickViewModal;
