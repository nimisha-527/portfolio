<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useApiHandling } from '../stores/apiHandling'
import Nav from "../components/Nav.vue";

defineOptions({ name: 'HomePage' })

const { data } = storeToRefs(useApiHandling())
const name = computed(() => contentValue(data.value?.homePage?.yourName) ?? 'Nimisha')
const role = computed(
  () => contentValue(data.value?.homePage?.yourRole) ?? 'Frontend Engineer',
)
const summary = computed(
  () =>
    contentValue(data.value?.aboutPage?.summary) ??
    'Building reactive, high-performance UI components with modern state architecture and seamless end-to-end API integrations.',
)

function contentValue(value: string | undefined) {
  const content = value?.trim()
  return content && !content.startsWith('$') ? content : undefined
}
</script>

<template>
  <div class="home-page">
    <section id="home" class="hero" aria-labelledby="hero-title">
      <div class="watermark" aria-hidden="true">portfolio</div>

      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span> Portfolio / 2026</p>
        <h1 id="hero-title">
          {{ role }}<span class="accent-period">.</span>
        </h1>
        <p class="intro">
          Hi, I’m <span class="name">{{ name }}</span> — {{ summary }}
        </p>
        <RouterLink class="work-button" to="/work">
          <span>My work</span>
          <span class="button-arrow" aria-hidden="true">↗</span>
        </RouterLink>
      </div>

      <div class="portrait-wrap">
        <div class="portrait-frame">
          <!-- https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1100&q=85 -->
          <img
            class="portrait"
            src="../../assets/portfolio-pic-purple.png"
            alt="Portrait placeholder"
          />
        </div>
        <span class="portrait-orbit orbit-one" aria-hidden="true"></span>
        <span class="portrait-orbit orbit-two" aria-hidden="true"></span>
      </div>
      <Nav />
    </section>
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.home-page {
  --ink: #302722;
  --muted: #75675f;
  --clay: #a47864;
  --paper: #f5f1eb;
  --sage: #e8ebe4;

  width: 100%;
  margin: 0 auto;
  color: var(--ink);
}

.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(15rem, 0.9fr) minmax(20rem, 1.08fr) 5.5rem;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 4.5rem);
  width: min(100%, 90rem);
  min-height: min(48rem, calc(100svh - 2rem));
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2.5rem) clamp(0rem, 2vw, 2rem);
  isolation: isolate;
}

.watermark {
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  width: max-content;
  color: rgb(164 120 100 / 8%);
  font-size: clamp(7rem, 19.5vw, 18rem);
  font-weight: 800;
  letter-spacing: -0.105em;
  line-height: 0.8;
  pointer-events: none;
  transform: translate(-54%, -51%);
  user-select: none;
}

