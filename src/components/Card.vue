<script setup lang="ts">
defineOptions({ name: 'PortfolioCard' })

withDefaults(
  defineProps<{
    href?: string
    target?: '_blank' | '_self'
    asContainer?: boolean
  }>(),
  {
    href: undefined,
    target: '_self',
    asContainer: false,
  },
)

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <article
    v-if="asContainer"
    class="card"
  >
    <slot />
    <footer
      v-if="$slots.footer"
      class="card-footer"
    >
      <slot name="footer" />
    </footer>
  </article>
  <a
    v-else-if="href"
    class="card"
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    @click="$emit('click', $event)"
  >
    <slot />
  </a>
  <button
    v-else
    class="card"
    type="button"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.card {
  display: grid;
  min-height: 7rem;
  padding: 1.5rem;
  border: 1px solid #a47864;
  border-radius: 0.75rem;
  background: #e8ebe4;
  color: #4b3b34;
  font: inherit;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
}

.card-footer {
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.45rem;
  margin-top: auto;
  padding-top: 1.5rem;
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
</style>