import * as z from "zod"

// Schema for deeply nested tailwind config
const tailwindSchema = z.object({
  config: z.record(z.string(), z.unknown()).optional()
}).optional()

export const registrySchema = z.record(
  z.string(),
  z.object({
    name: z.string(),
    dependencies: z.array(z.string()).optional(), // external dependencies. inferred from the import statements, and fetched from the addition .json file next to the component .tsx file
    devDependencies: z.array(z.string()).optional(), // dev dependencies. fetched from the addition .json file next to the component .tsx file
    registryDependencies: z.array(z.string()).optional(), // other component dependencies
    files: z.array(z.object({
      path: z.string(),
      type: z.enum(["registry:ui", "registry:block", "registry:hook" , "registry:lib"]),
    })),
    type: z.enum(["registry:ui", "registry:block", "registry:hook" , "registry:lib"]),
    component: z.function().args(z.any()).returns(z.any()).optional(), // lazy loading component for the documentation page. Not part of the output .json file
    tailwind: tailwindSchema,
    cssVars: z.record(z.string(), z.unknown()).optional(),
    author: z.string().optional()
  })
)

export type Registry = z.infer<typeof registrySchema>
