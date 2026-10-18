/*
  connorprp.github.io
  Two things happen here:
    1. The hero types itself out (name, then description, then skills), then
       the jump links fade in. All of that text is real content in index.html;
       this script only hides it and types it back, so the page is complete
       without JavaScript and for crawlers.
    2. The "Contact" button in the header toggles the contact bar.
*/

/* ---- 1. Typewriter --------------------------------------------------- */

// Milliseconds per character. The name is slow and deliberate; the two
// longer lines go quickly so the whole intro finishes in about three seconds.
const SPEED = { name: 60, line: 8 };

const hero = document.getElementById("hero");
const lines = Array.from(document.querySelectorAll("[data-type]"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A single caret element that we move to whichever line is being typed.
const caret = document.createElement("span");
caret.className = "caret";
caret.setAttribute("aria-hidden", "true");

function typeLine(el, text, msPerChar) {
  return new Promise((resolve) => {
    // Screen readers get the full sentence at once; sighted users watch it
    // appear character by character in an aria-hidden span.
    const sr = document.createElement("span");
    sr.className = "sr-only";
    sr.textContent = text;
    const visible = document.createElement("span");
    visible.setAttribute("aria-hidden", "true");
    el.replaceChildren(sr, visible, caret);

    let i = 0;
    const tick = () => {
      visible.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, msPerChar);
      else resolve();
    };
    tick();
  });
}

async function runIntro() {
  // Remember the real markup (the description contains a link) so we can
  // put it back exactly once the typing is done.
  const originals = lines.map((el) => ({ el, html: el.innerHTML, text: el.textContent }));
  hero.classList.add("is-typing");

  for (const { el, text } of originals) {
    const speed = el.dataset.type === "name" ? SPEED.name : SPEED.line;
    await typeLine(el, text, speed);
    await new Promise((r) => setTimeout(r, 250)); // small pause between lines
  }

  for (const { el, html } of originals) el.innerHTML = html;
  lines[lines.length - 1].append(caret); // leave the caret blinking on the last line
  hero.classList.remove("is-typing"); // fades the jump links in
}

if (hero && lines.length && !reduceMotion) {
  runIntro();
}

/* ---- 2. Contact bar toggle ------------------------------------------ */

const contactToggle = document.getElementById("contact-toggle");
const contactBar = document.getElementById("contact-bar");

function setContactOpen(open) {
  contactBar.hidden = !open;
  contactToggle.setAttribute("aria-expanded", String(open));
  if (open) contactBar.querySelector("a").focus();
}

if (contactToggle && contactBar) {
  contactToggle.addEventListener("click", () => {
    setContactOpen(contactBar.hidden);
  });

  // Escape closes the bar and hands focus back to the button.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !contactBar.hidden) {
      setContactOpen(false);
      contactToggle.focus();
    }
  });
}
