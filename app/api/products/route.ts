import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
      include: {
        aboutItems: true,
        images: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, description, price, stockItems, brand, aboutItems, images } = body;

    const product = await prisma.product.create({
      data: {
        name,
        category,
        description,
        price,
        stockItems,
        brand,
        aboutItems: {
          create: aboutItems.map((content: string) => ({ content }))
        },
        images: {
          create: images.map((imageUrl: string) => ({ imageUrl }))
        }
      },
      include: {
        aboutItems: true,
        images: true,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}