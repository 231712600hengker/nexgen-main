import ShopPageTwo from "@/components/pages/shop-pages/ShopPageTwo";
import { SearchParams } from "@/types";
import React from "react";

function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <div>
      <ShopPageTwo searchParams={searchParams} />
    </div>
  );
}

export default ShopPage;
