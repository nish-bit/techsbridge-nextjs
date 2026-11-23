import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };
export default function ContactPage() { return <main className="pt-[76px]"><Contact /></main>; }