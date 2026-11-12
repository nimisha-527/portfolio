<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'MailToModal' })

const props = defineProps<{
  email: string
}>()

const emit = defineEmits<{
  close: []
}>()

const copyStatus = ref('')
const isMobileBrowser = computed(() => {
  const userAgent = navigator.userAgent
  return (
    /android|iphone|ipad|ipod/i.test(userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
})

type MailProvider = 'gmail' | 'outlook'

function webComposeUrl(provider: MailProvider) {
  const email = encodeURIComponent(props.email)
  return provider === 'gmail'
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`
    : `https://outlook.office.com/mail/deeplink/compose?to=${email}`
}

function appComposeUrl(provider: MailProvider) {
  const email = encodeURIComponent(props.email)
  if (provider === 'gmail' && /android/i.test(navigator.userAgent)) {
    const fallbackUrl = encodeURIComponent(webComposeUrl(provider))
    return `intent:${email}#Intent;scheme=mailto;action=android.intent.action.SENDTO;package=com.google.android.gm;S.browser_fallback_url=${fallbackUrl};end`
  }

  return provider === 'gmail'
    ? `googlegmail:///co?to=${email}`
    : `ms-outlook://compose?to=${email}`
}

function providerHref(provider: MailProvider) {
  return isMobileBrowser.value ? appComposeUrl(provider) : webComposeUrl(provider)
}

function openProvider(provider: MailProvider, event: MouseEvent) {
  const webUrl = webComposeUrl(provider)
  if (!isMobileBrowser.value) {
    event.preventDefault()
    window.open(webUrl, '_blank', 'noopener,noreferrer')
    return
  }

  const cleanup = () => {
    window.clearTimeout(fallbackTimer)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('pagehide', cleanup)
  }
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') cleanup()
  }
  const fallbackTimer = window.setTimeout(() => {
    cleanup()
    if (document.visibilityState === 'visible') window.open(webUrl, '_self')
  }, 1500)

  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('pagehide', cleanup, { once: true })
}

async function copyEmail() {
  try {
    if (!navigator.clipboard?.writeText) {
      copyStatus.value = 'Clipboard access is unavailable. Please copy the address manually.'
      return
    }

    await navigator.clipboard.writeText(props.email)
    copyStatus.value = 'Email address copied.'
  } catch {
    copyStatus.value = 'Could not copy the address. Please copy it manually.'
  }
}
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <section
      class="mail-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mail-modal-title"
    >
      <p class="eyebrow">Get in touch</p>
      <h2 id="mail-modal-title">Choose an email app</h2>
      <p class="modal-intro">Send a message to:</p>
      <p class="email-address">{{ email }}</p>

      <div class="provider-options">
        <a
          class="provider-option"
          :href="providerHref('gmail')"
          :target="isMobileBrowser ? '_self' : '_blank'"
          rel="noopener noreferrer"
          aria-label="Compose with Gmail"
          @click="openProvider('gmail', $event)"
        >
          <span class="provider-mark gmail-mark" aria-hidden="true">G</span>
          <span>Gmail</span>
          <span class="provider-arrow" aria-hidden="true">↗</span>
        </a>
        <a
          class="provider-option"
          :href="providerHref('outlook')"
          :target="isMobileBrowser ? '_self' : '_blank'"
          rel="noopener noreferrer"
          aria-label="Compose with Outlook"
          @click="openProvider('outlook', $event)"
        >
          <span class="provider-mark outlook-mark" aria-hidden="true">O</span>
          <span>Outlook</span>
          <span class="provider-arrow" aria-hidden="true">↗</span>
        </a>
      </div>

      <button class="copy-email" type="button" @click="copyEmail">
        Copy email address
      </button>
      <p class="copy-status" role="status" aria-live="polite">{{ copyStatus }}</p>

      <button class="cancel-email" type="button" @click="emit('close')">Cancel</button>
    </section>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgb(36 29 25 / 54%);
}

.mail-modal {
  --ink: #302722;
  --muted: #75675f;
  --clay: #a47864;
  --clay-dark: #805c4b;

  width: min(100%, 28rem);
  padding: clamp(1.5rem, 5vw, 2.25rem);
  border: 1px solid rgb(164 120 100 / 20%);
  border-radius: 1.25rem;
  background: #fdfaf6;
  box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 22%);
  color: var(--ink);
}

.eyebrow {
  margin: 0 0 0.6rem;
  color: var(--clay-dark);
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  font-size: clamp(1.55rem, 5vw, 2rem);
  letter-spacing: -0.045em;
}

.modal-intro {
  margin: 1.4rem 0 0.25rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.email-address {
  margin: 0;
  overflow-wrap: anywhere;
  font-weight: 700;
}

.provider-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.provider-option {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 0.75rem;
  border: 1px solid rgb(164 120 100 / 24%);
  border-radius: 0.8rem;
  background: #fff;
  color: var(--ink);
  font-weight: 700;
  text-decoration: none;
  transition:
    border-color 180ms ease,
    transform 180ms ease;
}

.provider-option:hover {
  transform: translateY(-2px);
  border-color: var(--clay);
}

.provider-mark {
  display: grid;
  width: 1.8rem;
  height: 1.8rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 0.55rem;
  font-size: 0.85rem;
  font-weight: 800;
}

.gmail-mark {
  background: #fce8e6;
  color: #b3261e;
}

.outlook-mark {
  background: #e6f0fb;
  color: #1769aa;
}

.provider-arrow {
  margin-left: auto;
  color: var(--clay);
}

.copy-email,
.cancel-email {
  width: 100%;
  min-height: 2.9rem;
  border-radius: 0.75rem;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.copy-email {
  margin-top: 1rem;
  border: 0;
  background: var(--clay-dark);
  color: #fff;
}

.cancel-email {
  margin-top: 0.35rem;
  border: 1px solid rgb(164 120 100 / 30%);
  background: transparent;
  color: var(--ink);
}

.copy-status {
  min-height: 1.25rem;
  margin: 0.55rem 0 0;
  color: var(--muted);
  font-size: 0.78rem;
  text-align: center;
}

.provider-option:focus-visible,
.copy-email:focus-visible,
.cancel-email:focus-visible {
  outline: 3px solid var(--clay);
  outline-offset: 3px;
}

@media (max-width: 24rem) {
  .provider-options {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .provider-option {
    transition: none;
  }
}
</style>