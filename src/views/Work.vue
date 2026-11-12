<script setup lang="ts">
import Nav from '../components/Nav.vue'
import PortfolioCard from '../components/Card.vue'
import readingBlissPreview from '../../assets/Reading-Bliss.mp4'

defineOptions({ name: 'WorkPage' })

interface Project {
  title: string
  description: string
  technologies: string[]
  href: string
  githubHref?: string
  previewVideo?: string
}

const projects: Project[] = [
  {
    title: 'Reading Bliss',
    description:
      "A personal book library where users can add, browse and manage their favourite books effortlessly. If you've ever lost track of book recommendations or struggled with scattered notes, this platform is for you!",
    technologies: ['EJS', 'JavaScript', 'Express.js', 'MongoDB'],
    href: 'https://reading-bliss.onrender.com/',
    githubHref: 'https://github.com/nimisha-527/the-reading-bliss',
    previewVideo: readingBlissPreview,
  },
  {
    title: 'create-webapp-kit',
    description:
      'A CLI to scaffold a full-stack web app with a modern frontend, backend, and database setup.',
    technologies: ['CLI', 'Vue.js', 'React.js', 'Express.js', 'MongoDB'],
    href: 'https://www.npmjs.com/package/create-webapp-kit',
    githubHref: 'https://github.com/nimisha-527/create-webapp-kit',
  },
]
</script>

<template>
  <div class="work-layout">
    <main class="work-page">
      <header class="work-heading">
        <p class="eyebrow">
          <span class="heading-dot" aria-hidden="true"></span> Selected projects
        </p>
        <h1>A few things I’ve <span>made.</span></h1>
        <p class="intro">
          A selection of experiments and personal projects, made with curiosity and care.
        </p>
      </header>

      <section class="project-grid" aria-label="Projects">
        <PortfolioCard
          v-for="(project, index) in projects"
          :key="project.title"
          class="project-card"
          as-container
        >
          <div class="project-preview" :class="`preview-${index + 1}`">
            <video
              v-if="project.previewVideo"
              class="preview-video"
              :src="project.previewVideo"
              muted
              loop
              autoplay
              playsinline
              preload="metadata"
              :aria-label="`${project.title} site preview`"
            ></video>
            <template v-else>
              <span class="preview-window" aria-hidden="true">
                <span class="window-dots"><i></i><i></i><i></i></span>
                <span class="window-content">
                  <span class="window-kicker">PROJECT / 0{{ index + 1 }}</span>
                  <span class="window-title">{{ project.title }}</span>
                  <span class="window-line"></span>
                </span>
              </span>
            </template>
          </div>
          <div class="project-info">
            <div class="project-chips" aria-label="Project category and technologies">
              <span v-for="technology in project.technologies" :key="technology" class="tech-chip">
                {{ technology }}
              </span>
            </div>
            <div class="project-copy">
              <h2>{{ project.title }}</h2>
              <p>{{ project.description }}</p>
            </div>
          </div>
          <template #footer>
            <div class="project-links">
              <a
                v-if="project.href"
                class="project-link category-chip project-link--visit"
                :href="project.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Visit ${project.title} site`"
              >
                Visit Site <span aria-hidden="true">↗</span>
              </a>
              <a
                v-if="project.githubHref"
                class="project-link category-chip project-link--github"
                :href="project.githubHref"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`View ${project.title} on GitHub`"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </template>
        </PortfolioCard>
      </section>
    </main>
    <Nav />
  </div>
</template>

<style scoped>
.work-layout {
  --ink: #302722;
  --muted: #75675f;
  --clay: #a47864;

  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 5.5rem;
  align-items: start;
  gap: clamp(2rem, 5vw, 5rem);
  width: min(100%, 90rem);
  min-height: calc(100svh - 2rem);
  margin: 0 auto;
  padding: clamp(2rem, 6vw, 5rem);
  color: var(--ink);
}

.work-page {
  min-width: 0;
}

.work-heading {
  max-width: 46rem;
  margin: 0 0 clamp(2rem, 5vw, 3.5rem);
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0;
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.heading-dot {
  width: 0.48rem;
  height: 0.48rem;
  border-radius: 50%;
  background: var(--clay);
  box-shadow: 0 0 0 0.28rem rgb(164 120 100 / 12%);
}

.work-heading h1 {
  margin: 1.25rem 0 0.75rem;
  font-size: clamp(2.7rem, 6vw, 5.5rem);
  font-weight: 550;
  letter-spacing: -0.075em;
  line-height: 1;
}

.work-heading h1 span {
  color: var(--clay);
}

.intro {
  max-width: 34rem;
  margin: 0;
  color: var(--muted);
  font-size: 1.02rem;
  line-height: 1.75;
}

.project-grid {
  display: grid;
  min-width: 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2.5vw, 1.75rem);
}

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgb(164 120 100 / 20%);
  border-radius: 1rem;
  background: rgb(255 255 255 / 75%);
  color: var(--ink);
  text-align: left;
  box-shadow: 0 0.7rem 2rem rgb(69 49 37 / 6%);
}

