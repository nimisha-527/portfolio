<script setup lang="ts">
defineOptions({ name: 'AboutPage' })

import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useApiHandling } from '../stores/apiHandling'
import Nav from '@/components/Nav.vue'

const { data } = storeToRefs(useApiHandling())

const aboutLabel = computed(() => contentValue(data.value?.aboutPage?.aboutLabel) ?? 'About')
const name = computed(() => contentValue(data.value?.homePage?.yourName))
const role = computed(() => contentValue(data.value?.homePage?.yourRole))
const summary = computed(
  () =>
    contentValue(data.value?.aboutPage?.summary) ??
    'I’m a web developer focused on building clean, accessible, and responsive applications. I enjoy turning ideas into practical digital experiences and growing my skills across frontend and full-stack development.',
)

function contentValue(value: string | undefined) {
  const content = value?.trim()
  return content && !content.startsWith('$') ? content : undefined
}
</script>

<template>
  <article class="about-page">
    <div class="about-layout">
      <section class="about-copy" aria-labelledby="about-title">
        <p class="eyebrow">
          <span class="heading-dot" aria-hidden="true"></span>{{ aboutLabel }}
        </p>
        <h1 id="about-title">
          <template v-if="name">Hello, I'm {{ name }}<span class="period">.</span></template>
          <template v-else>A little about me<span class="period">.</span></template>
        </h1>
        <p v-if="role" class="role">{{ role }}</p>
        <p class="summary">{{ summary }}</p>

        <div class="approach">
          <p class="section-label">Technical skills</p>
          <div class="approach-items">
            <section>
              <span class="approach-number">01</span>
              <h2>Frontend</h2>
              <p>JavaScript, HTML, CSS, Vue, and React.</p>
            </section>
            <section>
              <span class="approach-number">02</span>
              <h2>Backend</h2>
              <p>Node.js, Express, MongoDB, and REST APIs.</p>
            </section>
            <section>
              <span class="approach-number">03</span>
              <h2>Tools</h2>
              <p>Git, GitHub, VS Code, and Chrome DevTools.</p>
            </section>
          </div>
        </div>

        <div class="approach">
          <p class="section-label">Certifications</p>
          <div class="approach-items">
            <section>
              <span class="approach-number">01</span>
              <h2>Microsoft Azure Fundamentals</h2>
              <p>AZ-900 · Microsoft · August 2025</p>
            </section>
            <section>
              <span class="approach-number">02</span>
              <h2>Claude Code 101</h2>
              <p>Tech Mahindra · September 2026</p>
            </section>
          </div>
        </div>

        <div class="approach">
          <p class="section-label">Awards &amp; achievements</p>
          <div class="approach-items">
            <section>
              <span class="approach-number">01</span>
              <h2>ACE Award</h2>
              <p>Tech Mahindra Excellence · November 2024</p>
            </section>
            <section>
              <span class="approach-number">02</span>
              <h2>Bravo Award</h2>
              <p>October 2023</p>
            </section>
            <section>
              <span class="approach-number">03</span>
              <h2>Star Performer</h2>
              <p>February and April 2023</p>
            </section>
            <section>
              <span class="approach-number">04</span>
              <h2>Pat on Back</h2>
              <p>March 2024 and February 2026</p>
            </section>
            <section>
              <span class="approach-number">05</span>
              <h2>Spotlight</h2>
              <p>Featured in Success Stories · BORN Academy of Excellence · March 2023</p>
            </section>
          </div>
        </div>
      </section>
    </div>
    <Nav />
  </article>
</template>

<style scoped>
.about-page {
  --muted: #75675f;
  --clay: #a47864;
  
  box-sizing: border-box;
  width: min(100%, 72rem);
  margin: 0 auto;
  padding: clamp(2rem, 6vw, 5rem);
  border-radius: 1.25rem;
  background: #f5f1eb;
  color: #292421;
  display: flex;
}

.about-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(15rem, 0.65fr);
  align-items: center;
  gap: clamp(2.5rem, 7vw, 6rem);
}

.about-copy {
  max-width: 42rem;
}

.heading-dot {
  width: 0.48rem;
  height: 0.48rem;
  border-radius: 50%;
  background: var(--clay);
  box-shadow: 0 0 0 0.28rem rgb(164 120 100 / 12%);
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

.section-label {
  margin: 0;
  color: #8b6553;
  font-size: 0.78rem;
  font-weight: 750;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1 {
  max-width: 12ch;
  margin: 1rem 0 0.6rem;
  font-size: clamp(2.7rem, 6vw, 4.8rem);
  font-weight: 650;
  letter-spacing: -0.06em;
  line-height: 1.04;
}

.period {
  color: #a47864;
}

.role {
  margin: 0;
  color: #74675f;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
}

.summary {
  max-width: 39rem;
  margin: 1.75rem 0 0;
  color: #554b45;
  font-size: 1.05rem;
  line-height: 1.8;
}

.approach {
  margin-top: clamp(2.5rem, 5vw, 4rem);
}

.approach-items {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 1.25rem;
}

.approach-items section {
  padding-top: 0.85rem;
  border-top: 1px solid rgb(164 120 100 / 35%);
}

.approach-number {
  color: #a47864;
  font-size: 0.75rem;
  font-weight: 750;
  letter-spacing: 0.08em;
}

.approach-items h2 {
  margin: 0.7rem 0 0.4rem;
  font-size: 0.95rem;
}

.approach-items section p {
  margin: 0;
  color: #74675f;
  font-size: 0.88rem;
  line-height: 1.6;
}

.monogram {
  display: grid;
  width: 9rem;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 55%);
  border-radius: 50%;
  background: rgb(255 255 255 / 12%);
  font-size: 5rem;
  font-weight: 500;
  line-height: 1;
}

@media (max-width: 50rem) {
  .about-layout {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 36rem) {
  .about-page {
    padding: 2rem 1.25rem;
    border-radius: 0.9rem;
  }

  .approach-items {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
