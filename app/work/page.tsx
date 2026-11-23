import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/Portfolio";
export const metadata: Metadata = { title: "Work", alternates: { canonical: "/work" } };
export default function WorkPage() { return <main className="pt-[76px]"><Portfolio /></main>; }