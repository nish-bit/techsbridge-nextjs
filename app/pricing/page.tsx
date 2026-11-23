import type { Metadata } from "next";
import { Pricing } from "@/components/sections/Pricing";
import { CostCalculator } from "@/components/sections/CostCalculator";
export const metadata: Metadata = { title: "Pricing", alternates: { canonical: "/pricing" } };
export default function PricingPage() { return <main className="pt-[76px]"><Pricing /><CostCalculator /></main>; }