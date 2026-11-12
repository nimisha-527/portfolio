<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'SideNav' })

const isOpen = ref(false)
</script>

<template>
    <nav class="side-nav" :class="{ 'is-open': isOpen }" aria-label="Main navigation">
      <button
        class="nav-toggle"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="primary-navigation-links"
        :aria-label="isOpen ? 'Close navigation menu' : 'Open navigation menu'"
        @click="isOpen = !isOpen"
      >
        <span aria-hidden="true">{{ isOpen ? '×' : '☰' }}</span>
      </button>
      <div id="primary-navigation-links" class="nav-links">
        <RouterLink class="nav-home" to="/" aria-label="Home" @click="isOpen = false">
          <span class="nav-mark" aria-hidden="true">N.</span>
          <span class="nav-label">Home</span>
        </RouterLink>
        <RouterLink to="/about" @click="isOpen = false">
          <span class="nav-label">About</span>
        </RouterLink>
        <RouterLink to="/work" @click="isOpen = false">
          <span class="nav-label">Work</span>
        </RouterLink>
        <RouterLink to="/contact" @click="isOpen = false">
          <span class="nav-label">Contact</span>
        </RouterLink>
      </div>
      <span class="nav-social" aria-hidden="true">✳</span>
      </nav>
</template>
<style>
.side-nav {
    --ink: #302722;
  --muted: #75675f;
  --clay: #a47864;
  --paper: #f5f1eb;
  --sage: #e8ebe4;

  color: var(--ink);
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 5.5rem;
  height: min(35rem, calc(100svh - 5rem));
  min-height: min(35rem, calc(100svh - 5rem));
  padding: 1.1rem 0.45rem;
  border: 1px solid rgb(255 255 255 / 72%);
  border-radius: 2.5rem;
  background: rgb(255 255 255 / 64%);
  box-shadow: 0 1rem 3rem rgb(69 49 37 / 8%);
  backdrop-filter: blur(18px);
}

.nav-toggle {
  display: none;
}

.nav-links {
  display: contents;
}

.side-nav a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.36rem;
  width: 100%;
  padding: 0.8rem 0.15rem;
  border-radius: 2rem;
  color: #8d7e75;
  text-decoration: none;
  transition:
    color 180ms ease,
    background-color 180ms ease,
    transform 180ms ease;
}

.side-nav a:hover,
.side-nav a.router-link-exact-active:not(.nav-home) {
  background: #f0e6df;
  color: #805c4b;
  transform: translateY(-1px);
}

.side-nav .nav-home {
  margin-bottom: 0.8rem;
  color: var(--ink);
}

.nav-mark {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border-radius: 50%;
  background: var(--clay);
  color: white;
  font-size: 1rem;
  font-weight: 750;
  letter-spacing: -0.07em;
}

.nav-label {
  font-size: 0.67rem;
  font-weight: 650;
}

.nav-social {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-top: 1px solid rgb(164 120 100 / 22%);
  color: var(--clay);
}

.side-nav a:focus-visible {
  outline: 3px solid var(--clay);
  outline-offset: 4px;
}

.nav-toggle:focus-visible {
  outline: 3px solid var(--clay);
  outline-offset: 3px;
}

@media (max-width: 62rem) {
  .side-nav {
    width: 4.75rem;
  }
}

@media (max-width: 48rem) {
  .side-nav {
    grid-column: 2;
    grid-row: 1 / span 2;
    position: sticky;
    top: 1rem;
    width: 4.25rem;
    height: min(32rem, calc(100svh - 2rem));
    min-height: min(32rem, calc(100svh - 2rem));
    justify-self: end;
  }

}

@media (max-width: 36rem) {
  .side-nav {
    position: fixed;
    z-index: 10;
    right: 1rem;
    top: 1rem;
    bottom: auto;
    left: auto;
    flex-direction: column;
    align-items: flex-end;
    width: min(17rem, calc(100vw - 2rem));
    height: auto;
    min-height: 0;
    padding: 0;
    border: 0;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
  }

  .nav-toggle {
    order: 0;
    display: grid;
    width: 3.25rem;
    height: 3.25rem;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 72%);
    border-radius: 50%;
    background: #a47864;
    box-shadow: 0 0.6rem 1.8rem rgb(69 49 37 / 18%);
    color: rgb(255 255 255 / 72%);
    cursor: pointer;
    font: inherit;
    font-size: 1.8rem;
    line-height: 1;
  }

  .nav-links {
    order: 1;
    display: none;
    width: 100%;
    margin-top: 0.65rem;
    padding: 0.5rem;
    border: 1px solid rgb(255 255 255 / 72%);
    border-radius: 1.25rem;
    background: rgb(255 255 255 / 94%);
    box-shadow: 0 1rem 2.5rem rgb(69 49 37 / 15%);
    backdrop-filter: blur(18px);
  }

  .side-nav.is-open .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .side-nav .nav-links a {
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.75rem;
    padding: 0.75rem;
    color: #554b45;
  }

  .side-nav .nav-links a:hover,
  .side-nav .nav-links a.router-link-exact-active:not(.nav-home) {
    background: #f0e6df;
    color: #805c4b;
    transform: none;
  }

  .side-nav .nav-links .nav-home {
    margin: 0;
  }

  .nav-mark {
    width: 2rem;
    height: 2rem;
    font-size: 0.8rem;
  }

  .nav-social {
    display: none;
  }

  .nav-links .nav-label {
    font-size: 0.85rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .side-nav a {
    transition: none;
  }
}
</style>