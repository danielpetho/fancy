# Acceptance Criteria for Fancy Components

Hey there! Before you start working on a new component, please review these guidelines carefully.

There are many excellent component libraries available on GitHub (such as https://github.com/magicuidesign/magic-ui) which might worth checking and contributing to. Fancy Components aims to take a different approach by creating and collecting more unconventional components and microinteractions that prioritize creativity and experimentation over pure utility. Browse through the catalog to get an idea of what we're aiming for. If you're unsure whether your component idea aligns with this direction, feel free to reach out for discussion.

## Credits

Please, avoid 1:1 copying other people's work. Re-creating the concept itself is perfectly fine, but please, package it in new way for the demo. For widely implemented concepts (like common hover effects for example), tracing the original creator is unlikely anyway, and isn't necessary. However, if your component is inspired by or based on someone's specific work, please give proper attribution.

Credits should be included at the bottom of the component's documentation page and under the respective showcase demo. You will also be credited as the author at the top of the page.

Please note that components with 1:1 copy, or without proper attribution may be rejected. Additionally, we reserve the right to remove components post-merge if an original creator makes a valid claim.

The same applies for the source code of the component.

## Stack

Components should be built using:
- React 18 (React 19 support planned for future)
- TypeScript
- Tailwind CSS
- Motion (use the latest `motion` package, and not `framer-motion`)

## Performance

The component should be reasonably performant. A few tips:
- Utilize MotionValues from `motion` where applicable
- Prefer `useAnimationFrame` hook from `motion` over `useEffect` for animations
- Minimize unnecessary re-renders

For performance testing, we recommend using [react-scan](https://github.com/aidenybai/react-scan).

## Accessibility

There is still much to be done in this regard across already implemented components. But please, try to implement these basic practices:
- Use Tailwind's `sr-only` class for screen reader content
- Apply `aria-hidden` to decorative elements
- Reference the text components for basic accessibility implementation examples

## Demo

Each component requires at least one demo showcasing the component in action. While we provide color classes in [tailwind.config.ts](./tailwind.config.ts) for site consistency, creative freedom is encouraged. You can go wild and can take the 'edgy' graphic-designer direction as well, the main point is to create visually engaging demos that work well across all viewport sizes.

## Documentation

You should provide a documentation page for the component, which should include:
- Clear usage instructions
- Understanding the component section (for non-obvious implementations)
- Examples of how to use the component in different scenarios, or with different props
- Notes on limitations or caveats, if applicable
- Complete props documentation
- Attribution where applicable

If you're not sure if the component will met these requirements, feel free to reach out to daniel on [x](https://x.com/nonzeroexitcode), via email at hello@danielpetho.com, or open an issue.