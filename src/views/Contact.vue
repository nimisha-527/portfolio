<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Nav from '../components/Nav.vue'
import MailToModal from '../components/modals/mailTo.vue'
import { useApiHandling } from '../stores/apiHandling'

defineOptions({ name: 'ContactPage' })

const { data } = storeToRefs(useApiHandling())
const contactLabel = computed(
  () => contentValue(data.value?.contactPage?.contactLabel) ?? 'Get in touch',
)
const emailAddress = computed(() => contentValue(data.value?.contactPage?.emailAddress))
const emailHost = computed(() => contentValue(data.value?.contactPage?.emailHost))
const fullEmailAddress = computed(() =>
  emailAddress.value ? `${emailAddress.value}${emailHost.value ?? ''}` : undefined,
)
const isMailModalOpen = ref(false)

function contentValue(value: string | undefined) {
  const content = value?.trim()
  return content && !content.startsWith('$') ? content : undefined
}

</script>

<template>
  <article class="contact-page">
    <main class="contact-content">
      <section aria-labelledby="contact-title">
        <p class="eyebrow">
          <span class="heading-dot" aria-hidden="true"></span>{{ contactLabel }}
        </p>
        <h1 id="contact-title">Let's make something <span>meaningful.</span></h1>
        <p class="intro">
          Have a project in mind, want to share an idea, or just say hello? I'd love to hear from you.
        </p>

        <div class="contact-links" aria-label="Contact links">
          <button
            v-if="emailAddress"
            type="button"
            class="contact-link email-link"
            aria-haspopup="dialog"
            @click="isMailModalOpen = true"
          >
            <span class="link-icon" aria-hidden="true">@</span>
            <span class="link-copy">
              <span class="link-label">Email</span>
              <span class="link-value">{{ emailAddress }} {{ emailHost }}</span>
            </span>
            <span class="link-arrow" aria-hidden="true">↗</span>
          </button>
          <div v-else class="contact-link email-link email-unavailable">
            <span class="link-icon" aria-hidden="true">@</span>
            <span class="link-copy">
              <span class="link-label">Email</span>
              <span class="link-value">Email address coming soon</span>
            </span>
          </div>

          <a
            class="contact-link github-link"
            href="https://github.com/nimisha-527"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Nimisha on GitHub (opens in a new tab)"
          >
            <span class="link-icon" aria-hidden="true">GH</span>
            <span class="link-copy">
              <span class="link-label">GitHub</span>
              <span class="link-value">Explore my projects</span>
            </span>
            <span class="link-arrow" aria-hidden="true">↗</span>
          </a>

          <a
            class="contact-link linkedin-link"
            href="https://www.linkedin.com/in/nimisha-jain-1405a931b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with Nimisha on LinkedIn (opens in a new tab)"
          >
            <span class="link-icon" aria-hidden="true">in</span>
            <span class="link-copy">
              <span class="link-label">LinkedIn</span>
              <span class="link-value">Let’s connect professionally</span>
            </span>
            <span class="link-arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <p class="availability">
          <span aria-hidden="true"></span> Open to thoughtful collaborations
        </p>
      </section>
    </main>
    <Nav />
    <MailToModal
      v-if="isMailModalOpen && fullEmailAddress"
      :email="fullEmailAddress"
      @close="isMailModalOpen = false"
    />
  </article>
</template>

<style scoped>
.contact-page {
  box-sizing: border-box;
  --ink: #302722;
  --muted: #75675f;
  --clay: #a47864;
  --clay-dark: #805c4b;
  --paper: #f5f1eb;

  width: min(100%, 72rem);
  margin: 0 auto;
  padding: clamp(2rem, 6vw, 5rem);
  border-radius: 1.25rem;
  background: #f5f1eb;
  color: #292421;
  display: flex;
}

.contact-content {
  display: grid;
  min-width: 0;
  grid-template-columns: minmax(0, 1.35fr) minmax(15rem, 0.65fr);
  align-items: center;
  gap: clamp(2.5rem, 7vw, 6rem);
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

h1 {
  max-width: 12ch;
  margin: 1.5rem 0 1rem;
  font-size: clamp(2.8rem, 6.5vw, 5.6rem);
  font-weight: 550;
  letter-spacing: -0.075em;
  line-height: 0.98;
}

h1 span {
  color: var(--clay);
}

.intro {
  max-width: 34rem;
  margin: 0;
  color: var(--muted);
  font-size: clamp(1rem, 1.5vw, 1.12rem);
  line-height: 1.8;
}

.contact-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: clamp(2rem, 5vw, 3.25rem);
}

.contact-link {
  display: flex;
  min-width: 0;
  min-height: 8rem;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem;
  border: 1px solid rgb(164 120 100 / 19%);
  border-radius: 1rem;
  background: rgb(255 255 255 / 68%);
  color: var(--ink);
  font: inherit;
  text-align: left;
  text-decoration: none;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.email-link {
  cursor: pointer;
}

.contact-link:hover {
  transform: translateY(-3px);
  border-color: rgb(164 120 100 / 50%);
  background: #fffdfa;
  box-shadow: 0 0.8rem 1.8rem rgb(69 49 37 / 8%);
}

.link-icon {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #f0e6df;
  color: var(--clay-dark);
  font-size: 0.78rem;
  font-weight: 800;
}

.github-link .link-icon {
  background: #e8ebe4;
  color: #53614c;
}

.linkedin-link .link-icon {
  background: #eee8df;
  color: #725747;
}

.link-copy {
  display: grid;
  min-width: 0;
  gap: 0.35rem;
}

.link-label {
  font-size: 0.88rem;
  font-weight: 750;
}

.link-value {
  color: var(--muted);
  font-size: 0.72rem;
  line-height: 1.45;
}

.link-arrow {
  align-self: flex-start;
  margin-left: auto;
  color: var(--clay);
  font-size: 0.9rem;
}

.email-unavailable {
  cursor: default;
}

.availability {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 1.75rem 0 0;
  color: var(--muted);
  font-size: 0.8rem;
}

.availability span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #7a8a70;
  box-shadow: 0 0 0 0.25rem rgb(122 138 112 / 13%);
}

.contact-link:focus-visible {
  outline: 3px solid var(--clay);
  outline-offset: 3px;
}

button.contact-link {
  width: 100%;
}

@media (max-width: 50rem) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 48rem) {
  .contact-links {
    grid-template-columns: 1fr;
  }

  .contact-link {
    min-height: 5.5rem;
  }
}

@media (max-width: 36rem) {
  .contact-page {
    padding: 2rem 1.25rem;
    border-radius: 0.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-link {
    transition: none;
  }
}
</style>
