import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Star } from "lucide-react";

interface ProductTabsProps {
  aboutItem: string[];
}

const ProductTab = ({ aboutItem = []}: ProductTabsProps) => {
  return (
    <div>
      <Tabs defaultValue="aboutitem" className="w-full p-4 -mt-2 ">
        <TabsList className="bg-transparent">
          <TabsTrigger value="aboutitem">About This Item</TabsTrigger>
        </TabsList>
        <TabsContent value="aboutitem">
          <div>
            <ol className="list-disc space-y-2">
              {aboutItem.map((about) => (
                <li key={about}>{about}</li>
              ))}
            </ol>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTab;
