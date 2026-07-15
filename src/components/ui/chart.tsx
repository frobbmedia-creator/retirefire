"use client";

import { useId, useMemo } from "react";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

export type ChartSeries = {
  year: number;
  portfolio: number;
  contributions?: number;
};

type GrowthChartProps = {
  data: ChartSeries[];
  /** Optional horizontal target line */
  target?: number;
  targetLabel?: string;
  className?: string;
  height?: number;
};

/**
 * Lightweight SVG area/line chart — no chart library dependency.
 */
export function GrowthChart({
  data,
  target,
  targetLabel = "Target",
  className,
  height = 200,
}: GrowthChartProps) {
  const gradId = useId();

  const { path, area, targetY, maxY, width, pad } = useMemo(() => {
    const pad = { t: 12, r: 12, b: 28, l: 8 };
    const width = 600;
    const h = height;
    const innerW = width - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;

    if (!data.length) {
      return { path: "", area: "", targetY: null as number | null, maxY: 0, width, pad };
    }

    const maxPortfolio = Math.max(
      ...data.map((d) => d.portfolio),
      target ?? 0,
      1,
    );
    const maxY = maxPortfolio * 1.05;
    const maxX = Math.max(data[data.length - 1].year, 1);

    const x = (year: number) => pad.l + (year / maxX) * innerW;
    const y = (v: number) => pad.t + innerH - (v / maxY) * innerH;

    const pts = data.map((d) => `${x(d.year)},${y(d.portfolio)}`);
    const path = `M ${pts.join(" L ")}`;
    const last = data[data.length - 1];
    const first = data[0];
    const area = `${path} L ${x(last.year)},${y(0)} L ${x(first.year)},${y(0)} Z`;
    const targetY = target != null ? y(target) : null;

    return { path, area, targetY, maxY, width, pad };
  }, [data, target, height]);

  if (!data.length) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-zinc-950/50 text-sm text-zinc-600 ring-1 ring-zinc-800",
          className,
        )}
        style={{ height }}
      >
        No projection data
      </div>
    );
  }

  const last = data[data.length - 1];
  const endYear = last.year;

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Portfolio growth chart over ${endYear} years, ending at ${formatCurrency(last.portfolio)}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(52, 211, 153)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(52, 211, 153)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((f) => {
          const y = pad.t + (height - pad.t - pad.b) * (1 - f);
          return (
            <line
              key={f}
              x1={pad.l}
              x2={width - pad.r}
              y1={y}
              y2={y}
              stroke="rgb(39, 39, 42)"
              strokeWidth="1"
            />
          );
        })}

        {targetY != null && (
          <g>
            <line
              x1={pad.l}
              x2={width - pad.r}
              y1={targetY}
              y2={targetY}
              stroke="rgb(251, 191, 36)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <text
              x={width - pad.r}
              y={targetY - 6}
              textAnchor="end"
              className="fill-amber-400"
              fontSize="11"
            >
              {targetLabel}
            </text>
          </g>
        )}

        <path d={area} fill={`url(#${gradId})`} />
        <path
          d={path}
          fill="none"
          stroke="rgb(52, 211, 153)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* End dot */}
        <circle
          cx={
            pad.l +
            (last.year / Math.max(endYear, 1)) * (width - pad.l - pad.r)
          }
          cy={
            pad.t +
            (height - pad.t - pad.b) -
            (last.portfolio / maxY) * (height - pad.t - pad.b)
          }
          r="4"
          fill="rgb(52, 211, 153)"
        />

        <text
          x={pad.l}
          y={height - 8}
          className="fill-zinc-500"
          fontSize="11"
        >
          Year 0
        </text>
        <text
          x={width - pad.r}
          y={height - 8}
          textAnchor="end"
          className="fill-zinc-500"
          fontSize="11"
        >
          Year {endYear}
        </text>
      </svg>
      <div className="mt-1 flex justify-between text-xs text-zinc-500">
        <span>Start {formatCurrency(data[0].portfolio)}</span>
        <span className="text-emerald-400/90">
          End {formatCurrency(last.portfolio)}
        </span>
      </div>
    </div>
  );
}
