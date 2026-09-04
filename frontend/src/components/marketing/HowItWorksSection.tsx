"use client";

import React, { useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  Node,
  Edge,
  MarkerType,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { StepNode } from "@/components/marketing/StepNode";
import { Badge } from "@/components/ui/badge";
import { Workflow, Grid2X2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const nodeTypes = {
  stepNode: StepNode,
};

export function HowItWorksSection() {
  const { dict } = useLanguage();
  const [viewMode, setViewMode] = useState<"flow" | "grid">("flow");

  const nodes: Node[] = useMemo(
    () => [
      {
        id: "step-1",
        type: "stepNode",
        position: { x: 0, y: 60 },
        data: {
          stepNumber: "01",
          title: dict.howItWorks.step1Title,
          description: dict.howItWorks.step1Desc,
          isStart: true,
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
        },
      },
      {
        id: "step-2",
        type: "stepNode",
        position: { x: 280, y: 60 },
        data: {
          stepNumber: "02",
          title: dict.howItWorks.step2Title,
          description: dict.howItWorks.step2Desc,
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
        },
      },
      {
        id: "step-3",
        type: "stepNode",
        position: { x: 560, y: 60 },
        data: {
          stepNumber: "03",
          title: dict.howItWorks.step3Title,
          description: dict.howItWorks.step3Desc,
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
        },
      },
      {
        id: "step-4",
        type: "stepNode",
        position: { x: 840, y: 60 },
        data: {
          stepNumber: "04",
          title: dict.howItWorks.step4Title,
          description: dict.howItWorks.step4Desc,
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
        },
      },
      {
        id: "step-5",
        type: "stepNode",
        position: { x: 1120, y: 60 },
        data: {
          stepNumber: "05",
          title: dict.howItWorks.step5Title,
          description: dict.howItWorks.step5Desc,
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
        },
      },
      {
        id: "step-6",
        type: "stepNode",
        position: { x: 1400, y: 60 },
        data: {
          stepNumber: "06",
          title: dict.howItWorks.step6Title,
          description: dict.howItWorks.step6Desc,
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
        },
      },
      {
        id: "step-7",
        type: "stepNode",
        position: { x: 1680, y: 60 },
        data: {
          stepNumber: "07",
          title: dict.howItWorks.step7Title,
          description: dict.howItWorks.step7Desc,
          isEnd: true,
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
        },
      },
    ],
    [dict]
  );

  const edges: Edge[] = useMemo(
    () => [
      {
        id: "e1-2",
        source: "step-1",
        target: "step-2",
        animated: true,
        style: { stroke: "#5B5CE2", strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#5B5CE2" },
      },
      {
        id: "e2-3",
        source: "step-2",
        target: "step-3",
        animated: true,
        style: { stroke: "#5B5CE2", strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#5B5CE2" },
      },
      {
        id: "e3-4",
        source: "step-3",
        target: "step-4",
        animated: true,
        style: { stroke: "#5B5CE2", strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#5B5CE2" },
      },
      {
        id: "e4-5",
        source: "step-4",
        target: "step-5",
        animated: true,
        style: { stroke: "#5B5CE2", strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#5B5CE2" },
      },
      {
        id: "e5-6",
        source: "step-5",
        target: "step-6",
        animated: true,
        style: { stroke: "#5B5CE2", strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#5B5CE2" },
      },
      {
        id: "e6-7",
        source: "step-6",
        target: "step-7",
        animated: true,
        style: { stroke: "#5B5CE2", strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#5B5CE2" },
      },
    ],
    []
  );

  return (
    <section className="py-12 space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto">
        <div className="space-y-3 max-w-2xl">
          <Badge variant="default" className="px-3 py-1 text-xs">
            {dict.howItWorks.badge}
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {dict.howItWorks.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {dict.howItWorks.subtitle}
          </p>
        </div>

        {/* View Switcher Button */}
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1 shadow-xs self-start md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("flow")}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === "flow"
                ? "bg-[#5B5CE2] text-white dark:bg-[#7C7EF2] shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Workflow className="h-4 w-4" />
            <span>Flow</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === "grid"
                ? "bg-[#5B5CE2] text-white dark:bg-[#7C7EF2] shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Grid2X2 className="h-4 w-4" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Interactive React Flow Diagram */}
      {viewMode === "flow" ? (
        <div className="relative h-[320px] w-full rounded-3xl border border-border bg-card shadow-xs overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.3}
            maxZoom={1.5}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
            <Controls className="!bg-background !border-border !shadow-md !rounded-xl overflow-hidden" />
          </ReactFlow>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nodes.map((node) => {
            const data = node.data as {
              stepNumber: string;
              title: string;
              description: string;
            };
            return (
              <div
                key={node.id}
                className="rounded-2xl border border-border bg-card p-6 space-y-3 relative overflow-hidden"
              >
                <div className="text-4xl font-black text-[#5B5CE2]/20 dark:text-[#7C7EF2]/25 font-mono">
                  {data.stepNumber}
                </div>
                <h3 className="text-lg font-bold text-foreground">{data.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{data.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
