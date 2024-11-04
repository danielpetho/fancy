import * as React from "react";

import { Registry } from "@/fancy/schema";

const fancy: Registry = {
  "letter-swap-forward-animation": {
    name: "letter-swap-forward-animation",
    type: "components:fancy",
    files: ["@/fancy/components/text/letter-swap-text-forward-anim.tsx"]
  },
  "letter-swap-pingpong-animation": {
    name: "letter-swap-pingpong-animation",
    type: "components:fancy",
    files: ["@/fancy/components/text/letter-swap-pingpong-anim.tsx"]
  },
  "letter-swap-text-by-random-letter-forward-animation": {
    name: "letter-swap-text-by-random-letter-forward-animation",
    type: "components:fancy",
    files: ["@/fancy/components/text/random-letter-swap-forward-anim.tsx"]
  },
  "letter-swap-text-by-random-letter-pingpong-animation": {
    name: "random-letter-swap-pingpong-animation",
    type: "components:fancy",
    files: ["@/fancy/components/text/random-letter-swap-pingpong-anim.tsx"]
  },
  "scroll-and-swap-text": {
    name: "scroll-and-swap-text",
    type: "components:fancy",
    files: ["@/fancy/components/text/scroll-and-swap-text.tsx"]
  },
  "variable-font-hover-by-letter": {
    name: "variable-font-hover-by-letter",
    type: "components:fancy",
    files: ["@/fancy/components/text/variable-font-hover-by-letter.tsx"]
  },
  "variable-font-hover-by-random-letter": {
    name: "variable-font-hover-by-random-letter",
    type: "components:fancy",
    files: ["@/fancy/components/text/variable-font-hover-by-random-letter.tsx"]
  },
  "variable-font-and-cursor": {
    name: "variable-font-and-cursor",
    type: "components:fancy",
    files: ["@/fancy/components/text/variable-font-and-cursor.tsx"]
  },
  "breathing-text": {
    name: "breathing-text",
    type: "components:fancy",
    files: ["@/fancy/components/text/breathing-text.tsx"]
  },
  "typewriter": {
    name: "typewriter",
    type: "components:fancy",
    files: ["@/fancy/components/text/typewriter.tsx"]
  },
  "underline-center": {
    name: "underline-center",
    type: "components:fancy",
    files: ["@/fancy/components/text/underline-center.tsx"]
  },
  "underline-to-background": {
    name: "underline-to-background",
    type: "components:fancy",
    files: ["@/fancy/components/text/underline-to-background.tsx"]
  },
  "drag-elements": {
    name: "drag-elements",
    type: "components:fancy",
    files: ["@/fancy/components/blocks/drag-elements.tsx"]
  },
  "circling-elements": {
    name: "circling-elements",
    type: "components:fancy",
    files: ["@/fancy/components/blocks/circling-elements.tsx"]
  },
  "pixel-trail": {
    name: "pixel-trail",
    type: "components:fancy",
    files: ["@/fancy/components/background/pixel-trail.tsx"]
  },
  "animated-gradient": {
    name: "animated-gradient",
    type: "components:fancy",
    files: ["@/fancy/components/background/animated-gradient.tsx"]
  },
  "basic-number-ticker": {
    name: "basic-number-ticker",
    type: "components:fancy",
    files: ["@/fancy/components/text/basic-number-ticker.tsx"]
  },
  "elastic-line": {
    name: "elastic-line",
    type: "components:fancy",
    files: ["@/fancy/components/svg/elastic-line.tsx"]
  },
}

