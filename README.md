# connorprp.github.io

Connor Poindexter's personal landing page. Hand-coded: one `index.html`, one `styles.css`, one
`script.js`, no framework, no build step, no external requests. Served by GitHub Pages from `main`.

Live: https://connorprp.github.io/ (moving to https://connorpoindexter.com, see below).

## Files

| File | What |
|---|---|
| `index.html` | The page. Hero with the typewriter intro, GBN case-study cards, public projects, how I work, résumé, contact. All copy is real HTML; JS only animates it. |
| `styles.css` | Dark terminal palette, Source Code Pro (self-hosted woff2 in `assets/`), responsive from 360px. |
| `script.js` | Typewriter sequence (name, description, skills, links) with `prefers-reduced-motion` respected, and the Contact toggle (button, aria-expanded, Escape closes). Commented. |
| `resume.html` | The résumé, print-first. **Source of truth for the PDF.** |
| `ConnorPoindexterResume.pdf` | Generated from `resume.html`, linked from the page. Regenerate, never hand-edit. |
| `CNAME` | `connorpoindexter.com`, created by GitHub when the custom domain was set. Keep it. |

## Editing

- Copy lives in `index.html`. Case-study links point at `github.com/connorprp/connorprp/blob/main/case-studies/*.md`;
  the case studies and profile README are in the `connorprp/connorprp` repo (local: `Desktop\code\public\connorprp`).
- Rules for the copy, set 2026-10-18: no em dashes, no marketing filler, no claims about how fast anything was
  built, no release or version counts. Only the curated public set is featured (Earshot, Bird Targets, the GBN
  case studies). See `Desktop\code\public\README.md` for the full convention.
- No phone number anywhere on the site or in the public PDF.

## Regenerating the résumé PDF

Edit `resume.html`, then from the repo folder:

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --no-pdf-header-footer ^
  --print-to-pdf="%CD%\ConnorPoindexterResume.pdf" "file:///%CD%/resume.html"
```

It must stay one page (check with `python -c "from pypdf import PdfReader; print(len(PdfReader('ConnorPoindexterResume.pdf').pages))"`).
Print margins and type size are at the top of `resume.html`'s `<style>`; tighten there before cutting content.

## Custom domain: connorpoindexter.com (status 2026-10-18: half done)

Done:
- GitHub Pages custom domain set to `connorpoindexter.com` (repo Settings > Pages, or API `PUT /repos/connorprp/connorprp.github.io/pages {"cname": ...}`); `CNAME` file committed.

Still to do, in order:
1. **DNS at Cloudflare** (zone is on Cloudflare nameservers `clyde` / `jen`, currently has NO records). Needs an API token
   with *Zone > DNS > Edit* scoped to connorpoindexter.com, stored via credman as `CF_DNS_TOKEN`
   (`C:\Users\conno\Desktop\code\credman\bin\cred.cmd set CF_DNS_TOKEN`). Then create, all **DNS only (grey cloud)** so
   GitHub can issue the certificate:
   - `A @ 185.199.108.153`, `A @ 185.199.109.153`, `A @ 185.199.110.153`, `A @ 185.199.111.153`
   - `AAAA @ 2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` (optional)
   - `CNAME www connorprp.github.io`
2. **Verify the domain in GitHub** (user Settings > Pages > Add a domain) to block takeover: it gives a
   `TXT _github-pages-challenge-connorprp` record to add.
3. Wait for the certificate (GitHub checks DNS, usually minutes to an hour), then enable **Enforce HTTPS**
   (API: `PUT .../pages {"https_enforced": true}`).
4. Switch `index.html` `<link rel="canonical">` and `og:url` to `https://connorpoindexter.com/`, and update the
   website field on the GitHub profile and the links in `connorprp/connorprp/README.md` and `resume.html`
   (already uses connorpoindexter.com).
5. Optional later: proxy through Cloudflare (orange cloud) with SSL mode Full (strict) once the GitHub cert exists.

## History

Rebuilt 2026-10-18 from Connor's original hand-coded page: his typewriter intro, contact toggle, monospace
dark look and vanilla stack were kept on purpose; placeholder content, fixed-nav overlap, disabled scrolling and
duplicate ids were removed. Build and review were done with Claude Code agents; screenshots and findings are in
`C:\Users\conno\ClaudeBot\scratch\landing-*.png` and `C:\Users\conno\ClaudeBot\CONTEXT.md`.
