This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This is a simple code-editor app similar to VS Code which allows you to create and edit new files.

Layout: On the left side is the file explorer and on the right is the code editor. There are different action buttons next to the folders in file explorer for adding folders and files respectively.
On the top right side, there is a button to toggle the diff editor.

## Getting Started

### Install the dependencies:

Ensure that node and a package manager installed: How to install node: https://nodejs.org/en/download/package-manager.

```
npm install
# or
yarn install
# or
pnpm install
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

The project folder is consists of the following:

- `.next`: Contains output of NextJs build process
- `node_modules`: Contains all modules of the installed packages
- `src`: Contains all the app logic
  - `app`: Contains all pages and routing logic
  - `components`: Contains all custom components
  - `context`: Contains all contexts
  - `hooks`: Contains all custom hooks
  - `models`: Contains all model interfaces
  - `utils`: Contains all utility scripts
- `.eslintrc.json`: Configurations for `eslint`
- `.gitignore`: Files to ignore by `git`
- `.prettierignore`: Files to ignore by `prettier`
- `.prettierrc.json`: Configurations for `prettier`
- `next.config.mjs`: NextJs configurations
- `package.json`: Lists the project dependencies
- `package-locks.json`: Lists the exact version of installed dependencies
- `README.md`: Documentation for the project
- `tsconfig.json`: Typescript configurations

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
