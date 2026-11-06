/**
 * CYBER SECURITY BASICS 2.0 — MASTER APPLICATION CONTROLLER
 * Orchestrates modules, performance, accessibility, and smooth UX
 */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure all modules are aware of theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        // Re-render or adjust canvas colors if needed
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // Console welcome banner
  console.log(
    "%c🛡️ CYBER SECURITY BASICS 2.0 %c\nKiberxavfsizlik o'quv platformasi ishga tushirildi.\nTizim himoyalangan va xavfsiz.",
    "background: #00E5FF; color: #050B16; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 4px;",
    "color: #00FF9D; font-size: 12px; margin-top: 4px;",
  );
});
