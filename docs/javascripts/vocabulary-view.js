(() => {
  const storageKey = "finnish-vocabulary-view";
  const headings = ["Слово", "Перевод", "Пример", "Перевод примера"];
  const modes = [
    { id: "all", label: "Всё", title: "Финские слова, примеры и их перевод", columns: [0, 1, 2, 3] },
    { id: "finnish", label: "Финский", title: "Только финские слова и примеры", columns: [0, 2] },
    { id: "translation", label: "Перевод", title: "Только английские переводы слов и примеров", columns: [1, 3] },
  ];

  function initialize() {
    const content = document.querySelector(".md-content__inner");
    if (!content || content.querySelector("[data-vocabulary-view]")) return;

    const tables = [...content.querySelectorAll("table")].filter((table) => {
      const header = table.tHead?.rows[0];
      return header && header.cells.length === headings.length &&
        [...header.cells].every((cell, index) => cell.textContent.trim().replace(/\s+/g, " ") === headings[index]) &&
        [...table.rows].every((row) => row.cells.length === headings.length);
    });
    if (!tables.length) return;

    // Hide only the text: keep headers, borders and all table dimensions intact.
    const values = tables.flatMap((table) => [...table.tBodies].flatMap((body) =>
      [...body.rows].flatMap((row) => [...row.cells].map((cell, column) => {
        const value = document.createElement("span");
        value.dataset.vocabularyValue = "";
        value.append(...cell.childNodes);
        cell.append(value);
        return { value, column };
      }))
    ));
    const controls = document.createElement("div");
    controls.dataset.vocabularyView = "";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Что показывать в словарных таблицах");
    const actions = document.createElement("p");
    const buttons = modes.map((mode) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "md-button";
      button.dataset.vocabularyMode = mode.id;
      button.textContent = mode.label;
      button.title = mode.title;
      button.addEventListener("click", () => apply(mode.id));
      actions.append(button, document.createTextNode(" "));
      return button;
    });
    controls.append(actions);

    function apply(id) {
      const selected = modes.find((mode) => mode.id === id) || modes[0];
      for (const { value, column } of values) {
        value.style.visibility = selected.columns.includes(column) ? "" : "hidden";
      }
      for (const button of buttons) {
        const active = button.dataset.vocabularyMode === selected.id;
        button.setAttribute("aria-pressed", String(active));
        button.classList.toggle("md-button--primary", active);
      }
      try {
        localStorage.setItem(storageKey, selected.id);
      } catch {
        // The controls still work when browser storage is unavailable.
      }
    }

    let anchor = tables[0];
    while (anchor.parentElement && anchor.parentElement !== content) anchor = anchor.parentElement;
    if (anchor.previousElementSibling?.tagName === "H2") anchor = anchor.previousElementSibling;
    anchor.before(controls);

    let preferred = "all";
    try {
      preferred = localStorage.getItem(storageKey) || preferred;
    } catch {
      // Use the full table if the browser blocks stored preferences.
    }
    apply(preferred);
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initialize);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
