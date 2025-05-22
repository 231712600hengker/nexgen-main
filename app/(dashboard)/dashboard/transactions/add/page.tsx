"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface TransactionItem {
  productName: string;
  quantity: number;
  price: number;
}

export default function AddTransactionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<TransactionItem[]>([
    { productName: "", quantity: 1, price: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { productName: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof TransactionItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const data = {
      orderNumber: formData.get("orderNumber"),
      customerName: formData.get("customerName"),
      amount,
      status: "Pending",
      items,
    };

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create transaction");

      router.push("/dashboard/transactions");
      router.refresh();
    } catch (error) {
      console.error("Error creating transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Transaction</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block mb-2">Order Number</label>
          <Input name="orderNumber" required />
        </div>
        <div>
          <label className="block mb-2">Customer Name</label>
          <Input name="customerName" required />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Items</h3>
            <Button type="button" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </div>

          {items.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1">
                <label className="block mb-2">Product Name</label>
                <Input
                  value={item.productName}
                  onChange={(e) => updateItem(index, "productName", e.target.value)}
                  required
                />
              </div>
              <div className="w-24">
                <label className="block mb-2">Quantity</label>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                  required
                  min="1"
                />
              </div>
              <div className="w-32">
                <label className="block mb-2">Price</label>
                <Input
                  type="number"
                  value={item.price}
                  onChange={(e) => updateItem(index, "price", parseInt(e.target.value))}
                  required
                  min="0"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                className="mt-8"
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Transaction"}
        </Button>
      </form>
    </div>
  );
}