// app/(dashboard)/products/[productId]/page.tsx
import React from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetails from "@/components/product/ProductDetails";
import BreadcrumbComponent from "@/components/others/Breadcrumb";

type Params = {
  params: {
    productId: string;
  };
};

const ProductDetailsPage = async ({ params }: Params) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products/${params.productId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-red-500 p-8">Product not found.</div>;
  }

  const product = await res.json();

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="py-2">
        <BreadcrumbComponent
          links={["/dashboard", "/products"]}
          pageText={product.name}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:gap-8">
        <ProductGallery isInModal={false} images={product.images} />
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
