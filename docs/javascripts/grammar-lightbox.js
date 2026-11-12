(() => {
  let lightbox;

  function initialize() {
    if (lightbox) {
      lightbox.destroy();
      lightbox = null;
    }
    const links = document.querySelectorAll(".grammar-image a");
    if (!links.length || typeof window.GLightbox !== "function") return;

    for (const link of links) {
      link.dataset.title = link.querySelector("img")?.alt || "";
      link.dataset.type = "image";
    }
    lightbox = window.GLightbox({
      selector: ".grammar-image a",
      touchNavigation: true,
      keyboardNavigation: true,
      closeOnOutsideClick: true,
      zoomable: true,
      draggable: true,
      openEffect: "fade",
      closeEffect: "fade",
      moreLength: 0,
    });
    lightbox.on("open", () => {
      document.querySelector(".gclose")?.setAttribute("aria-label", "Закрыть изображение");
      document.querySelector(".gprev")?.setAttribute("aria-label", "Предыдущее изображение");
      document.querySelector(".gnext")?.setAttribute("aria-label", "Следующее изображение");
    });
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initialize);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
