import { PrismaClient } from '@prisma/client'
import { productsData } from '../data/products/productsData'

const prisma = new PrismaClient()

async function main() {
  // Seed Products
  for (const product of productsData) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        rating: product.rating,
        stockItems: product.stockItems,
        brand: product.brand,
        aboutItems: {
          create: product.aboutItem.map(content => ({ content })),
        },
        images: {
          create: product.images.map(imageUrl => ({ imageUrl })),
        },
      },
    })

    console.log(`✅ Created product: ${createdProduct.name}`)
  }

  // Seed Customers
  const customers = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      image: "/images/people/person.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      address: "456 Elm St, Othertown, USA",
      image: "/images/people/person.jpg",
    },
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "5551234567",
      address: "789 Oak St, Smalltown, USA",
      image: "/images/people/person.jpg",
    },
    {
      name: "Bob Williams",
      email: "bob@example.com",
      phone: "4449876543",
      address: "321 Pine St, Bigtown, USA",
      image: "/images/people/person.jpg",
    },
    {
      name: "Emily Brown",
      email: "emily@example.com",
      phone: "3332221111",
      address: "654 Maple St, Newtown, USA",
      image: "/images/people/person.jpg",
    },
    {
      name: "Michael Scott",
      email: "michael@example.com",
      phone: "2223334444",
      address: "1725 Slough Ave, Scranton, USA",
      image: "/images/people/person.jpg",
    },
    {
      name: "Pam Beesly",
      email: "pam@example.com",
      phone: "5556667777",
      address: "500 Spruce St, Scranton, USA",
      image: "/images/people/person.jpg",
    },
    {
      name: "Jim Halpert",
      email: "jim@example.com",
      phone: "6667778888",
      address: "700 Walnut St, Scranton, USA",
      image: "/images/people/person.jpg",
    },
    {
      name: "Dwight Schrute",
      email: "dwight@example.com",
      phone: "7778889999",
      address: "Schrute Farms, Scranton, USA",
      image: "/images/people/person.jpg",
    }
  ]

  for (const customer of customers) {
    await prisma.customer.create({ data: customer })
  }

  // Seed Orders
  const orders = [
    {
      orderNumber: "ORD123456",
      customerEmail: "john@example.com",
      date: new Date("2024-04-01"),
      status: "Shipped",
      shippingAddress: "123 Main St, Anytown, USA",
      city: "Anytown",
      country: "USA",
      totalAmount: 500,
    },
    {
      orderNumber: "ORD123457",
      customerEmail: "jane@example.com",
      date: new Date("2024-04-02"),
      status: "Pending",
      shippingAddress: "456 Elm St, Othertown, USA",
      city: "Othertown",
      country: "USA",
      totalAmount: 300,
    },
    {
      orderNumber: "ORD123458",
      customerEmail: "alice@example.com",
      date: new Date("2024-04-03"),
      status: "Delivered",
      shippingAddress: "789 Oak St, Smalltown, USA",
      city: "Smalltown",
      country: "USA",
      totalAmount: 450,
    },
    {
      orderNumber: "ORD123459",
      customerEmail: "bob@example.com",
      date: new Date("2024-04-04"),
      status: "Shipped",
      shippingAddress: "321 Pine St, Bigtown, USA",
      city: "Bigtown",
      country: "USA",
      totalAmount: 600,
    },
    {
      orderNumber: "ORD123460",
      customerEmail: "emily@example.com",
      date: new Date("2024-04-05"),
      status: "Pending",
      shippingAddress: "654 Maple St, Newtown, USA",
      city: "Newtown",
      country: "USA",
      totalAmount: 250,
    },
    {
      orderNumber: "ORD123461",
      customerEmail: "michael@example.com",
      date: new Date("2024-04-06"),
      status: "Delivered",
      shippingAddress: "1725 Slough Ave, Scranton, USA",
      city: "Scranton",
      country: "USA",
      totalAmount: 700,
    },
    {
      orderNumber: "ORD123462",
      customerEmail: "pam@example.com",
      date: new Date("2024-04-07"),
      status: "Processing",
      shippingAddress: "500 Spruce St, Scranton, USA",
      city: "Scranton",
      country: "USA",
      totalAmount: 350,
    },
    {
      orderNumber: "ORD123463",
      customerEmail: "jim@example.com",
      date: new Date("2024-04-08"),
      status: "Cancelled",
      shippingAddress: "700 Walnut St, Scranton, USA",
      city: "Scranton",
      country: "USA",
      totalAmount: 0,
    },
    {
      orderNumber: "ORD123464",
      customerEmail: "dwight@example.com",
      date: new Date("2024-04-09"),
      status: "Shipped",
      shippingAddress: "Schrute Farms, Scranton, USA",
      city: "Scranton",
      country: "USA",
      totalAmount: 800,
    }
  ]

  for (const order of orders) {
    const customer = await prisma.customer.findUnique({
      where: { email: order.customerEmail },
    })

    if (!customer) {
      console.warn(`⚠️ Customer not found for order ${order.orderNumber}`)
      continue
    }

    await prisma.order.create({
      data: {
        orderNumber: order.orderNumber,
        customerId: customer.id,
        status: order.status,
        shippingAddress: order.shippingAddress,
        city: order.city,
        country: order.country,
        totalAmount: order.totalAmount,
        date: order.date,
        isRecent: true,
      },
    })
  }

  console.log("🌱 Seed data selesai!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
