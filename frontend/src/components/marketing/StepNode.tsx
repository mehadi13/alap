"use client";

import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/utils";
import {
  MessageSquarePlus,
  PhoneCall,
  MapPin,
  DraftingCompass,
  FileCheck2,
  Code2,
  Rocket,
} from "lucide-react";

const iconMap = {
  "01": MessageSquarePlus,
  "02": PhoneCall,
  "03": MapPin,
  "04": DraftingCompass,
  "05": FileCheck2,
  "06": Code2,
  "07": Rocket,
};

interface StepNodeProps {
  data: {
    stepNumber: "01" | "02" | "03" | "04" | "05" | "06" | "07";
    title: string;
    description: string;
    isStart?: boolean;
    isEnd?: boolean;
    targetPosition?: Position;
    sourcePosition?: Position;
  };
  selected?: boolean;
}

export const StepNode = memo(({ data, selected }: StepNodeProps) => {
  const IconComp = iconMap[data.stepNumber] || MessageSquarePlus;
  const targetPos = data.targetPosition || Position.Left;
  const sourcePos = data.sourcePosition || Position.Right;

  return (
    <div
      className={cn(
        "group relative w-[230px] rounded-2xl border border-[#E5E5E5] bg-[#F8F8F8] p-5 shadow-xs transition-all duration-300 dark:border-[#292929] dark:bg-[#141414]",
        selected && "border-[#5B5CE2] ring-2 ring-[#5B5CE2]/30 dark:border-[#7C7EF2] dark:ring-[#7C7EF2]/30",
        data.isStart && "border-[#5B5CE2]/50 dark:border-[#7C7EF2]/50 shadow-md shadow-[#5B5CE2]/10",
        data.isEnd && "border-emerald-500/50 dark:border-emerald-500/50 shadow-md shadow-emerald-500/10"
      )}
    >
      {/* Target Handle */}
      {!data.isStart && (
        <Handle
          type="target"
          position={targetPos}
          className="!h-3.5 !w-3.5 !border-2 !border-[#FFFFFF] !bg-[#5B5CE2] dark:!border-[#0A0A0A] dark:!bg-[#7C7EF2]"
        />
      )}

      {/* Node Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/15 dark:text-[#7C7EF2] border border-[#5B5CE2]/20 dark:border-[#7C7EF2]/30">
            <IconComp className="h-4 w-4" />
          </div>
          <span className="text-xs font-mono font-bold text-[#5B5CE2] dark:text-[#7C7EF2]">
            STEP {data.stepNumber}
          </span>
        </div>
        {data.isStart && (
          <span className="inline-flex rounded-full bg-[#5B5CE2]/10 px-2 py-0.5 text-[10px] font-semibold text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2]">
            Start
          </span>
        )}
        {data.isEnd && (
          <span className="inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            Launch
          </span>
        )}
      </div>

      {/* Title & Description */}
      <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5] mb-1 leading-snug">
        {data.title}
      </h4>
      <p className="text-xs text-[#6B6B6B] dark:text-[#A3A3A3] leading-relaxed">
        {data.description}
      </p>

      {/* Source Handle */}
      {!data.isEnd && (
        <Handle
          type="source"
          position={sourcePos}
          className="!h-3.5 !w-3.5 !border-2 !border-[#FFFFFF] !bg-[#5B5CE2] dark:!border-[#0A0A0A] dark:!bg-[#7C7EF2]"
        />
      )}
    </div>
  );
});

StepNode.displayName = "StepNode";
