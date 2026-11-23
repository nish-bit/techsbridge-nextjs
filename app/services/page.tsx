import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
export const metadata: Metadata = { title: "Services", alternates: { canonical: "/services" } };
export default function ServicesPage() { return <main className="pt-[76px]"><Services /></main>; }