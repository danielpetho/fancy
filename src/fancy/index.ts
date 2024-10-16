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
  "slot-number-ticker": {
    name: "slot-number-ticker",
    type: "components:fancy",
    files: ["@/fancy/components/text/slot-number-ticker.tsx"]
  },
  "expanding-menu": {
    name: "expanding-menu",
    type: "components:fancy",
    files: ["@/fancy/components/menu/expanding-menu.tsx"]
  }
}

const example: Registry = {
  "letter-swap-demo": {
    name: "letter-swap-demo",
    type: "components:example",
    files: ["@/fancy/examples/letter-swap-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/letter-swap-demo")
    ),
  },
  "letter-swap-demo-stagger": {
    name: "letter-swap-demo-stagger",
    type: "components:example",
    files: ["@/fancy/examples/letter-swap-demo-stagger.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/letter-swap-demo-stagger")
    ),
  },
  "letter-swap-demo-line": {
    name: "letter-swap-demo-line",
    type: "components:example",
    files: ["@/fancy/examples/letter-swap-demo-line.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/letter-swap-demo-line")
    ),
  },
  "random-letter-swap-demo": {
    name: "random-letter-swap-demo",
    type: "components:example",
    files: ["@/fancy/examples/random-letter-swap-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/random-letter-swap-demo")
    )
  },
  "underline-demo": {
    name: "underline-demo",
    type: "components:example",
    files: ["@/fancy/examples/underline-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/underline-demo")
    )
  },
  "underline-to-background-demo": {
    name: "underline-to-background-demo",
    type: "components:example",
    files: ["@/fancy/examples/underline-to-background-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/underline-to-background-demo")
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
    files: ["@/fancy/examples/pixel-trail-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/pixel-trail-demo")
    )
  },
  "pixel-trail-no-fade-demo": {
    name: "pixel-trail-no-fade-demo",
    type: "components:example",
    files: ["@/fancy/examples/pixel-trail-no-fade-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/pixel-trail-no-fade-demo")
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
  "slot-number-ticker-demo": {
    name: "slot-number-ticker-demo",
    type: "components:example",
    files: ["@/fancy/examples/slot-number-ticker-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/slot-number-ticker-demo")
    )
  },
  "expanding-menu-demo": {
    name: "menu-variant-1-demo",
    type: "components:example",
    files: ["@/fancy/examples/expanding-menu.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/expanding-menu-demo")
    ),
  }
}

export const registry = {
  ...fancy,
  ...example,
};