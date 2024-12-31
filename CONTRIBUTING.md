# Contributing

Thanks for your interest in contributing to fancycomponents.dev!

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
| `src/fancy`           | The registry for the fancy components.                             |

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

- Navigate to the `src/content/docs/components` directory. This directory divides the components into different categories, such as `text`, `background`, `blocks`, etc. This is somewhat an arbitrary decision, but it helps us organize the components better. Choose one category, or create a new one if you think it's appropriate.
- Create the component inside the chosen folder. Make sure to use the correct [tech stack](./ACCEPTANCE_CRITERIA.md#stack). Comments are appreciated, but not required.
- If you're using new dependencies, feel free to install them in the `package.json` file. 
- If you're using new hooks, please add them to the `src/hooks` directory.

### 2. Component demo(s)

- Navigate to the `src/fancy/examples` directory.
- In the same category folder as the component source, create a new file for the component demo. The file name should be the component name in kebab-case, ideally followed by `-demo`. If applicable, you can create multiple demos and examples, showing different use cases or variations of the component.

### 3. Generate source

- Run `npm run generate` to generate the source files for the component. This will run a script which will generate the source files for the component, as well as the registry index file. You don't need to worry about this, it's done automatically.

### 4. Component documentation

- Navigate to the `src/content/docs/components` directory.
- In the same category folder as the component source, create a new `.mdx` file for the documentation.
- tbd... add author
- The first node of the `.mdx` file should be a `ComponentPreview` component, which will render the main demo of the component.
- Then, a header called `Source code` and 



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