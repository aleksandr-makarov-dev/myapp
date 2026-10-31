(() => {
  function initialize() {
    for (const exercise of document.querySelectorAll("[data-kpt-exercise]")) {
      if (exercise.dataset.kptReady) continue;
      exercise.dataset.kptReady = "true";

      exercise.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;
        const gap = event.target.closest("button[data-kpt-answer]");
        if (!gap || !exercise.contains(gap)) return;

        const revealed = gap.getAttribute("aria-pressed") !== "true";
        const answer = gap.dataset.kptAnswer;
        const reference = gap.dataset.kptLabel;
        gap.textContent = revealed ? answer : "\u00a0";
        gap.setAttribute("aria-pressed", String(revealed));
        gap.setAttribute("aria-label", revealed
          ? `Скрыть ответ «${answer}». Задание ${reference}.`
          : `Показать ответ. Задание ${reference}.`);
      });
    }
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initialize);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
