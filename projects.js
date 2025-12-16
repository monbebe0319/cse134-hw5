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
  card.setAttribute("image-alt", project.imageAlt || "");
  card.setAttribute("description", project.description || "");
  card.setAttribute("tags", project.tags || "");
  return card;
}

function renderProjects(projects) {
  const grid = document.querySelector("projects-grid");
  if (!grid) return;
  grid.innerHTML = "";
  projects.forEach((p) => grid.appendChild(createProjectCard(p)));
}

function loadLocalProjects() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) return;
  const projects = JSON.parse(data);
  if (!Array.isArray(projects)) return;
  renderProjects(projects);
}

const REMOTE_PROJECTS_URL =
  "https://raw.githubusercontent.com/monbebe0319/cse134-hw5/main/remote-projects.json";

async function loadRemoteProjects() {
  const response = await fetch(REMOTE_PROJECTS_URL, { cache: "no-store" });
  if (!response.ok) return;
  const projects = await response.json();
  if (!Array.isArray(projects)) return;
  renderProjects(projects);
}

document.addEventListener("DOMContentLoaded", () => {
  seedLocalStorageIfEmpty();
  const localBtn = document.getElementById("load-local");
  const remoteBtn = document.getElementById("load-github");
  if (localBtn) localBtn.addEventListener("click", loadLocalProjects);
  if (remoteBtn) remoteBtn.addEventListener("click", loadRemoteProjects);
});
