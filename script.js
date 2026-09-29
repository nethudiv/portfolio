document.addEventListener("DOMContentLoaded", () => {
  // ================= NAVBAR =================
  const navbar = document.getElementById("mainNav");
  const backToTop = document.getElementById("backToTop");

  function updateScrollUI() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", updateScrollUI);
  updateScrollUI();

  // ================= BACK TO TOP =================
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ================= MOBILE NAV =================
  const navLinks = document.querySelectorAll("#navbarContent .nav-link");
  const navbarCollapse = document.getElementById("navbarContent");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        const collapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (collapse) collapse.hide();
      }
    });
  });

  // ================= ACTIVE NAV =================
  const sections = document.querySelectorAll("main section[id]");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => navObserver.observe(section));

  // ================= SCROLL REVEAL =================
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => revealObserver.observe(element));

  // ================= TYPING EFFECT =================
  const typedText = document.getElementById("typedText");
  const roles = [
      "WordPress Developer",
      "Front-End Web Developer",
      "UI/UX Designer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeRole() {
    const current = roles[roleIndex];

    if (!deleting) {
      typedText.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeRole, 1600);
        return;
      }
    } else {
      typedText.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeRole, deleting ? 45 : 75);
  }

  setTimeout(typeRole, 900);

  // ================= CONTACT FORM =================
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) return;

    // This opens the visitor's default email application.
    // For a real production contact form, connect Formspree, EmailJS,
    // a PHP mail endpoint, or your own backend.
    const destination = "nethmihettihewa2000@gmail.com";
    const mailSubject = encodeURIComponent(`${subject} - Portfolio Contact`);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${destination}?subject=${mailSubject}&body=${mailBody}`;

    formMessage.textContent = "Opening your email application...";
    formMessage.style.display = "block";
  });

  // ================= CURRENT YEAR =================
  document.getElementById("year").textContent = new Date().getFullYear();
});


  // ================= ADVANCED FEATURES =================
  // Dark / light mode with localStorage
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") document.body.classList.add("dark-mode");

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.innerHTML = document.body.classList.contains("dark-mode")
      ? '<i class="bi bi-sun-fill"></i>'
      : '<i class="bi bi-moon-stars-fill"></i>';
  }
  updateThemeIcon();

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "portfolio-theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
    updateThemeIcon();
  });

  // Scroll progress bar
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = `${progress}%`;
  });

  // Animated statistics counters
  const counters = document.querySelectorAll(".stat-number");
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 30);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      projectCards.forEach(card => {
        const categories = card.dataset.category || "";
        card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
      });
    });
  });

  // Project case-study modal
  const projectModalElement = document.getElementById("projectModal");
  const projectModal = projectModalElement ? new bootstrap.Modal(projectModalElement) : null;

  document.querySelectorAll(".project-details-btn").forEach(button => {
    button.addEventListener("click", () => {
      const title = button.dataset.title || "Project";
      const type = button.dataset.type || "Project";
      const role = button.dataset.role || "Web Development";
      const description = button.dataset.description || "";
      const live = button.dataset.live || "";
      const github = button.dataset.github || "";

      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalType").textContent = type;
      document.getElementById("modalTypeCard").textContent = type;
      document.getElementById("modalRole").textContent = role;
      document.getElementById("modalDescription").textContent = description;

      document.getElementById("modalFeatures").innerHTML = (button.dataset.features || "")
        .split(",")
        .map(feature => feature.trim())
        .filter(Boolean)
        .map(feature => `<span><i class="bi bi-check2 me-1"></i>${feature}</span>`)
        .join("");

      document.getElementById("modalTech").innerHTML = (button.dataset.tech || "")
        .split(",")
        .map(tech => tech.trim())
        .filter(Boolean)
        .map(tech => `<span>${tech}</span>`)
        .join("");

      const liveButton = document.getElementById("modalLive");
      const githubButton = document.getElementById("modalGithub");
      const repositoryNote = document.getElementById("modalRepositoryNote");

      if (live) {
        liveButton.href = live;
        liveButton.style.display = "inline-flex";
      } else {
        liveButton.removeAttribute("href");
        liveButton.style.display = "none";
      }

      // GitHub is optional. WordPress projects do not show this button.
      if (github) {
        githubButton.href = github;
        githubButton.style.display = "inline-flex";
        repositoryNote.style.display = "none";
      } else {
        githubButton.removeAttribute("href");
        githubButton.style.display = "none";
        repositoryNote.style.display = "flex";
      }

      projectModal?.show();
    });
  });
