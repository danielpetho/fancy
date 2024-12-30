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