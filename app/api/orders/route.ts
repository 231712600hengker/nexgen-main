import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type OrderWithCustomer = {
  id: number;
  orderNumber: string;
  createdAt: Date | null;
  status: string;
  customer: {
    name: string;
  } | null;
};

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
      },
    });

    const formattedOrders = orders.map((order: OrderWithCustomer) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customer?.name ?? "Unknown",
      date: order.createdAt ? order.createdAt.toISOString().split("T")[0] : null,
      status: order.status,
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
