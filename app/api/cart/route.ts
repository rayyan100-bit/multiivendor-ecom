import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST() {
  return NextResponse.json({ cart_token: randomUUID() });
}

export async function GET() {
  return NextResponse.json({
    items: [
      {
        id: 1,
        qty: 2,
        unit_price: 2499,
        product: { id: 101, title: "Wireless Earbuds Bluetooth 5.3", slug: "wireless-earbuds" },
      },
    ],
  });
}

