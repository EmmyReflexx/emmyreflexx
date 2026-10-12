document.addEventListener("DOMContentLoaded", function () {
  const EMAIL = "ukeemmanuel68@gmail.com";

  const header = document.querySelector("header");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".header-right nav");
  const navLinks = document.querySelectorAll(".header-right nav a");
  const backToTop = document.getElementById("backToTop");

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Header / scroll ---------- */
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 100);
    backToTop.classList.toggle("show", window.scrollY > 600);
  });
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    nav.classList.remove("active");
    document.body.style.overflow = "";
  }
  mobileMenuBtn.addEventListener("click", function () {
    const open = nav.classList.toggle("active");
    this.classList.toggle("active", open);
    this.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  navLinks.forEach((link) =>
    link.addEventListener("click", closeMenu)
  );
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header-right") && nav.classList.contains("active")) closeMenu();
  });

  /* ---------- Active nav link on scroll ---------- */
  const sectionIds = ["home", "aboutMe", "skills", "myProjects", "contactMe"];
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id && !l.classList.contains("nav-cta"))
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sectionIds.forEach((id) => {
    const el = id === "home" ? document.getElementById("heroSection") : document.getElementById(id);
    if (el) {
      if (id === "home") el.dataset.spy = "home";
      spy.observe(el);
    }
  });
  // hero section has id heroSection; map it to #home
  const heroEl = document.getElementById("heroSection");
  new IntersectionObserver(
    (e) => e[0].isIntersecting && navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#home")),
    { rootMargin: "-45% 0px -50% 0px" }
  ).observe(heroEl);

  /* ---------- Skills data ---------- */
  const PROJECTS = {
    vault: { name: "Reflexx File Vault", url: "https://reflexxstorage.vercel.app/" },
    photo: { name: "Rex Photo Editor", url: "https://reflexx-photo-editor.netlify.app/" },
    shop: { name: "TheShop", url: "https://emmyreflexx.github.io/theshop/" },
  };

  const SKILLS = [
    {
      id: "nextjs",
      name: "Next.js",
      icon: "▲",
      level: "Fullstack framework",
      summary:
        "I use Next.js to build fast, SEO-friendly React applications with server rendering, routing and API routes in one codebase.",
      points: [
        "Pages, layouts and nested routing with the App Router",
        "Server and client rendering for speed and SEO",
        "API routes and server actions for backend logic",
        "Deploying to Vercel with environment-based configuration",
      ],
      projects: [],
    },
    {
      id: "react",
      name: "React",
      icon: "⚛",
      level: "Core strength",
      summary:
        "React is my main tool for building interactive interfaces, from small widgets to full multi-page applications with shared state.",
      points: [
        "Reusable component architecture and custom hooks",
        "Client-side routing with React Router",
        "Custom state management with persistent storage (IndexedDB and localStorage)",
        "Recursive components for tree structures such as nested folders",
      ],
      projects: ["vault"],
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      icon: "🎨",
      level: "Styling",
      summary:
        "I style interfaces with Tailwind CSS to move quickly while keeping designs consistent, responsive and easy to maintain.",
      points: [
        "Responsive, mobile-first layouts",
        "Theme systems with dark and light mode",
        "Consistent spacing, type and colour scales",
        "Pairing with component libraries like PrimeReact",
      ],
      projects: ["vault"],
    },
    {
      id: "firebase",
      name: "Firebase",
      icon: "🔥",
      level: "Backend as a service",
      summary:
        "I use Firebase to add authentication, a database and hosting to apps without managing servers.",
      points: [
        "Email and social authentication",
        "Firestore for real-time data",
        "Storage for user uploads",
        "Security rules to protect user data",
      ],
      projects: [],
    },
    {
      id: "supabase",
      name: "Supabase",
      icon: "⚡",
      level: "Backend as a service",
      summary:
        "Supabase gives me a Postgres database, authentication and file storage, which suits apps that need relational data.",
      points: [
        "Postgres tables and relationships",
        "Authentication and row-level security",
        "File storage for user content",
        "Connecting cleanly to React and Next.js frontends",
      ],
      projects: [],
    },
    {
      id: "va",
      name: "Virtual Assistance",
      icon: "🗂",
      level: "Professional service",
      summary:
        "I help busy founders and teams stay organised so they can focus on the work that matters.",
      points: [
        "Inbox, calendar and schedule management",
        "Task tracking and follow-ups",
        "Research, data entry and document preparation",
        "Clear, timely communication and reporting",
      ],
      projects: [],
    },
    {
      id: "cs",
      name: "Customer Service",
      icon: "💬",
      level: "Professional service",
      summary:
        "I give customers fast, friendly and accurate support that builds trust in the business.",
      points: [
        "Responding to enquiries by email and chat",
        "Resolving issues patiently and escalating when needed",
        "Keeping a calm, professional tone",
        "Understanding product details to give accurate answers",
      ],
      projects: ["shop"],
    },
  ];

  /* ---------- Render skills ---------- */
  const grid = document.getElementById("skillsGrid");
  SKILLS.forEach((s) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "skill-card";
    btn.dataset.skill = s.id;
    btn.innerHTML =
      '<span class="skill-icon" aria-hidden="true">' + s.icon + "</span>" +
      '<span class="skill-name">' + s.name + "</span>" +
      '<span class="skill-hint">View details</span>';
    grid.appendChild(btn);
  });

  /* ---------- Modal ---------- */
  const modal = document.getElementById("skillModal");
  const mTitle = document.getElementById("modalTitle");
  const mIcon = document.getElementById("modalIcon");
  const mLevel = document.getElementById("modalLevel");
  const mSummary = document.getElementById("modalSummary");
  const mList = document.getElementById("modalList");
  const mProjects = document.getElementById("modalProjects");
  const mProjectsWrap = document.getElementById("modalProjectsWrap");
  let lastFocus = null;

  function openSkill(id) {
    const s = SKILLS.find((x) => x.id === id);
    if (!s) return;
    lastFocus = document.activeElement;
    mTitle.textContent = s.name;
    mIcon.textContent = s.icon;
    mLevel.textContent = s.level;
    mSummary.textContent = s.summary;
    mList.innerHTML = "";
    s.points.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = p;
      mList.appendChild(li);
    });
    mProjects.innerHTML = "";
    if (s.projects.length) {
      s.projects.forEach((key) => {
        const a = document.createElement("a");
        a.href = PROJECTS[key].url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = PROJECTS[key].name + " ↗";
        mProjects.appendChild(a);
      });
      mProjectsWrap.hidden = false;
    } else {
      mProjectsWrap.hidden = true;
    }
    document.body.style.overflow = "hidden";
    modal.showModal();
  }

  function closeModal() {
    modal.close();
  }

  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  });
  document.getElementById("modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(); // backdrop click
  });
  document.getElementById("modalCta").addEventListener("click", closeModal);
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".skill-card");
    if (card) openSkill(card.dataset.skill);
  });

  /* ---------- Contact form -> composed email ---------- */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const mailSubject = "Portfolio enquiry: " + subject;
    const body =
      "Hello Uke,\n\n" +
      message +
      "\n\n" +
      "--------------------\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Subject: " + subject + "\n" +
      "Sent from your portfolio website\n\n" +
      "Kind regards,\n" + name;

    const mailto =
      "mailto:" + EMAIL +
      "?subject=" + encodeURIComponent(mailSubject) +
      "&body=" + encodeURIComponent(body);

    const gmail =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(EMAIL) +
      "&su=" + encodeURIComponent(mailSubject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailto;

    success.innerHTML =
      "Your email app should open with the message ready to send. " +
      'If nothing opens, <a href="' + gmail + '" target="_blank" rel="noopener">compose it in Gmail</a>.';
    success.classList.add("show");
  });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    ".section-heading, .about-me-text, .visual-card, .skill-card, .project-card, .info-card, .contact-form-container, .hero-left, .hero-right"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    const hide = () => {
      if (preloader.classList.contains("hidden")) return;
      preloader.classList.add("hidden");
      preloader.addEventListener("transitionend", () => preloader.remove(), { once: true });
    };
    window.addEventListener("load", () => setTimeout(hide, 350));
    setTimeout(hide, 4000);
  }
});