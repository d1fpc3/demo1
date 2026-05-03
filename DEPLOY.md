# Deploy to GitHub Pages

GitHub Actions builds the Vite app and publishes `dist/` to GitHub Pages on every push to `main`. Final URL: **https://d1fpc3.github.io/demo1/**.

## One-time setup (do these once, in order)

### 1. Make the repo public

GitHub Pages on the free plan only serves **public** repos. Either:
- Flip `d1fpc3/demo1` to public: **Settings → General → scroll to Danger Zone → Change repository visibility → Make public**, OR
- Upgrade to GitHub Pro ($4/mo) which allows private-repo Pages.

### 2. Enable Pages with "GitHub Actions" as the source

Repo → **Settings → Pages** → under **Build and deployment → Source**, pick **GitHub Actions**. (Not the default "Deploy from a branch" — we want the workflow to push the build artifact directly.)

### 3. Push to main

```bash
git push origin main
```

The workflow will:
1. `npm ci`
2. `npm run build` → `dist/`
3. Upload `dist/` as a Pages artifact and publish it.

First deploy takes ~2 min. Subsequent pushes also take ~2 min.

## Why `base: '/demo1/'` is set in vite.config.js

GitHub Pages serves project sites at `https://<owner>.github.io/<repo>/`, so all asset URLs need to be prefixed with `/demo1/`. The `vite.config.js` `base` option handles this automatically at build time — `dev` mode still works at `localhost:5173/` because Vite ignores `base` when serving locally.

## Why the empty `public/.nojekyll`

GitHub Pages runs Jekyll by default and Jekyll filters out files whose names start with underscore. Vite emits some assets that way. The `.nojekyll` file disables Jekyll, so Pages serves the build untouched.

## Custom domain (later, optional)

If you ever can create a CNAME on your own DNS, you can point `demo.d1fpc3.com` (or any subdomain) at `d1fpc3.github.io`. Pages → Custom domain field handles the cert. Doesn't require Hostinger subdomain setup — just a DNS CNAME.

## Troubleshooting

- **Blank page / 404 on assets** — check the deployed page's network tab. If asset URLs are `/assets/...` instead of `/demo1/assets/...`, `base` got dropped from `vite.config.js`.
- **Workflow fails with permission error** — make sure step 2 above is done (Pages source set to "GitHub Actions"). The workflow's `permissions:` block needs that.
- **First deploy says "site under construction"** — Pages takes 1–2 min to propagate after the first deploy completes. Refresh.
