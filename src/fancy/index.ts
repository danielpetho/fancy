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
  "drag-elements-demo": {
    name: "drag-elements-demo",
    type: "components:example",
    files: ["@/fancy/examples/drag-elements-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/drag-elements-demo")
    )
  },
  "menu-variant-1-demo": {
    name: "menu-variant-1-demo",
    type: "components:example",
    files: ["@/fancy/examples/menu-variant-1-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/menu-variant-1-demo")
    ),
  }
}

export const registry = {
  ...fancy,
  ...example,
};