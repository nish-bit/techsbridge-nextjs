import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { TechStack } from "@/components/sections/TechStack";
export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" } };
export default function AboutPage() { return <main className="pt-[76px]"><About /><WhyChooseUs /><Process /><TechStack /></main>; }