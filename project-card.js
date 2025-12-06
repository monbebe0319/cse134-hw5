// project-card.js

class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title") || "Project Title";
    const image = this.getAttribute("image") || "img/logo.png";
    const imageAlt =
      this.getAttribute("image-alt") || `${title} preview image`;
    const description =
      this.getAttribute("description") || "No description provided yet.";
    const tags = this.getAttribute("tags") || "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Card CSS variables (defined globally in styleSheet.css) */
          --card-bg: var(--projects-card-bg, rgba(255, 255, 255, 0.95));
          --card-border-radius: var(--projects-card-radius, 1.25rem);
          --card-padding: var(--projects-card-padding, 1.25rem);
          --card-shadow: var(--projects-card-shadow, 0 8px 18px rgba(0, 0, 0, 0.08));
          --card-border: var(--projects-card-border, 0.1rem solid var(--accent-color));
          --card-title-color: var(--projects-card-title-color, var(--accent-color));
          --card-text-color: var(--projects-card-text-color, var(--text-color));
          --card-tag-bg: var(--projects-card-tag-bg, rgba(254, 140, 172, 0.12));

          display: block;
          height: 100%;
        }

        article.card {
          background: var(--card-bg);
          border-radius: var(--card-border-radius);
          padding: var(--card-padding);
          box-shadow: var(--card-shadow);
          border: var(--card-border);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          height: 100%;
        }

        figure.image-wrapper {
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
          aspect-ratio: 16 / 9;
          background: #fce9ff;
          margin: 0;
        }

        picture,
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        h2 {
          margin: 0.25rem 0 0;
          font-size: 1.1rem;
          font-weight: bold;
          letter-spacing: 0.03em;
          color: var(--card-title-color);
          font-family: 'CustomFontItaliana', sans-serif;
        }

        p.description {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--card-text-color);
          font-family: 'CustomFontItaliana', sans-serif;
        }

        ul.tags {
          list-style: none;
          padding: 0;
          margin: 0.25rem 0 0.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        li.tag {
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          font-size: 0.75rem;
          background: var(--card-tag-bg);
          font-family: 'CustomFontItaliana', sans-serif;
        }
      </style>

      <article class="card">
        <figure class="image-wrapper">
          <picture>
            <img src="${image}" alt="${imageAlt}">
          </picture>
        </figure>
        <h2>${title}</h2>
        <p class="description">${description}</p>
        <ul class="tags">
          ${tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
            .map((tag) => `<li class="tag">${tag}</li>`)
            .join("")}
        </ul>
      </article>
    `;
  }
}

customElements.define("project-card", ProjectCard);
