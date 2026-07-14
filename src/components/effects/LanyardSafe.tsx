import { Component, Suspense, lazy, type ReactNode } from "react";
import { FounderBadge } from "../ui/FounderBadge";

const Lanyard = lazy(() => import("./Lanyard"));

class ErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

interface LanyardSafeProps {
  name: string;
  role: string;
  bio: string;
}

/** 3D lanyard with static badge fallback (no WebGL / load error / while loading). */
export function LanyardSafe({ name, role, bio }: LanyardSafeProps) {
  const badge = <FounderBadge name={name} role={role} bio={bio} />;
  if (!webglAvailable()) return badge;
  return (
    <ErrorBoundary fallback={badge}>
      <Suspense fallback={<div className="h-full w-full" />}>
        <Lanyard name={name} role={role} />
      </Suspense>
    </ErrorBoundary>
  );
}
