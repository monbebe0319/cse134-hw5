class ProjectButtons extends HTMLElement {}
customElements.define("project-buttons", ProjectButtons);

class ProjectsGrid extends HTMLElement {}
customElements.define("projects-grid", ProjectsGrid);

const LOCAL_STORAGE_KEY = "stormy-projects";

const LOCAL_SEED_PROJECTS = [
  {
    id: 1,
    title: "Zoo Simulator Project",
    image: "img/zoo.png",
    imageAlt: "Screenshot of the zoo simulator project",
    description:
      "Developed a zoo simulator game using Java, where players design enclosures, manage animals, and grow their zoo using object-oriented principles.",
    tags: "Java, OOP, Game Development",
  },
  {
    id: 2,
    title: "Speech-to-Text (Speechify-Style) App",
    image: "img/mic.png",
    imageAlt: "Microphone icon representing speech to text application",
    description:
      "Created a speech-to-text application that turns spoken audio into text, improving accessibility and note-taking with real-time transcription.",
    tags: "TypeScript, APIs, Accessibility",
  },
];

function seedLocalStorageIfEmpty() {
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_SEED_PROJECTS));
  }
}


function createProjectCard(project) {
  const card = document.createElement("project-card");
  card.setAttribute("title", project.title || "Untitled Project");
  card.setAttribute("image", project.image || "img/logo.png");
  card.setAttribute(
    "image-alt",
    project.imageAlt || `${project.title || "Project"} preview image`,
  );
  card.setAttribute(
    "description",
    project.description || "No description provided yet.",
  );
  card.setAttribute("tags", project.tags || "");
  return card;
}

function renderProjects(projects) {
  const grid = document.querySelector("projects-grid");
  if (!grid) return;

  projects.forEach((project) => {
    const card = createProjectCard(project);
    grid.appendChild(card);
  });
}


function loadLocalProjects() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      console.warn("No local projects found in localStorage.");
      return;
    }
    const projects = JSON.parse(data);
    if (!Array.isArray(projects)) {
      console.error("Local projects data is not an array:", projects);
      return;
    }
    renderProjects(projects);
  } catch (err) {
    console.error("Error loading local projects:", err);
  }
}

const REMOTE_PROJECTS_URL =
  "https://api.jsonbin.io/v3/qs/6934ac46d0ea881f4017764c";


async function loadRemoteProjects() {
  try {
    const response = await fetch(REMOTE_PROJECTS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const projects = Array.isArray(data) ? data : data.record;

    if (!Array.isArray(projects)) {
      console.error("Remote data is not an array:", projects);
      return;
    }

    renderProjects(projects);
  } catch (err) {
    console.error("Error loading remote projects:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  seedLocalStorageIfEmpty();

  const localBtn = document.getElementById("load-local");
  const remoteBtn = document.getElementById("load-github"); // your remote button id

  if (localBtn) {
    localBtn.addEventListener("click", loadLocalProjects);
  }

  if (remoteBtn) {
    remoteBtn.addEventListener("click", loadRemoteProjects);
  }
});
