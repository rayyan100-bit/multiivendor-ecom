import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    categories: [
      { id: 1, name: "Electronics", slug: "electronics" },
      { id: 2, name: "Fashion", slug: "fashion" },
      { id: 3, name: "Home", slug: "home" },
    ],
    featuredProducts: [
      {
        id: 101,
        slug: "wireless-earbuds",
        title: "Wireless Earbuds Bluetooth 5.3",
        price: 2999,
        sale_price: 2499,
        rating_avg: 4.4,
        sold_count: 1200,
        images: [{ image_url: "https://via.placeholder.com/600x600?text=Earbuds" }],
      },
      {
        id: 102,
        slug: "smart-watch",
        title: "Smart Watch Series Pro (Fitness + Calls)",
        price: 4999,
        sale_price: 3999,
        rating_avg: 4.2,
        sold_count: 860,
        images: [{ image_url: "https://via.placeholder.com/600x600?text=Watch" }],
      },
    ],
  });
}

