// ======================================================
// VARIABLES
// ======================================================

let lastFocusedElement = null;
let currentSlide = 0;


// ======================================================
// WHATSAPP
// ======================================================

function openWhatsApp(message) {

  // IMPORTANTE:
  // Cambia este número por el número real de WhatsApp.
  const phone = "5210000000000";

  const url =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}


// ======================================================
// MANEJO DE IMÁGENES
// ======================================================

function imageError(image) {

  image.classList.add("image-error");

  image.alt = "Imagen no disponible";
}


function avatarError(image) {

  image.classList.add("avatar-error");

  image.src =
    "https://ui-avatars.com/api/?name=Cliente&background=FFC107&color=111416&size=100";
}


// ======================================================
// MODALES
// ======================================================

function openModal(id) {

  const modal = document.getElementById(id);

  if (!modal) {
    console.warn("No se encontró el modal:", id);
    return;
  }

  lastFocusedElement = document.activeElement;

  modal.classList.add("is-open");

  document.body.style.overflow = "hidden";

  const closeButton = modal.querySelector(".modal-close");

  if (closeButton) {
    closeButton.focus();
  }
}


function closeModal(id) {

  const modal = document.getElementById(id);

  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");

  document.body.style.overflow = "";

  if (
    lastFocusedElement &&
    typeof lastFocusedElement.focus === "function"
  ) {
    lastFocusedElement.focus();
  }

  lastFocusedElement = null;
}


// ======================================================
// OFERTA
// ======================================================

function revealOffer() {

  const offerReveal =
    document.getElementById("offer-reveal");

  const offerButton =
    document.getElementById("offer-button");

  if (!offerReveal || !offerButton) {
    return;
  }

  offerReveal.classList.remove("hidden");

  offerButton.setAttribute(
    "aria-expanded",
    "true"
  );

  offerButton.textContent =
    "Código desbloqueado";
}


// ======================================================
// COPIAR DESCUENTO
// ======================================================

async function copyDiscount() {

  const feedback =
    document.getElementById("copy-feedback");

  if (!feedback) {
    return;
  }

  try {

    await navigator.clipboard.writeText("DULCE10");

    feedback.textContent =
      "Código copiado correctamente";

    feedback.classList.remove("hidden");

    setTimeout(() => {
      feedback.classList.add("hidden");
    }, 2400);

  } catch (error) {

    feedback.textContent =
      "No se pudo copiar automáticamente. Usa DULCE10.";

    feedback.classList.remove("hidden");
  }
}


// ======================================================
// CARRUSEL
// ======================================================

function setSlide(index) {

  const slides =
    document.querySelectorAll(".testimonial-slide");

  const track =
    document.getElementById("testimonial-track");

  const dots =
    document.querySelectorAll(
      "#testimonial-dots button"
    );

  if (!slides.length || !track) {
    return;
  }

  const totalSlides = slides.length;

  currentSlide =
    (index + totalSlides) % totalSlides;

  track.style.transform =
    "translateX(-" +
    currentSlide * 100 +
    "%)";


  dots.forEach((dot, dotIndex) => {

    const active =
      dotIndex === currentSlide;

    dot.classList.toggle(
      "active",
      active
    );

    dot.setAttribute(
      "aria-current",
      String(active)
    );

  });
}