const example: Registry = {
  "letter-swap-demo": {
    name: "letter-swap-demo",
    type: "components:example",
    files: ["@/fancy/examples/text/letter-swap-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/letter-swap-demo")
    ),
  },
  "letter-swap-demo-stagger": {
    name: "letter-swap-demo-stagger",
    type: "components:example",
    files: ["@/fancy/examples/text/letter-swap-demo-stagger.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/letter-swap-demo-stagger")
    ),
  },
  "letter-swap-demo-line": {
    name: "letter-swap-demo-line",
    type: "components:example",
    files: ["@/fancy/examples/text/letter-swap-demo-line.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/letter-swap-demo-line")
    ),
  },
  "random-letter-swap-demo": {
    name: "random-letter-swap-demo",
    type: "components:example",
    files: ["@/fancy/examples/text/random-letter-swap-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/random-letter-swap-demo")
    )
  },
  "variable-font-hover-by-letter-demo": {
    name: "variable-font-hover-by-letter-demo",
    type: "components:example",
    files: ["@/fancy/examples/text/variable-font-hover-by-letter-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/variable-font-hover-by-letter-demo")
    )
  },
  "scroll-and-swap-text-demo": {
    name: "scroll-and-swap-text-demo",
    type: "components:example",
    files: ["@/fancy/examples/text/scroll-and-swap-text-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/scroll-and-swap-text-demo")
    )
  },
  "basic-word-rotate-demo": {
    name: "basic-word-rotate-demo",
    type: "components:example",
    files: ["@/fancy/examples/text/word-rotate-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/basic-word-rotate-demo")
    )
  },
  "variable-font-hover-by-random-letter-demo": {
    name: "variable-font-hover-by-random-letter-demo",
    type: "components:example",
    files: ["@/fancy/examples/text/variable-font-hover-by-random-letter-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/variable-font-hover-by-random-letter-demo")
    )
  },
  "variable-font-and-cursor-demo": {
    name: "variable-font-and-cursor-demo",
    type: "components:example",
    files: ["@/fancy/examples/text/variable-font-and-cursor-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/variable-font-and-cursor-demo")
    )
  },
  "breathing-text-demo": {
    name: "breathing-text-demo",
    type: "components:example",
    files: ["@/fancy/examples/text/breathing-text-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/breathing-text-demo")
    )
  },
  "typewriter-demo": {
    name: "typewriter-demo",
    type: "components:example",
    files: ["@/fancy/examples/text/typewriter-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/typewriter-demo")
    )
  },
  "underline-demo": {
    name: "underline-demo",
    type: "components:example",
    files: ["@/fancy/examples/text/underline-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/underline-demo")
    )
  },
  "underline-to-background-demo": {
    name: "underline-to-background-demo",
    type: "components:example",
    files: ["@/fancy/examples/text/underline-to-background-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/text/underline-to-background-demo")
    )
  },
  "image-trail-demo": {
    name: "image-trail-demo",
    type: "components:example",
    files: ["@/fancy/examples/image/image-trail-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/image/image-trail-demo")
    )
  },
  "drag-elements-demo": {
    name: "drag-elements-demo",
    type: "components:example",
    files: ["@/fancy/examples/drag-elements-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/drag-elements-demo")
    )
  },
  "circling-elements-demo": {
    name: "circling-elements-demo",
    type: "components:example",
    files: ["@/fancy/examples/circling-elements-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/circling-elements-demo")
    )
  },
  "pixel-trail-demo": {
    name: "pixel-trail-demo",
    type: "components:example",
    files: ["@/fancy/examples/background/pixel-trail-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/background/pixel-trail-demo")
    )
  },
  "pixel-trail-no-fade-demo": {
    name: "pixel-trail-no-fade-demo",
    type: "components:example",
    files: ["@/fancy/examples/background/pixel-trail-no-fade-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/background/pixel-trail-no-fade-demo")
    )
  },
  "animated-gradient-demo": {
    name: "animated-gradient-demo",
    type: "components:example",
    files: ["@/fancy/examples/animated-gradient-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/animated-gradient-demo")
    )
  },
  "basic-number-ticker-demo": {
    name: "basic-number-ticker-demo",
    type: "components:example",
    files: ["@/fancy/examples/basic-number-ticker-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/basic-number-ticker-demo")
    )
  },
  "fancy-basic-number-ticker-demo": {
    name: "fancy-basic-number-ticker-demo",
    type: "components:example",
    files: ["@/fancy/examples/fancy-basic-number-ticker-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/fancy-basic-number-ticker-demo")
    )
  },
  "elastic-line-demo": {
    name: "elastic-line-demo",
    type: "components:example",
    files: ["@/fancy/examples/svg/elastic-line-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/svg/elastic-line-demo")
    )
  },
}

export const registry = {
  ...fancy,
  ...example,
};