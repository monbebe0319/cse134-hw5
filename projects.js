// projects.js

// Optional: define <projects-grid> as a custom element
class ProjectsGrid extends HTMLElement {}
customElements.define("projects-grid", ProjectsGrid);

// Your project data (HW5 Part 1 – hardcoded)
const projects = [
  {
    title: "Zoo Simulator Project",
    image: "img/zoo.png",
    imageAlt: "Screenshot of the zoo simulator project",
    description:
      "Developed a zoo simulator game using Java, where players design enclosures, manage animals, and grow their zoo using object-oriented principles.",
    tags: "Java, OOP, Game Development",
  },
  {
    title: "Speech-to-Text (Speechify-Style) App",
    image: "img/mic.png",
    imageAlt: "Microphone icon representing speech to text application",
    description:
      "Created a speech-to-text application that turns spoken audio into text, improving accessibility and note-taking with real-time transcription.",
    tags: "TypeScript, APIs, Accessibility",
  }
];

function createProjectCard(project) {
  const card = document.createElement("project-card");
  card.setAttribute("title", project.title);
  card.setAttribute("image", project.image);
  card.setAttribute("image-alt", project.imageAlt);
  card.setAttribute("description", project.description);
  card.setAttribute("tags", project.tags);
  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("projects-grid");
  if (!grid) return;

  projects.forEach((project) => {
    const card = createProjectCard(project);
    grid.appendChild(card);
  });
});
