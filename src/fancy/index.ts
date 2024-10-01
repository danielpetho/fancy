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
  "circling-elements": {
    name: "circling-elements",
    type: "components:fancy",
    files: ["@/fancy/components/blocks/circling-elements.tsx"]
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