.hero-copy {
  position: relative;
  z-index: 1;
  padding: 2rem 0;
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

.status-dot {
  width: 0.48rem;
  height: 0.48rem;
  border-radius: 50%;
  background: var(--clay);
  box-shadow: 0 0 0 0.28rem rgb(164 120 100 / 12%);
}

.hero h1 {
  max-width: 10ch;
  margin: 1.6rem 0 1.15rem;
  font-size: clamp(2.8rem, 5vw, 5.5rem);
  font-weight: 550;
  letter-spacing: -0.075em;
  line-height: 0.99;
}

.accent-period,

.intro {
  max-width: 27rem;
  margin: 0;
  color: var(--muted);
  font-size: clamp(0.98rem, 1.35vw, 1.1rem);
  line-height: 1.8;
}

.name {
  color: var(--ink);
  font-weight: 700;
}

.work-button {
  display: inline-flex;
  align-items: center;
  gap: 1.7rem;
  min-height: 3.5rem;
  margin-top: 2rem;
  padding: 0.4rem 0.55rem 0.4rem 1.35rem;
  border: 1px solid var(--clay);
  border-radius: 999px;
  background: var(--clay);
  box-shadow: 0 0.65rem 1.6rem rgb(164 120 100 / 32%), 0 0 1.8rem rgb(164 120 100 / 17%);
  color: #fffaf6;
  font-size: 0.92rem;
  font-weight: 650;
  text-decoration: none;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background-color 180ms ease;
}

.work-button:hover {
  transform: translateY(-2px);
  background: #916b58;
  box-shadow: 0 0.85rem 2rem rgb(164 120 100 / 38%), 0 0 2.2rem rgb(164 120 100 / 24%);
}

.button-arrow {
  display: grid;
  width: 2.45rem;
  height: 2.45rem;
  place-items: center;
  border-radius: 50%;
  background: rgb(255 255 255 / 18%);
  font-size: 1.15rem;
}

.portrait-wrap {
  position: relative;
  display: grid;
  min-height: clamp(27rem, 67vh, 42rem);
  place-items: center;
  isolation: isolate;
}

.portrait-frame {
  position: relative;
  z-index: 1;
  width: min(100%, 27rem);
  height: clamp(25rem, 65vh, 40rem);
  overflow: hidden;
  border: 0.65rem solid rgb(255 255 255 / 75%);
  border-radius: 48% 48% 1.2rem 1.2rem;
  background: #d7c6ba;
  box-shadow: 0 2.2rem 5rem rgb(69 49 37 / 19%), 0 0.45rem 1.2rem rgb(69 49 37 / 8%);
  transform: translateY(-0.2rem);
}

.portrait {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 36%;
}

.portrait-frame::after {
  position: absolute;
  inset: 45% 0 0;
  background: linear-gradient(180deg, transparent, rgb(36 28 24 / 56%));
  content: '';
}

.portrait-orbit {
  position: absolute;
  z-index: -1;
  border: 1px solid rgb(164 120 100 / 28%);
  border-radius: 50%;
}

.orbit-one {
  width: 97%;
  aspect-ratio: 1;
}

.orbit-two {
  width: 111%;
  aspect-ratio: 1;
  border-color: rgb(164 120 100 / 15%);
}

.portrait-stamp {
  position: absolute;
  z-index: 2;
  top: 13%;
  right: -0.7rem;
  display: grid;
  width: 5.1rem;
  height: 5.1rem;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 70%);
  border-radius: 50%;
  background: var(--sage);
  color: #635b50;
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  line-height: 1.5;
  text-align: center;
  transform: rotate(12deg);
}

.work-button:focus-visible {
  outline: 3px solid var(--clay);
  outline-offset: 4px;
}

@media (max-width: 62rem) {
  .hero {
    grid-template-columns: minmax(13rem, 0.8fr) minmax(18rem, 1fr) 4.75rem;
    gap: 1.3rem;
  }

  .hero h1 {
    font-size: clamp(2.6rem, 5.5vw, 4.2rem);
  }
}

@media (max-width: 48rem) {
  .hero {
    grid-template-columns: minmax(0, 1fr) 4.25rem;
    min-height: auto;
    padding: 2.5rem 0 3rem;
  }

  .watermark {
    top: 44%;
    font-size: clamp(6rem, 22vw, 11rem);
  }

  .hero-copy {
    grid-column: 1;
    grid-row: 1;
    padding: 1rem 0 0;
  }

  .hero h1 {
    max-width: 12ch;
    margin-top: 1.15rem;
    font-size: clamp(2.6rem, 9vw, 4rem);
  }

  .portrait-wrap {
    grid-column: 1;
    grid-row: 2;
    min-height: 30rem;
  }

  .portrait-frame {
    width: min(78%, 24rem);
    height: 30rem;
  }

  .portrait-stamp {
    right: 2%;
  }
}

@media (max-width: 36rem) {
  .hero {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    padding-top: 1.5rem;
  }

  .hero-copy {
    grid-column: 1;
  }

  .hero h1 {
    max-width: 11ch;
  }

  .portrait-wrap {
    min-height: 25rem;
  }

  .portrait-frame {
    width: min(78%, 20rem);
    height: 25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .work-button {
    transition: none;
  }
}
</style>
