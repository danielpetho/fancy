import * as React from "react"

const components = {
  "text": {
    "underline": {
      name: "underline",
      type: "component/text",
      component: React.lazy(() => import("@/fancy/components/text/underline")),
    }
  }
}

export default components