// ======================================================
// DOM READY
// ======================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {


    // ==================================================
    // LUCIDE
    // ==================================================

    if (
      typeof lucide !== "undefined" &&
      typeof lucide.createIcons === "function"
    ) {

      lucide.createIcons();

    }


    // ==================================================
    // MENÚ MÓVIL
    // ==================================================

    const menuToggle =
      document.getElementById("menu-toggle");

    const mobileMenu =
      document.getElementById("mobile-menu");


    if (menuToggle && mobileMenu) {

      menuToggle.addEventListener(
        "click",
        () => {

          const open =
            mobileMenu.classList.toggle("open");

          menuToggle.setAttribute(
            "aria-expanded",
            String(open)
          );

          menuToggle.setAttribute(
            "aria-label",
            open
              ? "Cerrar menú"
              : "Abrir menú"
          );

        }
      );


      mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

          link.addEventListener(
            "click",
            () => {

              mobileMenu.classList.remove(
                "open"
              );

              menuToggle.setAttribute(
                "aria-expanded",
                "false"
              );

              menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
              );

            }
          );

        });

    }


    // ==================================================
    // CERRAR MODALES AL HACER CLICK FUERA
    // ==================================================

    document
      .querySelectorAll(".modal")
      .forEach(modal => {

        modal.addEventListener(
          "click",
          event => {

            if (
              event.target === modal
            ) {

              closeModal(modal.id);

            }

          }
        );

      });


    // ==================================================
    // TECLA ESCAPE
    // ==================================================

    document.addEventListener(
      "keydown",
      event => {

        if (event.key !== "Escape") {
          return;
        }


        const openModalElement =
          document.querySelector(
            ".modal.is-open"
          );


        if (openModalElement) {

          closeModal(
            openModalElement.id
          );

        }


        if (
          mobileMenu &&
          mobileMenu.classList.contains("open")
        ) {

          mobileMenu.classList.remove(
            "open"
          );

          if (menuToggle) {

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

            menuToggle.setAttribute(
              "aria-label",
              "Abrir menú"
            );

          }

        }

      }
    );


    // ==================================================
    // CARRUSEL
    // ==================================================

    const testimonialPrev =
      document.getElementById(
        "testimonial-prev"
      );

    const testimonialNext =
      document.getElementById(
        "testimonial-next"
      );

    const testimonialTrack =
      document.getElementById(
        "testimonial-track"
      );

    const testimonialDots =
      document.querySelectorAll(
        "#testimonial-dots button"
      );


    if (
      testimonialPrev &&
      testimonialNext &&
      testimonialTrack
    ) {


      testimonialPrev.addEventListener(
        "click",
        () => {
          setSlide(currentSlide - 1);
        }
      );


      testimonialNext.addEventListener(
        "click",
        () => {
          setSlide(currentSlide + 1);
        }
      );


      testimonialDots.forEach(
        (dot, index) => {

          dot.addEventListener(
            "click",
            () => {
              setSlide(index);
            }
          );

        }
      );


      // ================================================
      // TOUCH / CELULAR
      // ================================================

      let touchStartX = 0;


      testimonialTrack.addEventListener(
        "touchstart",
        event => {

          touchStartX =
            event.changedTouches[0].screenX;

        },
        {
          passive: true
        }
      );


      testimonialTrack.addEventListener(
        "touchend",
        event => {

          const difference =
            event.changedTouches[0].screenX -
            touchStartX;


          if (
            Math.abs(difference) > 45
          ) {

            setSlide(
              currentSlide +
              (
                difference < 0
                  ? 1
                  : -1
              )
            );

          }

        },
        {
          passive: true
        }
      );

    }


    // ==================================================
    // ANIMACIÓN REVEAL
    // ==================================================

    const revealElements =
      document.querySelectorAll(".reveal");


    // Si el navegador no soporta
    // IntersectionObserver,
    // mostramos todo inmediatamente.

    if (
      !("IntersectionObserver" in window)
    ) {

      revealElements.forEach(
        element => {
          element.classList.add(
            "visible"
          );
        }
      );

    } else {

      const revealObserver =
        new IntersectionObserver(
          entries => {

            entries.forEach(
              entry => {

                if (
                  entry.isIntersecting
                ) {

                  entry.target.classList.add(
                    "visible"
                  );

                  revealObserver.unobserve(
                    entry.target
                  );

                }

              }
            );

          },
          {
            threshold: 0.14
          }
        );


      revealElements.forEach(
        element => {

          revealObserver.observe(
            element
          );

        }
      );

    }


    // ==================================================
    // BOTÓN FLOTANTE WHATSAPP
    // ==================================================

    const contact =
      document.getElementById(
        "contacto"
      );

    const floatingButton =
      document.getElementById(
        "whatsapp-float"
      );


    // IMPORTANTE:
    // Solo ejecutamos el observer
    // si ambos elementos existen.

    if (
      contact &&
      floatingButton &&
      "IntersectionObserver" in window
    ) {

      const contactObserver =
        new IntersectionObserver(
          entries => {

            floatingButton.classList.toggle(
              "hidden-float",
              entries[0].isIntersecting
            );

          },
          {
            threshold: 0.3
          }
        );


      contactObserver.observe(
        contact
      );

    }


  }
);