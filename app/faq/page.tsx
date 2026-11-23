import type { Metadata } from "next";
import { FAQ } from "@/components/sections/FAQ";
export const metadata: Metadata = { title: "FAQ", alternates: { canonical: "/faq" } };
export default function FAQPage() { return <main className="pt-[76px]"><FAQ /></main>; }