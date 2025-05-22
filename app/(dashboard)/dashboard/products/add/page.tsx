"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      category: formData.get("category"),
      description: formData.get("description"),
      price: parseInt(formData.get("price") as string),
      stockItems: parseInt(formData.get("stockItems") as string),
      brand: formData.get("brand"),
      aboutItems: [formData.get("aboutItems")],
      images: [formData.get("imageUrl")],
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create product");

      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <Input name="name" required />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <Input name="category" required />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <Textarea name="description" required />
        </div>
        <div>
          <label className="block mb-2">Price</label>
          <Input type="number" name="price" required />
        </div>
        <div>
          <label className="block mb-2">Stock</label>
          <Input type="number" name="stockItems" required />
        </div>
        <div>
          <label className="block mb-2">Brand</label>
          <Input name="brand" />
        </div>
        <div>
          <label className="block mb-2">About Items</label>
          <Textarea name="aboutItems" />
        </div>
        <div>
          <label className="block mb-2">Image URL</label>
          <Input name="imageUrl" required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}