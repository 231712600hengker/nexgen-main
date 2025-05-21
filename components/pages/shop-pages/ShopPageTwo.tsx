import ShopPageContainer from "@/components/products/ShopPageContainer";
import React from "react";

interface ShopPageTwoProps {
  searchParams: {
    page: string;
    category: string;
    brand: string;
    search: string;
    min: string;
    max: string;
  };
}

const ShopPageTwo = ({ searchParams }: ShopPageTwoProps) => {
  return (
    <section>
      <div className="p-4 lg:px-16">
        <ShopPageContainer gridColumn={4} searchParams={searchParams} />
      </div>
    </section>
  );
};

export default ShopPageTwo;
