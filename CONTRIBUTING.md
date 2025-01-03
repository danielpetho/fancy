# Contributing

Hi! Nice to have you here! :)

First of all, huge thanks for your interest in contributing to fancycomponents.dev!

Please take a moment to review this document before submitting your first pull request. Please also check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [daniel](https://x.com/nonzeroexitcode), or open an issue.

## Stack

- Tailwind CSS for styling the components.
- Motion (formerly Framer Motion) for animations. Please use the latest version.
- React 18 (React 19 is not supported yet).
- MDX for the documentation.
- Next.js for the website.
- Contentful for the CMS.

## Structure

This repository is structured as follows:

```
src
├── app
├── components
├── content
└── fancy
    ├── components
    └── examples
```

| Path                  | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| `src/app`             | The Next.js application for the website.                           |
| `src/components`      | The React components for the website (excluding fancy components). |
| `src/content`         | The content and component documentations for the website.          |
| `src/fancy`           | The registry, source code, and demos for the fancy components.     |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/fancy.git
```

### Navigate to project directory

```bash
cd fancy
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
npm install
```

The project uses Contentful as a CMS, from where we fetch some component data. Namely: thumbnail and video demo URLs. These URLs are used as sources in the landing page, and for the og:image meta on each component page.

As of now, the environemnt variables aren't available publicly, therefore the landing page will not work. We will create a workaround for this soon.

## Components

Before you add a component, please make sure to review and understand the [Acceptance Criteria](./ACCEPTANCE_CRITERIA.md).

If you think your component is a good fit, read on.

### 1. Component source

1. Navigate to the `src/content/docs/components` directory. This directory divides the components into different categories, such as `text`, `background`, `blocks`, etc. This is somewhat an arbitrary decision, but it helps us organize the components better. Choose one category, or create a new one if you think it's appropriate.
2. Create the component inside the chosen folder. Make sure to use the correct [tech stack](./ACCEPTANCE_CRITERIA.md#stack). Comments are appreciated, but not required.
3. If you're using new dependencies, feel free to install them in the `package.json` file. 
4. If you're using new hooks, please add them to the `src/hooks` directory.

### 2. Component demo(s)

1. Navigate to the `src/fancy/examples` directory.
2. In the same category folder as the component source, create a new file for the component demo. The file name should be the component name in kebab-case, ideally followed by `-demo`. If applicable, you can create multiple demos and examples, showing different use cases or variations of the component.

### 3. Generate source

1. Run `npm run generate`. This will run a script which will generate the source files for the component documentation, as well as the registry index file. You don't need to worry about what's inside (hopefully), but this is definitely needed, otherwise you can't reference the component in the documentation.

### 4. Component documentation

1. Navigate to the `src/content/docs/components` directory.
2. In the same category folder as the component source, create a new `.mdx` file for the documentation.
3. In the component header, add a title, description.
4. Also add yourself as the author (and others, if there are multiple ones) in a markdown format, ideally with a link to your website or other profile. It expects the following format: `author: "[author_1](https://x.com/author_1), [author_2](https://x.com/author_2)"`. Please, ensure that it's a string, either in single or double quotes.

An example of a component header:

```mdx
---
title: Letter Swap Hover
description: A text component that swaps the letters vertically on hover.
component: true
author: "[johndoe](https://example.com)"
---
```

5. The first node after the header should be a `ComponentPreview` component, which will render the main demo of the component.
6. Then, a header called `Source code` and the source code of the component referenced in a `ComponentSource` component.
7. If the component uses hooks, or need to add other dependencies, make sure to include them in that section, in a `CodeBlockWrapper` component.
8. Add an `Usage` and/or `Understanding the component` section, if applicable.
9. Add an `Examples` section, if applicable.
10. Add a `Notes` section, if applicable.
11. Add a `Props` section. Please use the `Table` components for this.
12. Add an `Credits` section, if applicable. Make sure to also include the credits under each demo, if applicable.

Please, have a look at an [existing component](./src/content/docs/components/blocks/circling-elements.mdx) for reference.

When you're done and ready to submit your PR, please create a quick recording of your work, and upload it to the PR description. It will help us to speed up the review process.

That's it, you're done!

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new components

If you have a request for a new component, please open a discussion on GitHub. We'll be happy to help you out.