// app/api/customers/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log('Fetching customer data...');

    // Simulasi delay 3 detik
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const customers = await prisma.customer.findMany();

    console.log('Data fetch completed after 3 seconds.');

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
