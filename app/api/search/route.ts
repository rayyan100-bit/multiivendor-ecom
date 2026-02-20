import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const items = [
    {
      id: 201,
      slug: "iphone-case",
      title: `iPhone Case - ${q || "Premium"}`,
      price: 799,
      sale_price: 599,
      rating_avg: 4.6,
      sold_count: 5400,
      images: [{ image_url: "https://via.placeholder.com/600x600?text=Case" }],
    },
    {
      id: 202,
      slug: "usb-c-cable",
      title: `USB-C Fast Cable - ${q || "Durable"}`,
      price: 499,
      sale_price: null,
      rating_avg: 4.3,
      sold_count: 2100,
      images: [{ image_url: "https://via.placeholder.com/600x600?text=Cable" }],
    },
  ];

  return NextResponse.json({
    items,
    total: items.length,
    page: Number(searchParams.get("page") || "1"),
    pageSize: 20,
  });
}

