(() => {
  const spotlight = document.querySelector(".spotlight");
  const navLinks = [...document.querySelectorAll(".nav__link")];
  const sections = ["about", "experience", "projects"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const moveSpotlight = (event) => {
    if (!spotlight) return;
    spotlight.style.setProperty("--x", `${event.clientX}px`);
    spotlight.style.setProperty("--y", `${event.clientY}px`);
  };

  const setActiveNav = () => {
    const marker = window.scrollY + window.innerHeight * 0.3;
    let current = sections[0]?.id;

    sections.forEach((section) => {
      if (section.offsetTop <= marker) current = section.id;
    });

    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("is-active", active);
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActiveNav();
      ticking = false;
    });
  };

  window.addEventListener("mousemove", moveSpotlight, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  setActiveNav();
})();
