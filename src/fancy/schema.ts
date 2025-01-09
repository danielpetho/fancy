import * as z from "zod"

export const registrySchema = z.record(
  z.string(),
  z.object({
    name: z.string(),
    dependencies: z.array(z.string()).optional(), // external dependencies. inferred from the import statements, and fetched from the addition .json file next to the component .tsx file
    devDependencies: z.array(z.string()).optional(), // dev dependencies. fetched from the addition .json file next to the component .tsx file
    registryDependencies: z.array(z.string()).optional(), // other component dependencies
    files: z.array(z.object({
      path: z.string(),
      type: z.enum(["registry:ui", "registry:example", "registry:hook" , "registry:lib"]),
    })),
    type: z.enum(["registry:ui", "registry:example", "registry:hook" , "registry:lib"]),
    component: z.function().args(z.any()).returns(z.any()).optional(), // lazy loading component for the documentation page. Not part of the output .json file
  })
)

export type Registry = z.infer<typeof registrySchema>
