import type { Metadata } from "next";
import "./globals.css";
import { company } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ChatWidget } from "@/components/layout/ChatWidget";

const siteUrl = company.domain;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TechsBridge — Websites, Web Apps & AI Solutions",
    template: "%s | TechsBridge",
  },
  description:
    "TechsBridge designs and develops high-performance websites, web applications, AI solutions and startup products for businesses across India.",
  keywords: [
    "TechsBridge",
    "website development",
    "web application development",
    "AI development India",
    "college website development",
    "startup MVP development",
    "dashboard development",
    "Nishant Ali",
  ],
  authors: [{ name: company.founder }],
  openGraph: {
    title: "TechsBridge — Websites, Web Apps & AI Solutions",
    description:
      "We design and develop high-performance websites, web applications, AI solutions and digital products that help businesses grow.",
    url: siteUrl,
    siteName: "TechsBridge",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechsBridge — Websites, Web Apps & AI Solutions",
    description:
      "We design and develop high-performance websites, web applications, AI solutions and digital products that help businesses grow.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "TechsBridge",
  url: siteUrl,
  description:
    "TechsBridge designs and develops websites, web applications, AI solutions, and startup products for businesses across India.",
  email: company.email,
  telephone: "+91-7060734295",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    addressCountry: "IN",
  },
  areaServed: "IN",
  founder: {
    "@type": "Person",
    name: company.founder,
  },
  sameAs: [company.linkedin],
  makesOffer: [
    "Website Development",
    "College Website Development",
    "Startup MVP Development",
    "AI Development",
    "Dashboard Development",
    "Website Maintenance",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
      </body>
    </html>
  );
}
