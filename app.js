/* ==========================================================
   DEEKSHITHA K V — PORTFOLIO PREMIUM INTERACTIONS
   Stack: Lenis + GSAP + ScrollTrigger + Vanilla JS
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────
     1. LENIS SMOOTH SCROLL
  ────────────────────────────────────────────────────── */

  let lenis;

  if (typeof Lenis !== 'undefined') {

    lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.update();
      }
    });

    function lenisRaf(time) {
      lenis.raf(time);
      requestAnimationFrame(lenisRaf);
    }

    requestAnimationFrame(lenisRaf);

  }

  /* ──────────────────────────────────────────────────────
     2. GSAP + ScrollTrigger SETUP
  ────────────────────────────────────────────────────── */

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

    gsap.registerPlugin(ScrollTrigger);

    /* ── 2a. HERO ENTRANCE STAGGER ── */

    const heroTl = gsap.timeline({ delay: 0.1 });

    heroTl
      .fromTo('.hero-title',
        { opacity: 0, y: 60, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2,
          ease: 'expo.out', clearProps: 'filter' }
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out' },
        '-=0.75'
      )
      .fromTo('.hero-actions',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' },
        '-=0.65'
      )
      .fromTo('.hero-visual-container',
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out' },
        '-=0.7'
      );

    /* ── 2b. CREDENTIALS STRIP ── */

    gsap.fromTo('.credential-item',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.credentials-strip',
          start: 'top 88%',
        }
      }
    );

    /* ── 2c. PROJECT SECTIONS ── */

    document.querySelectorAll('.project-section').forEach((section, i) => {

      const card   = section.querySelector('.project-card-tint');
      const visual = section.querySelector('.project-visual');
      const tag    = section.querySelector('.project-tag');
      const title  = section.querySelector('.project-title');
      const desc   = section.querySelector('.project-description');
      const meta   = section.querySelector('.project-meta');
      const acts   = section.querySelector('.project-actions');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end:   'bottom 20%',
        }
      });

      if (card) {
        tl.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50, filter: 'blur(4px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.0,
            ease: 'expo.out', clearProps: 'filter' }
        );
      }

      [tag, title, desc, meta, acts].forEach((el, j) => {
        if (!el) return;
        tl.fromTo(el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out' },
          j === 0 ? '-=0.7' : '-=0.5'
        );
      });

      if (visual) {
        tl.fromTo(visual,
          { opacity: 0, x: i % 2 === 0 ? 50 : -50, scale: 0.94 },
          { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'expo.out' },
          '<0.1'
        );
      }

    });

    /* ── 2d. SKILLS SECTION ── */

    gsap.fromTo('.section-tag',
      { opacity: 0, y: 16, letterSpacing: '0.3em' },
      {
        opacity: 1, y: 0, letterSpacing: '0.16em',
        duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.skills-section', start: 'top 82%' }
      }
    );

    gsap.fromTo('.section-title-large',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1.0, ease: 'expo.out',
        scrollTrigger: { trigger: '.skills-section', start: 'top 80%' },
        delay: 0.15
      }
    );

    gsap.fromTo('.skill-row',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.skills-list',
          start: 'top 82%',
        }
      }
    );

    /* Override the default opacity:0.35 after animation ends */
    gsap.set('.skill-row', { opacity: 0 });
    ScrollTrigger.create({
      trigger: '.skills-list',
      start: 'top 82%',
      onEnter: () => {
        gsap.to('.skill-row', {
          opacity: 0.35,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'expo.out',
          onComplete: () => {
            // Restore first row to full opacity
            const firstRow = document.querySelector('.skill-row.active');
            if (firstRow) gsap.to(firstRow, { opacity: 1, duration: 0.3 });
          }
        });
      },
      once: true
    });

    /* ── 2e. TIMELINE CARDS ── */

    gsap.fromTo('.timeline-card',
      { opacity: 0, x: -24 },
      {
        opacity: 1, x: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top 80%',
        }
      }
    );

    /* ── 2f. CONTACT SECTION ── */

    gsap.fromTo('.contact-headline',
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1.1, ease: 'expo.out', clearProps: 'filter',
        scrollTrigger: { trigger: '.contact-section', start: 'top 80%' }
      }
    );

    gsap.fromTo('.contact-subheadline',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: 0.15,
        scrollTrigger: { trigger: '.contact-section', start: 'top 78%' }
      }
    );

    gsap.fromTo('.contact-console',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 0.3,
        scrollTrigger: { trigger: '.contact-section', start: 'top 75%' }
      }
    );

    /* ── 2g. PARALLAX ON PROJECT IMAGES ── */

    document.querySelectorAll('.project-section').forEach(section => {

      const img = section.querySelector('.project-render-img');
      if (!img) return;

      gsap.to(img, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

    });

    /* ── 2h. HERO IMAGE SCROLL PARALLAX ── */

    gsap.to('.hero-visual-container', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-stage',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    });

  }

  /* ──────────────────────────────────────────────────────
     3. HERO SPOTLIGHT (cursor-follow light)
  ────────────────────────────────────────────────────── */

  const heroStage     = document.querySelector('.hero-stage');
  const heroSpotlight = document.getElementById('hero-spotlight');

  if (heroStage && heroSpotlight) {

    let spotX = window.innerWidth  / 2;
    let spotY = window.innerHeight / 2;
    let curX  = spotX;
    let curY  = spotY;

    heroStage.addEventListener('mousemove', (e) => {

      const rect = heroStage.getBoundingClientRect();
      spotX = e.clientX - rect.left;
      spotY = e.clientY - rect.top;
      heroSpotlight.classList.add('visible');

    });

    heroStage.addEventListener('mouseleave', () => {
      heroSpotlight.classList.remove('visible');
    });

    function animateSpotlight() {

      curX += (spotX - curX) * 0.08;
      curY += (spotY - curY) * 0.08;

      heroSpotlight.style.left = curX + 'px';
      heroSpotlight.style.top  = curY + 'px';

      requestAnimationFrame(animateSpotlight);

    }

    animateSpotlight();

  }

  /* ──────────────────────────────────────────────────────
     4. HERO IMAGE MOUSE PARALLAX
  ────────────────────────────────────────────────────── */

  const heroArtifact = document.getElementById('hero-artifact');

  if (heroArtifact) {

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {

      targetX = ((e.clientX / window.innerWidth)  - 0.5) * 20;
      targetY = ((e.clientY / window.innerHeight) - 0.5) * 20;

    });

    function animateHero() {

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      heroArtifact.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentX * 0.1}deg)`;

      requestAnimationFrame(animateHero);

    }

    animateHero();

  }

  /* ──────────────────────────────────────────────────────
     5. MAGNETIC BUTTONS
  ────────────────────────────────────────────────────── */

  function initMagneticBtn(selector, strength = 0.4) {

    document.querySelectorAll(selector).forEach(btn => {

      btn.addEventListener('mousemove', (e) => {

        const rect = btn.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) * strength;
        const dy   = (e.clientY - cy) * strength;

        btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;

        /* Update ripple origin */
        const pctX = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
        const pctY = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
        btn.style.setProperty('--mx', pctX + '%');
        btn.style.setProperty('--my', pctY + '%');

      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });

    });

  }

  initMagneticBtn('.hero-btn-primary',   0.35);
  initMagneticBtn('.hero-btn-secondary', 0.25);
  initMagneticBtn('.nav-cta',            0.2);

  /* ──────────────────────────────────────────────────────
     6. CURSOR GLOW
  ────────────────────────────────────────────────────── */

  const glow = document.createElement('div');
  glow.classList.add('cursor-glow');
  document.body.appendChild(glow);

  let glowX = 0, glowY = 0;
  let glowCX = 0, glowCY = 0;

  document.addEventListener('mousemove', (e) => {
    glowX = e.clientX;
    glowY = e.clientY;
  });

  function animateGlow() {
    glowCX += (glowX - glowCX) * 0.1;
    glowCY += (glowY - glowCY) * 0.1;
    glow.style.left = glowCX + 'px';
    glow.style.top  = glowCY + 'px';
    requestAnimationFrame(animateGlow);
  }

  animateGlow();

  /* ──────────────────────────────────────────────────────
     7. NAVBAR — THEME + ACTIVE LINK + SHRINK
  ────────────────────────────────────────────────────── */

  const header   = document.getElementById('nav-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {

    const scrollPos = window.scrollY + 90;
    let currentId = '';

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop &&
          scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.id;
      }
    });

    /* Theme switch */
    if (currentId === 'projects') {
      header.classList.remove('dark-nav');
      header.classList.add('light-nav');
    } else {
      header.classList.remove('light-nav');
      header.classList.add('dark-nav');
    }

    /* Active link */
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentId) link.classList.add('active');
      if (currentId === 'contact' && link.classList.contains('nav-cta')) {
        link.classList.add('active');
      }
    });

    /* Shrink on scroll */
    if (window.scrollY > 50) {
      header.style.height        = '64px';
      header.style.backdropFilter = 'blur(24px)';
    } else {
      header.style.height        = '';
      header.style.backdropFilter = '';
    }

  }

  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav, { passive: true });
  updateNav();

  /* ──────────────────────────────────────────────────────
     8. SCROLL INDICATOR FADE
  ────────────────────────────────────────────────────── */

  const scrollIndicator = document.querySelector('.scroll-indicator');

  window.addEventListener('scroll', () => {
    if (!scrollIndicator) return;
    scrollIndicator.style.opacity = window.scrollY > 180 ? '0' : '1';
  }, { passive: true });

  /* ──────────────────────────────────────────────────────
     9. SKILL ROW ACCORDION
  ────────────────────────────────────────────────────── */

  const skillRows = document.querySelectorAll('.skill-row');
  const skillsList = document.querySelector('.skills-list');

  skillRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      skillRows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');
    });
  });

  if (skillsList) {
    skillsList.addEventListener('mouseleave', () => {
      skillRows.forEach(r => r.classList.remove('active'));
      if (skillRows[0]) skillRows[0].classList.add('active');
    });
  }

  /* ──────────────────────────────────────────────────────
     10. PROJECT IMAGE HOVER ENHANCEMENT
  ────────────────────────────────────────────────────── */

  document.querySelectorAll('.project-section').forEach(section => {

    const img = section.querySelector('.project-render-img');
    if (!img) return;

    section.addEventListener('mouseenter', () => {
      img.style.transition = 'transform 0.9s cubic-bezier(.16,1,.3,1), filter 0.9s cubic-bezier(.16,1,.3,1)';
      img.style.filter     = 'drop-shadow(0 30px 60px rgba(0,0,0,.22))';
    });

    section.addEventListener('mouseleave', () => {
      img.style.filter = '';
    });

  });

  /* ──────────────────────────────────────────────────────
     11. COPY EMAIL
  ────────────────────────────────────────────────────── */

  const contactInput  = document.getElementById('contact-input');
  const contactButton = document.getElementById('contact-button');
  const formFeedback  = document.getElementById('form-feedback');

  if (contactButton && contactInput) {

    contactButton.addEventListener('click', () => {

      navigator.clipboard.writeText(contactInput.value)
        .then(() => {
          formFeedback.textContent = '✓ Email copied to clipboard!';
          formFeedback.className   = 'form-feedback success';
          contactButton.textContent = 'Copied!';
          setTimeout(() => {
            formFeedback.textContent  = '';
            formFeedback.className    = 'form-feedback';
            contactButton.textContent = 'Copy Email';
          }, 3000);
        })
        .catch(() => {
          formFeedback.textContent = 'Failed to copy — copy it manually.';
          formFeedback.className   = 'form-feedback error';
        });

    });

  }

  /* ──────────────────────────────────────────────────────
     12. CONTACT CONSOLE HOVER LIFT
  ────────────────────────────────────────────────────── */

  const contactConsole = document.querySelector('.contact-console');

  if (contactConsole) {
    contactConsole.addEventListener('mouseenter', () => {
      contactConsole.style.transform = 'translateY(-3px)';
      contactConsole.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1)';
    });
    contactConsole.addEventListener('mouseleave', () => {
      contactConsole.style.transform = '';
    });
  }

}); /* END */