import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  return NextResponse.json({
    id: 999,
    slug: params.slug,
    title: params.slug.replaceAll("-", " ").toUpperCase(),
    description: "Mock product description for preview.",
    price: 5000,
    sale_price: 4500,
    stock_qty: 25,
    images: [
      { image_url: "https://via.placeholder.com/600x600?text=Main" },
      { image_url: "https://via.placeholder.com/600x600?text=Alt1" },
      { image_url: "https://via.placeholder.com/600x600?text=Alt2" },
    ],
    vendor: { id: 1, store_name: "Demo Vendor", store_slug: "demo-vendor" },
  });
}

