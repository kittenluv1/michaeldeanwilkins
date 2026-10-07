"use client";

import { createElement, useEffect, useRef, useState } from "react";

const MODEL_VIEWER_SCRIPT =
  "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";

export default function ObjectDemo() {
  const viewerRef = useRef<HTMLElement>(null);
  const [loadingState, setLoadingState] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    const handleLoad = () => setLoadingState("ready");
    const handleError = () => setLoadingState("error");

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${MODEL_VIEWER_SCRIPT}"]`,
    );

    if (!script) {
      script = document.createElement("script");
      script.type = "module";
      script.src = MODEL_VIEWER_SCRIPT;
      document.head.appendChild(script);
    }

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col gap-5 px-6 py-12 md:px-10">
      <div>
        <h1 className="text-3xl">Object Demo</h1>
        <p className="mt-2 text-lg">
          Drag to rotate the object around its y-axis.
        </p>
      </div>
      <div
        className="relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-sm bg-[#f5f3ef]"
        aria-label="Interactive 3D model viewer"
      >
        {createElement("model-viewer", {
          ref: viewerRef,
          src: "/obj/Extract7.glb",
          alt: "Interactive 3D model",
          "camera-controls": true,
          "auto-rotate": true,
          "shadow-intensity": "1",
          "camera-orbit": "0deg 90deg auto",
          "touch-action": "pan-y",
          className: "h-full w-full",
        })}
        {loadingState === "loading" && (
          <p className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            Loading model...
          </p>
        )}
        {loadingState === "error" && (
          <p className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            Unable to load the model.
          </p>
        )}
      </div>
    </section>
  );
}
