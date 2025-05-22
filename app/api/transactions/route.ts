import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        customerName: {
          contains: search,
          mode: 'insensitive'
        }
      },
      include: {
        items: true,
      },
      orderBy: {
        date: 'desc'
      }
    });
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderNumber, customerName, amount, status, items } = body;

    const transaction = await prisma.transaction.create({
      data: {
        orderNumber,
        customerName,
        amount,
        status,
        items: {
          create: items.map((item: any) => ({
            productName: item.productName,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: true,
      }
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
  }
}