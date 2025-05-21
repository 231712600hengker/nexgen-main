import { prisma } from "@/lib/prisma";
import ProductGallery from "@/components/product/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import ProductDetails from "@/components/product/ProductDetails";

interface ProductIdPageProps {
  params: { productId: string };
}

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const productId = Number(params.productId);

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      images: true,
      aboutItems: true,
    },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      NOT: { id: product.id },
    },
    include: {
      images: true,
    },
    take: 4,
  });

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex flex-col items-start gap-2 min-h-screen">
      <div className="my-2">
        <BreadcrumbComponent links={["/shop"]} pageText={product.name} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <ProductGallery isInModal={false} images={product.images} />
        <ProductDetails product={product} />
      </div>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductIdPage;