.project-preview {
  position: relative;
  display: grid;
  min-height: clamp(12rem, 25vw, 19rem);
  overflow: hidden;
  place-items: center;
  padding: 1.5rem;
  background:
    radial-gradient(ellipse at 75% 15%, rgb(255 255 255 / 54%), transparent 42%),
    linear-gradient(140deg, #d6c1b2, #eee6de 58%, #b99986);
}

.preview-2 {
  background:
    radial-gradient(ellipse at 24% 20%, rgb(255 255 255 / 70%), transparent 40%),
    linear-gradient(145deg, #dce1d7, #f1eee8 55%, #c3b9a8);
}

.preview-window {
  display: flex;
  flex-direction: column;
  width: min(100%, 24rem);
  min-height: 10.5rem;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 78%);
  border-radius: 0.6rem;
  background: rgb(250 248 244 / 88%);
  box-shadow: 0 1rem 2.5rem rgb(69 49 37 / 17%);
}

.preview-2 .preview-window {
  transform: rotate(1.5deg);
}

.preview-3 .preview-window {
  transform: rotate(-1deg);
}

.window-dots {
  display: flex;
  gap: 0.3rem;
  padding: 0.65rem 0.75rem;
  border-bottom: 1px solid rgb(164 120 100 / 14%);
}

.window-dots i {
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 50%;
  background: #c69b83;
}

.window-dots i:nth-child(2) {
  background: #d7c6a9;
}

.window-dots i:nth-child(3) {
  background: #a8b19e;
}

.window-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1.25rem;
}

.window-kicker {
  color: #947461;
  font-size: 0.55rem;
  font-weight: 750;
  letter-spacing: 0.15em;
}

.window-title {
  max-width: 12ch;
  margin-top: 0.55rem;
  color: #40362f;
  font-size: clamp(1.15rem, 2.2vw, 1.8rem);
  font-weight: 650;
  letter-spacing: -0.06em;
  line-height: 1.1;
}

.window-line {
  width: 2rem;
  height: 2px;
  margin-top: 0.75rem;
  background: var(--clay);
}

.preview-video {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
}

.project-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 24px;
}

.project-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.category-chip,
.tech-chip {
  display: inline-flex;
  align-items: center;
  min-height: 1.7rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.67rem;
  font-weight: 650;
  line-height: 1.2;
}

.category-chip {
  background: #382e29;
  color: #fffaf6;
}

.tech-chip {
  border: 1px solid rgb(164 120 100 / 22%);
  background: #f4eee8;
  color: #725747;
}

.project-copy {
  flex: 1;
  gap: 1.5rem;
  margin-top: 1.15rem;
}

.project-copy h2 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.035em;
}

.project-copy p {
  max-width: 28rem;
  margin: 0.4rem 0 0;
  color: var(--muted);
  font-size: 0.83rem;
  line-height: 1.55;
}

.project-links {
  display: inline-flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.45rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.6rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 750;
  text-decoration: none;
  transition:
    background-color 160ms ease,
    color 160ms ease;
}

.project-link--visit:hover {
  background: #805c4b;
  color: #fffaf6;
}

.project-link--github {
  background: #a47864;
}

.project-link--github:hover {
  background: #805c4b;
  color: #fffaf6;
}

.project-link:focus-visible {
  outline: 2px solid rgb(255 255 255 / 75%);
  outline-offset: 3px;
}

@media (max-width: 62rem) {
  .work-layout {
    grid-template-columns: minmax(0, 1fr) 4.75rem;
    gap: 1.5rem;
  }
}

@media (max-width: 48rem) {
  .work-layout {
    grid-template-columns: minmax(0, 1fr) 4.25rem;
    gap: 1rem;
  }

  .project-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .project-preview {
    min-height: clamp(14rem, 48vw, 20rem);
  }
}

@media (max-width: 36rem) {
  .work-layout {
    display: block;
    padding-top: 1rem;
  }

  .project-copy {
    align-items: flex-start;
  }

  .project-links {
    flex-direction: row;
  }
}

@media (prefers-reduced-motion: reduce) {
  .preview-window,
  .project-link {
    transition: none;
  }
}
</style>
