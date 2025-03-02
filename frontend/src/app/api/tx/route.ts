import { NextResponse } from "next/server";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const ETHERSCAN_BASE_URL = "https://api.etherscan.io/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { error: "Missing address param" },
      { status: 400 }
    );
  }

  try {
    const url = `${ETHERSCAN_BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${"FQ86U2G89PEZWQBN5SM7S1DMIFUJ7ATZ54"}`;
    const res = await fetch(url);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Error from Etherscan API" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Etherscan:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
