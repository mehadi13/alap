import React from "react";
import { notFound } from "next/navigation";
import { solutionsData } from "@/features/services/data";
import SolutionDetailClient from "./SolutionDetailClient";

export async function generateStaticParams() {
  return Object.keys(solutionsData).map((slug) => ({
    slug,
  }));
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = solutionsData[slug];

  if (!solution) {
    notFound();
  }

  return <SolutionDetailClient solution={solution} />;
}

