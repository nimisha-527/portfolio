# Portfolio

Last updated: 12/11/2026

The site includes a responsive home page at `/` with a low-contrast portfolio watermark, a centered portrait placeholder, and vertical navigation to Home, About, Work, and Contact. Replace the sample portrait in `src/views/Home.vue` with your own image. The Work navigation and home-page button open `/work`, which displays project cards with category and technology chips, optional video previews, and links that open in a new tab. The Reading Bliss card links to its live site and GitHub repository and uses the video at `assets/Reading-Bliss.mp4`; update the other starter project details and URLs in `src/views/Work.vue`.

The Reading Bliss video is tracked with Git LFS.

The About page is available at `/about`. Both pages use the portfolio API's `aboutPage.summary`, `homePage.yourName`, and `homePage.yourRole` fields when available, with friendly defaults for unset template values. The site follows the clay primary color (`#A47864`) and warm neutral palette.

Generated build output in `dist/` is ignored by Git.


The dependency lockfile pins patched versions of vulnerable transitive linting and formatting dependencies.

## Development

Run `npm run build` to type-check and create a production build, or `npm run lint` to lint the codebase. These scripts use npm directly, and ESLint reads its JavaScript config without an extra TypeScript config loader.

Navigating to a new route scrolls to the top; browser history navigation restores its saved scroll position.