# Deploy to demo.d1fpc3.com

GitHub Actions builds the Vite app and FTP-uploads the `dist/` to Hostinger on every push to `main`. Same pattern as `outback-running-club`, `white-line-detailing`, and the `d1fpc3` portfolio.

## One-time Hostinger setup (do this in hPanel, then push)

### 1. Create the subdomain

hPanel → **Domains → Subdomains → Create**
- Subdomain: `demo`
- Domain: `d1fpc3.com`
- Document root: `/public_html/demo` (Hostinger fills this in by default)

The DNS record auto-creates. Wait ~5–10 min for propagation.

### 2. Add FTP secrets to the GitHub repo

Repo: https://github.com/d1fpc3/demo1 → **Settings → Secrets and variables → Actions → New repository secret**

Same values you already use for the other Hostinger sites:
- `FTP_SERVER` — your Hostinger FTP host (e.g. `ftp.d1fpc3.com` or the IP from hPanel → Files → FTP Accounts)
- `FTP_USERNAME` — main FTP user
- `FTP_PASSWORD` — that user's password

### 3. Push to main

```bash
git push origin main
```

The workflow will:
1. `npm ci`
2. `npm run build` → produces `dist/`
3. FTP-upload `dist/` to `/public_html/demo/`

After ~2 min, the site is live at **https://demo.d1fpc3.com**.

## SSL

Hostinger auto-issues a Let's Encrypt cert for the subdomain — usually within 15 min of creation. If `https://` doesn't work right away, give it time, then check hPanel → **Security → SSL**.

## Manual fallback

If FTP secrets aren't set up yet, you can deploy by hand:

```bash
npm run build
```

Then drag the **contents** of `dist/` (not the folder itself) into Hostinger File Manager at `/public_html/demo/`.

## Troubleshooting

- **404 on assets** — the workflow uploads `./dist/` flat. Make sure `vite.config.js` does **not** have a `base:` set. (We're on a subdomain root, not a subfolder, so default `/` is correct.)
- **FTP timeout** — your Vault note `Hostinger FTPS unreliable in CI — use plain FTP` applies. Workflow uses plain FTP on port 21.
- **Workflow stops running** — Node 20 actions get auto-deprecated 2026-09-16 (per `project_node20_action_deprecation.md`). Bump `actions/checkout@v4` and `SamKirkland/FTP-Deploy-Action@v4.3.5` if so.
