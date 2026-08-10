// ============================================
// 0. TYPEWRITER ANIMATION
// Types the name into #typedText one character at a time.
// The pattern: keep an index of "how many characters shown so far",
// slice the full string up to that index, and schedule the next
// character with setTimeout. Recursive setTimeout (rather than
// setInterval) lets us vary the delay per character if we ever want to.
// ============================================
function typeWriter(text, elementId, speed = 90) {
  const el = document.getElementById(elementId);
  let i = 0;

  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, speed);
    }
  }

  step();
}

typeWriter('Anirudh Kaushik', 'typedText', 90);

// ============================================
// 1. MOBILE NAV TOGGLE
// Grab the button and the menu, toggle a class on click.
// This is the most common JS pattern you'll write: select, listen, react.
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close the mobile menu automatically after a link is clicked
navLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ============================================
// 2. ACTIVE SECTION HIGHLIGHTING
// Uses IntersectionObserver, the modern way to detect when an
// element enters/leaves the viewport (better than listening to
// 'scroll' and doing math yourself).
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navLinkEls.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  {
    // Trigger when a section is roughly in the middle of the screen
    rootMargin: '-40% 0px -55% 0px',
  }
);

sections.forEach((section) => observer.observe(section));

// ============================================
// 4. EXPERIENCE REVEAL ANIMATION
// Triggered by hover, not scroll position. Each .timeline-item listens
// for mouseenter/mouseleave and toggles .revealed on its own reveal-window,
// which is what the CSS transform responds to.
// ============================================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item) => {
  const window_ = item.querySelector('.reveal-window');

  item.addEventListener('mouseenter', () => {
    window_.classList.add('revealed');
  });

  item.addEventListener('mouseleave', () => {
    window_.classList.remove('revealed');
  });
});

// ============================================
// 5. PROJECT CAROUSEL
// Each card is exactly 100% of the track's width (see CSS), so
// scrolling by the track's own clientWidth moves exactly one card.
// scrollBy with behavior: 'smooth' animates it instead of jumping.
// ============================================
const projectTrack = document.getElementById('projectTrack');
const projectNext = document.getElementById('projectNext');

projectNext.addEventListener('click', () => {
  const cardWidth = projectTrack.clientWidth;
  const atEnd =
    projectTrack.scrollLeft + cardWidth >= projectTrack.scrollWidth - 5;

  projectTrack.scrollBy({
    // loop back to the start once we've reached the last card
    left: atEnd ? -projectTrack.scrollLeft : cardWidth,
    behavior: 'smooth',
  });
});

// ============================================
// 6. CONTACT FORM
// No backend exists on a static site, so this can't send email silently.
// Instead: build a mailto: link from the form fields and navigate to it,
// which opens the visitor's own email app pre-filled and addressed to me.
// encodeURIComponent() is required — mailto subject/body must be URL-encoded,
// otherwise spaces, line breaks, and symbols would break the link.
// ============================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // stop the browser's default full-page form submit

  const name = document.getElementById('fromName').value.trim();
  const fromEmail = document.getElementById('fromEmail').value.trim();
  const message = document.getElementById('messageBody').value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${fromEmail})`);

  const mailtoLink = `mailto:anikau70@gmail.com?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;

  formNote.textContent = 'Opening your email app to send this…';
});

// ============================================
// 7. FOOTER YEAR
// Small touch: keeps the copyright year correct without editing HTML yearly.
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();
