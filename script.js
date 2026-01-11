// Burger menu
const burger = document.querySelector(".burger");
const mobileNav = document.getElementById("mobile-nav");

if (burger && mobileNav) {
  burger.addEventListener("click", () => {
    const isOpen = burger.classList.toggle("is-open");
    mobileNav.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("is-open");
      mobileNav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// Scroll animations with enhanced timing
const animated = document.querySelectorAll("[data-animate]");

if ("IntersectionObserver" in window && animated.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  animated.forEach((el) => observer.observe(el));
} else {
  animated.forEach((el) => el.classList.add("is-visible"));
}

// Parallax effect for hero background
const heroMedia = document.querySelector(".hero-media img");
if (heroMedia) {
  let ticking = false;
  
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector(".hero");
        if (hero) {
          const heroHeight = hero.offsetHeight;
          if (scrolled < heroHeight) {
            const parallaxValue = scrolled * 0.2;
            heroMedia.style.transform = `translateY(${parallaxValue}px)`;
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Smooth header shadow on scroll
const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.3)";
    } else {
      header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
    }
  });
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.closest(".faq-item");
    const isOpen = faqItem.classList.contains("is-open");
    
    // Close all other items
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("is-open");
        item.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      }
    });
    
    // Toggle current item
    faqItem.classList.toggle("is-open");
    question.setAttribute("aria-expanded", String(!isOpen));
  });
});
