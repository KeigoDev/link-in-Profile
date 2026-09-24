# Matthew Ferrer — Link in Profile

A responsive profile page with a face-focused photo, four links, and subtle 3D motion.

## Open locally

Open `index.html` in a browser after extracting the ZIP. Keep `style.css`, `script.js`, and the `assets` folder beside it. No installation or build is required.

## Included files

- `index.html` — Profile content and all link destinations.
- `style.css` — Responsive styling, circular photo crop, 3D entrance, focus and hover effects.
- `script.js` — Pointer tilt, cursor lighting, and reversible scroll depth/zoom.
- `assets/matthew-ferrer.jpeg` — Supplied profile photograph.

In the Site source repository, the public files above live inside `dist/`; the download places them directly in the package folder for easy use.

## Change the links

Edit each `href` and the visible text in `index.html`:

- Portfolio: https://keigodev.github.io/KeigoDev.io/
- Social collaborations: mferrer.social@gmail.com
- Freelance and opportunities: matthew.ferrer.ph@gmail.com
- LinkedIn: https://www.linkedin.com/in/matthew-ferrer-profile/

Email links open the visitor's configured email application. A `mailto:` link does not send an email automatically.

## Design and motion

Change the color variables near the top of `style.css`. The original photo is displayed through a circular, face-focused CSS crop. To reposition it, adjust `.portrait img` in `style.css`.

Cards arrive with a staggered 3D rotation. Mouse/trackpad movement tilts the cards and portrait; scrolling gently changes their depth and reverses when scrolling back. On touchscreens, cards retain tap feedback and normal scrolling. On tall screens the complete page may fit without scrolling; the entrance and pointer effects still work.

The visitor's reduced-motion preference disables animation and tilt. Links remain functional with JavaScript disabled. External websites open in a new tab.

## Host it

Upload `index.html`, `style.css`, `script.js`, and `assets/` together to a static web host, or use them in a GitHub Pages repository. No API keys, third-party scripts, or external fonts are required.
