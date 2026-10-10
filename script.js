
const projects = {
  geometry: {
    title: "Geometry Lab",
    category: "Visual systems · Research",
    description:
      "An exploration of geometric relationships, visual structures and the principles connecting shapes, space and systems.",
    repository: "https://github.com/bdul-lab",
    media: [
      {
        type: "image",
        src: "media/geometry-01.jpg",
        alt: "Geometric visual study"
      },
      {
        type: "image",
        src: "media/geometry-02.jpg",
        alt: "Geometric composition"
      }
    ]
  },

  digital: {
    title: "Digital Systems",
    category: "Technology · Development",
    description:
      "Experiments in digital architecture, interactive experiences and practical tools designed to turn ideas into working systems.",
    repository: "https://github.com/bdul-lab",
    media: [
      {
        type: "image",
        src: "media/digital-01.jpg",
        alt: "Digital project preview"
      },
      {
        type: "video",
        src: "media/digital-demo.mp4",
        alt: "Digital project demonstration"
      }
    ]
  },

  data: {
    title: "Data Explorations",
    category: "Data · Insights",
    description:
      "Data-driven explorations focused on revealing patterns, communicating insights and supporting better decisions.",
    repository: "https://github.com/bdul-lab",
    media: [
      {
        type: "image",
        src: "media/data-01.jpg",
        alt: "Data visualisation"
      },
      {
        type: "image",
        src: "media/data-02.jpg",
        alt: "Data analysis preview"
      }
    ]
  }
};

const modal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalDescription = document.querySelector("#modal-description");
const modalGallery = document.querySelector("#modal-gallery");
const modalRepository = document.querySelector("#modal-repository");

let lastFocusedElement = null;

function openProject(projectId) {
  const project = projects[projectId];

  if (!project || !modal) return;

  lastFocusedElement = document.activeElement;

  modalTitle.textContent = project.title;
  modalCategory.textContent = project.category;
  modalDescription.textContent = project.description;
  modalRepository.href = project.repository;

  // Clear previous project media.
  modalGallery.replaceChildren();

  if (project.media && project.media.length > 0) {
    project.media.forEach((media) => {
      let element;

      if (media.type === "image") {
        element = document.createElement("img");
        element.src = media.src;
        element.alt = media.alt || project.title;
        element.loading = "lazy";
      } else if (media.type === "video") {
        element = document.createElement("video");
        element.src = media.src;
        element.controls = true;
        element.preload = "metadata";
        element.setAttribute("aria-label", media.alt || project.title);
      } else {
        return;
      }

      element.addEventListener("error", () => {
        const placeholder = document.createElement("div");
        placeholder.className = "media-placeholder";
        placeholder.textContent = `Media unavailable: ${media.src}`;
        element.replaceWith(placeholder);
      }, { once: true });

      modalGallery.appendChild(element);
    });
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "media-placeholder";
    placeholder.textContent = "Project media coming soon.";
    modalGallery.appendChild(placeholder);
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  modal.querySelector(".modal-close").focus();
}

function closeProject() {
  if (!modal || !modal.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  // Stop any videos playing in the closed pop-in.
  modalGallery.querySelectorAll("video").forEach((video) => {
    video.pause();
  });

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Open a project when its card is clicked.
document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", () => {
    openProject(card.dataset.project);
  });
});

// Close via the X button or backdrop.
modal.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeProject);
});

// Close with Escape.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProject();
  }
});
