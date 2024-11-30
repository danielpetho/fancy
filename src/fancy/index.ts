import * as React from "react";
import { Registry } from "@/fancy/schema";

const fancy: Registry = {
  "animated-gradient": {
    "name": "animated-gradient",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/background/animated-gradient.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/background/animated-gradient'))
  },
  "pixel-trail": {
    "name": "pixel-trail",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/background/pixel-trail.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/background/pixel-trail'))
  },
  "circling-elements": {
    "name": "circling-elements",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/blocks/circling-elements.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/blocks/circling-elements'))
  },
  "drag-elements": {
    "name": "drag-elements",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/blocks/drag-elements.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/blocks/drag-elements'))
  },
  "screensaver": {
    "name": "screensaver",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/blocks/screensaver.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/blocks/screensaver'))
  },
  "floating": {
    "name": "floating",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/image/floating.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/image/floating'))
  },
  "image-trail": {
    "name": "image-trail",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/image/image-trail.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/image/image-trail'))
  },
  "elastic-line": {
    "name": "elastic-line",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/physics/elastic-line.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/physics/elastic-line'))
  },
  "gravity": {
    "name": "gravity",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/physics/gravity.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/physics/gravity'))
  },
  "basic-number-ticker": {
    "name": "basic-number-ticker",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/basic-number-ticker.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/basic-number-ticker'))
  },
  "basic-word-rotate": {
    "name": "basic-word-rotate",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/basic-word-rotate.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/basic-word-rotate'))
  },
  "breathing-text": {
    "name": "breathing-text",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/breathing-text.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/breathing-text'))
  },
  "letter-swap-forward-anim": {
    "name": "letter-swap-forward-anim",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/letter-swap-forward-anim.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/letter-swap-forward-anim'))
  },
  "letter-swap-pingpong-anim": {
    "name": "letter-swap-pingpong-anim",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/letter-swap-pingpong-anim.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/letter-swap-pingpong-anim'))
  },
  "random-letter-swap-forward-anim": {
    "name": "random-letter-swap-forward-anim",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/random-letter-swap-forward-anim.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/random-letter-swap-forward-anim'))
  },
  "random-letter-swap-pingpong-anim": {
    "name": "random-letter-swap-pingpong-anim",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/random-letter-swap-pingpong-anim.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/random-letter-swap-pingpong-anim'))
  },
  "scramble-hover": {
    "name": "scramble-hover",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/scramble-hover.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/scramble-hover'))
  },
  "scramble-in": {
    "name": "scramble-in",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/scramble-in.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/scramble-in'))
  },
  "scroll-and-swap-text": {
    "name": "scroll-and-swap-text",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/scroll-and-swap-text.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/scroll-and-swap-text'))
  },
  "typewriter": {
    "name": "typewriter",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/typewriter.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/typewriter'))
  },
  "underline-center": {
    "name": "underline-center",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/underline-center.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/underline-center'))
  },
  "underline-comes-in-goes-out": {
    "name": "underline-comes-in-goes-out",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/underline-comes-in-goes-out.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/underline-comes-in-goes-out'))
  },
  "underline-goes-out-comes-in": {
    "name": "underline-goes-out-comes-in",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/underline-goes-out-comes-in.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/underline-goes-out-comes-in'))
  },
  "underline-to-background": {
    "name": "underline-to-background",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/underline-to-background.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/underline-to-background'))
  },
  "variable-font-and-cursor": {
    "name": "variable-font-and-cursor",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/variable-font-and-cursor.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/variable-font-and-cursor'))
  },
  "variable-font-hover-by-letter": {
    "name": "variable-font-hover-by-letter",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/variable-font-hover-by-letter.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/variable-font-hover-by-letter'))
  },
  "variable-font-hover-by-random-letter": {
    "name": "variable-font-hover-by-random-letter",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/variable-font-hover-by-random-letter.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/variable-font-hover-by-random-letter'))
  },
  "vertical-cut-reveal": {
    "name": "vertical-cut-reveal",
    "type": "components:fancy",
    "files": [
      "@/fancy/components/text/vertical-cut-reveal.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/components/text/vertical-cut-reveal'))
  },
};

const example: Registry = {
  "animated-gradient-demo": {
    "name": "animated-gradient-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/background/animated-gradient-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/background/animated-gradient-demo'))
  },
  "pixel-trail-custom-pixel-demo": {
    "name": "pixel-trail-custom-pixel-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/background/pixel-trail-custom-pixel-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/background/pixel-trail-custom-pixel-demo'))
  },
  "pixel-trail-demo": {
    "name": "pixel-trail-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/background/pixel-trail-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/background/pixel-trail-demo'))
  },
  "pixel-trail-no-fade-demo": {
    "name": "pixel-trail-no-fade-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/background/pixel-trail-no-fade-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/background/pixel-trail-no-fade-demo'))
  },
  "circling-elements-demo": {
    "name": "circling-elements-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/blocks/circling-elements-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/blocks/circling-elements-demo'))
  },
  "drag-elements-demo": {
    "name": "drag-elements-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/blocks/drag-elements-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/blocks/drag-elements-demo'))
  },
  "drag-elements-momentum-demo": {
    "name": "drag-elements-momentum-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/blocks/drag-elements-momentum-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/blocks/drag-elements-momentum-demo'))
  },
  "screensaver-demo": {
    "name": "screensaver-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/blocks/screensaver-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/blocks/screensaver-demo'))
  },
  "sticky-footer-demo": {
    "name": "sticky-footer-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/blocks/sticky-footer-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/blocks/sticky-footer-demo'))
  },
  "floating-demo": {
    "name": "floating-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/image/floating-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/image/floating-demo'))
  },
  "image-trail-demo": {
    "name": "image-trail-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/image/image-trail-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/image/image-trail-demo'))
  },
  "elastic-line-demo": {
    "name": "elastic-line-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/physics/elastic-line-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/physics/elastic-line-demo'))
  },
  "gravity-body-types-demo": {
    "name": "gravity-body-types-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/physics/gravity-body-types-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/physics/gravity-body-types-demo'))
  },
  "gravity-demo": {
    "name": "gravity-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/physics/gravity-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/physics/gravity-demo'))
  },
  "gravity-non-draggable-demo": {
    "name": "gravity-non-draggable-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/physics/gravity-non-draggable-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/physics/gravity-non-draggable-demo'))
  },
  "gravity-start-demo": {
    "name": "gravity-start-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/physics/gravity-start-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/physics/gravity-start-demo'))
  },
  "gravity-svg-bodies-demo": {
    "name": "gravity-svg-bodies-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/physics/gravity-svg-bodies-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/physics/gravity-svg-bodies-demo'))
  },
  "basic-number-ticker-demo": {
    "name": "basic-number-ticker-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/basic-number-ticker-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/basic-number-ticker-demo'))
  },
  "basic-word-rotate-demo": {
    "name": "basic-word-rotate-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/basic-word-rotate-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/basic-word-rotate-demo'))
  },
  "breathing-text-demo": {
    "name": "breathing-text-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/breathing-text-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/breathing-text-demo'))
  },
  "fancy-basic-number-ticker-demo": {
    "name": "fancy-basic-number-ticker-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/fancy-basic-number-ticker-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/fancy-basic-number-ticker-demo'))
  },
  "letter-swap-demo-line": {
    "name": "letter-swap-demo-line",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/letter-swap-demo-line.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/letter-swap-demo-line'))
  },
  "letter-swap-demo-stagger": {
    "name": "letter-swap-demo-stagger",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/letter-swap-demo-stagger.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/letter-swap-demo-stagger'))
  },
  "letter-swap-demo": {
    "name": "letter-swap-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/letter-swap-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/letter-swap-demo'))
  },
  "random-letter-swap-demo": {
    "name": "random-letter-swap-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/random-letter-swap-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/random-letter-swap-demo'))
  },
  "scramble-hover-demo": {
    "name": "scramble-hover-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/scramble-hover-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/scramble-hover-demo'))
  },
  "scramble-hover-diff-class-demo": {
    "name": "scramble-hover-diff-class-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/scramble-hover-diff-class-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/scramble-hover-diff-class-demo'))
  },
  "scramble-hover-new-chars-demo": {
    "name": "scramble-hover-new-chars-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/scramble-hover-new-chars-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/scramble-hover-new-chars-demo'))
  },
  "scramble-hover-sequential-demo": {
    "name": "scramble-hover-sequential-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/scramble-hover-sequential-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/scramble-hover-sequential-demo'))
  },
  "scramble-in-demo": {
    "name": "scramble-in-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/scramble-in-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/scramble-in-demo'))
  },
  "scroll-and-swap-text-demo": {
    "name": "scroll-and-swap-text-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/scroll-and-swap-text-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/scroll-and-swap-text-demo'))
  },
  "typewriter-demo": {
    "name": "typewriter-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/typewriter-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/typewriter-demo'))
  },
  "underline-demo": {
    "name": "underline-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/underline-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/underline-demo'))
  },
  "underline-to-background-demo": {
    "name": "underline-to-background-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/underline-to-background-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/underline-to-background-demo'))
  },
  "variable-font-and-cursor-demo": {
    "name": "variable-font-and-cursor-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/variable-font-and-cursor-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/variable-font-and-cursor-demo'))
  },
  "variable-font-hover-by-letter-demo": {
    "name": "variable-font-hover-by-letter-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/variable-font-hover-by-letter-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/variable-font-hover-by-letter-demo'))
  },
  "variable-font-hover-by-random-letter-demo": {
    "name": "variable-font-hover-by-random-letter-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/variable-font-hover-by-random-letter-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/variable-font-hover-by-random-letter-demo'))
  },
  "vertical-cut-reveal-demo": {
    "name": "vertical-cut-reveal-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/vertical-cut-reveal-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/vertical-cut-reveal-demo'))
  },
  "vertical-cut-reveal-letter-random-demo": {
    "name": "vertical-cut-reveal-letter-random-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/vertical-cut-reveal-letter-random-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/vertical-cut-reveal-letter-random-demo'))
  },
  "vertical-cut-reveal-line-demo": {
    "name": "vertical-cut-reveal-line-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/vertical-cut-reveal-line-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/vertical-cut-reveal-line-demo'))
  },
  "vertical-cut-reveal-scroll-demo": {
    "name": "vertical-cut-reveal-scroll-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/vertical-cut-reveal-scroll-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/vertical-cut-reveal-scroll-demo'))
  },
  "vertical-cut-reveal-stagger-demo": {
    "name": "vertical-cut-reveal-stagger-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/vertical-cut-reveal-stagger-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/vertical-cut-reveal-stagger-demo'))
  },
  "vertical-cut-reveal-word-demo": {
    "name": "vertical-cut-reveal-word-demo",
    "type": "components:example",
    "files": [
      "@/fancy/examples/text/vertical-cut-reveal-word-demo.tsx"
    ],
    component: React.lazy(
      () => import('@/fancy/examples/text/vertical-cut-reveal-word-demo'))
  }
};

export const registry = {
  ...fancy,
  ...example,
};
