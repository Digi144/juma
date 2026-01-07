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
        const heroHeight = document.querySelector(".hero").offsetHeight;
        
        if (scrolled < heroHeight) {
          const parallaxValue = scrolled * 0.2;
          heroMedia.style.transform = `translateY(${parallaxValue}px)`;
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
  let lastScroll = 0;
  
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.style.boxShadow = "0 10px 40px rgba(76, 64, 55, 0.1)";
    } else {
      header.style.boxShadow = "0 10px 30px rgba(15, 23, 42, 0.06)";
    }
    
    lastScroll = currentScroll;
  });
}

// #region agent log - Header Debug Instrumentation
(function() {
  const log = (msg, data, hypothesisId) => {
    fetch('http://127.0.0.1:7242/ingest/e246a15a-406e-4e49-bb42-d32783f2b993', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'script.js:DEBUG',
        message: msg,
        data: data,
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: hypothesisId
      })
    }).catch(() => {});
  };

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        debugHeader();
        debugHeroTitle();
      }, 100);
    });
  } else {
    setTimeout(() => {
      debugHeader();
      debugHeroTitle();
    }, 100);
  }

  function debugHeader() {
    // Hypothesis A: Check logo wrapper computed styles
    const logoWrapper = document.querySelector('.brand-logo-wrapper');
    if (logoWrapper) {
      const computed = window.getComputedStyle(logoWrapper);
      log('Logo wrapper computed styles', {
        backgroundImage: computed.backgroundImage,
        backgroundSize: computed.backgroundSize,
        backgroundPosition: computed.backgroundPosition,
        height: computed.height,
        width: computed.width,
        overflow: computed.overflow,
        filter: computed.filter
      }, 'A');
    } else {
      log('Logo wrapper NOT FOUND', {}, 'A');
    }

    // Hypothesis B: Search for KONTAKT text in header
    const header = document.querySelector('.site-header');
    if (header) {
      const allText = header.innerText || header.textContent || '';
      const hasKontakt = allText.includes('KONTAKT') || allText.includes('Kontakt');
      log('Header text content check', {
        fullText: allText,
        hasKontakt: hasKontakt,
        headerHTML: header.innerHTML.substring(0, 500)
      }, 'B');

      // Check all child elements
      const allElements = header.querySelectorAll('*');
      const kontaktElements = [];
      allElements.forEach((el, idx) => {
        const text = el.textContent || el.innerText || '';
        if (text.includes('KONTAKT') || text.includes('Kontakt')) {
          kontaktElements.push({
            tag: el.tagName,
            className: el.className,
            id: el.id,
            text: text.substring(0, 50),
            index: idx
          });
        }
      });
      log('Elements containing KONTAKT', { elements: kontaktElements }, 'B');
    }

    // Hypothesis C: Check header computed background
    if (header) {
      const headerComputed = window.getComputedStyle(header);
      log('Header computed background', {
        backgroundColor: headerComputed.backgroundColor,
        backgroundImage: headerComputed.backgroundImage,
        background: headerComputed.background,
        color: headerComputed.color
      }, 'C');
    }

    // Hypothesis D: Check body/html margins
    const bodyComputed = window.getComputedStyle(document.body);
    const htmlComputed = window.getComputedStyle(document.documentElement);
    log('Body/HTML margins and padding', {
      bodyMargin: bodyComputed.margin,
      bodyPadding: bodyComputed.padding,
      htmlMargin: htmlComputed.margin,
      htmlPadding: htmlComputed.padding,
      bodyBackground: bodyComputed.backgroundColor
    }, 'D');

    // Hypothesis E: Check logo image dimensions and positioning
    if (logoWrapper) {
      const rect = logoWrapper.getBoundingClientRect();
      log('Logo wrapper dimensions and position', {
        boundingRect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        },
        offsetTop: logoWrapper.offsetTop,
        offsetLeft: logoWrapper.offsetLeft
      }, 'E');
    }
  }

  function debugHeroTitle() {
    // Debug hero title centering
    const heroTitle = document.querySelector('.hero-title-main');
    if (heroTitle) {
      const computed = window.getComputedStyle(heroTitle);
      const rect = heroTitle.getBoundingClientRect();
      const parent = heroTitle.parentElement;
      const parentRect = parent ? parent.getBoundingClientRect() : null;
      const viewportWidth = window.innerWidth;
      
      log('Hero title centering debug', {
        textAlign: computed.textAlign,
        marginLeft: computed.marginLeft,
        marginRight: computed.marginRight,
        margin: computed.margin,
        width: computed.width,
        display: computed.display,
        position: computed.position,
        left: computed.left,
        right: computed.right,
        transform: computed.transform,
        boundingRect: {
          left: rect.left,
          right: rect.right,
          width: rect.width,
          center: rect.left + rect.width / 2
        },
        viewportWidth: viewportWidth,
        viewportCenter: viewportWidth / 2,
        offsetFromCenter: (rect.left + rect.width / 2) - (viewportWidth / 2),
        parentWidth: parentRect ? parentRect.width : null,
        parentLeft: parentRect ? parentRect.left : null
      }, 'HERO_CENTER');
    } else {
      log('Hero title NOT FOUND', {}, 'HERO_CENTER');
    }
  }
})();
// #endregion



