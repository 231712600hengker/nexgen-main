import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        aboutItems: true,
        images: true,
      }
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { name, category, description, price, stockItems, brand, aboutItems, images } = body;

    // Delete existing aboutItems and images
    await prisma.aboutItem.deleteMany({
      where: { productId: parseInt(params.id) }
    });
    await prisma.productImage.deleteMany({
      where: { productId: parseInt(params.id) }
    });

    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
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
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // Delete related records first
    await prisma.aboutItem.deleteMany({
      where: { productId: parseInt(params.id) }
    });
    await prisma.productImage.deleteMany({
      where: { productId: parseInt(params.id) }
    });

    await prisma.product.delete({
      where: { id: parseInt(params.id) }
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}