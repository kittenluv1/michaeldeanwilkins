"use client";

import { createElement, useEffect, useRef, useState } from "react";
import type { ObjectType } from "@/sanity/queries/types";

const MODEL_VIEWER_SCRIPT =
  "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";

export default function ObjectViewer({ object }: { object: ObjectType }) {
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
    <section className="mx-auto w-full gap-20 px-50 pb-20 pt-12 flex justify-center">
      <div
        className="relative aspect-[3/4] w-1/2 overflow-hidden border border-[#d9d7d2] bg-[#f5f3ef]"
        aria-label="Interactive 3D model viewer"
      >
        {createElement("model-viewer", {
          ref: viewerRef,
          src: object.objectFile.asset.url,
          alt: object.altText,
          "camera-controls": true,
          "auto-rotate": true,
          "shadow-intensity": "1",
          "camera-orbit": "0deg 90deg auto",
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
      <div className="w-1/2 py-4">
        <h1 className="mb-2 text-4xl">{object.title}</h1>
        <p className="text-lg whitespace-pre-line">{object.description}</p>
      </div>
    </section>
  );
}
