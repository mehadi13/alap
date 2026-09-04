import React from "react";
import Script from "next/script";

export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alap.ai";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ALAP",
    alternateName: "আলাপ",
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    description: "Business Automation & Digital Solutions Company",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+8801700000000",
      contactType: "customer service",
      availableLanguage: ["English", "Bengali"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Business Automation & Custom Software Development",
    provider: {
      "@type": "Organization",
      name: "ALAP",
    },
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ALAP Digital Solutions Catalog",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Customer Support Automation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sales Lead Routing & Automation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce Order Workflows",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Office Workflow Automation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Business Solutions",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Digital Solutions",
          },
        },
      ],
    },
  };

  return (
    <>
      <Script
        id="json-ld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="json-ld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
