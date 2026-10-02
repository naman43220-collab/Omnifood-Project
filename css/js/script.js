/* ============================================================ */
/*  SMOOTH SCROLL (with header offset)                          */
/* ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerHeight = 96;
      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

/* ============================================================ */
/*  STICKY HEADER — background change on scroll                 */
/* ============================================================ */
const header = document.querySelector(".header");
const heroSection = document.querySelector(".section-hero");

window.addEventListener("scroll", () => {
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  if (heroBottom < 96) header.classList.add("header--scrolled");
  else header.classList.remove("header--scrolled");
});

/* ============================================================ */
/*  SCROLL REVEAL — IntersectionObserver                        */
/* ============================================================ */
const animatedEls = document.querySelectorAll("[data-animate]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);

animatedEls.forEach((el) => revealObserver.observe(el));

/* ============================================================ */
/*  RIPPLE EFFECT ON BUTTONS                                    */
/* ============================================================ */
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

/* ============================================================ */
/*  NUMBER COUNTER ANIMATION                                    */
/* ============================================================ */
const counters = document.querySelectorAll("[data-counter]");

const animateCounter = (el) => {
  const target = +el.dataset.counter;
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString("en-US");
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString("en-US");
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((c) => counterObserver.observe(c));

/* ============================================================ */
/*  PARALLAX on hero image (subtle)                             */
/* ============================================================ */
const heroImg = document.querySelector(".hero-img");
if (heroImg && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("scroll", () => {
    const y = Math.min(window.scrollY, 500);
    heroImg.style.transform = `translateY(${y * 0.08}px)`;
  });
}