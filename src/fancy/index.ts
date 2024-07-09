import * as React from "react";

import { Registry } from "@/fancy/schema";

const fancy: Registry = {
  "vertical-hover-text-forward-animation": {
    name: "vertical-hover-by-letter-forward-animation",
    type: "components:fancy",
    files: ["@/fancy/components/text/vertical-hover-text-forward-anim.tsx"]
  },
  "vertical-hover-text-pingpong-animation": {
    name: "vertical-hover-by-letter-pingpong-animation",
    type: "components:fancy",
    files: ["@/fancy/components/text/vertical-hover-text-pingpong-anim.tsx"]
  },
  "vertical-hover-text-by-random-letter-forward-animation": {
    name: "vertical-hover-text-by-random-letter-forward-animation",
    type: "components:fancy",
    files: ["@/fancy/components/text/vertical-hover-text-by-random-letter-forward-anim.tsx"]
  },
  "vertical-hover-text-by-random-letter-pingpong-animation": {
    name: "vertical-hover-text-by-random-letter-pingpong-animation",
    type: "components:fancy",
    files: ["@/fancy/components/text/vertical-hover-text-by-random-letter-pingpong-anim.tsx"]
  }
}

const example: Registry = {
  "vertical-hover-demo": {
    name: "vertical-hover-demo",
    type: "components:example",
    files: ["@/fancy/examples/vertical-hover-demo.tsx"],
    component: React.lazy(
      () => import("@/fancy/examples/vertical-hover-demo")
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