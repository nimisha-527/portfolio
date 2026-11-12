import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import { useApiHandling } from '../stores/apiHandling'

async function mountHome(content?: {
  homePage?: { yourName?: string; yourRole?: string }
  aboutPage?: { summary?: string }
}) {
  const pinia = createPinia()
  const api = useApiHandling(pinia)
  api.apiSuccessFn({
    tabs: ['Home', 'About'],
    ...content,
  })

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: Home },
      { path: '/about', component: Home },
      { path: '/work', component: Home },
    ],
  })
  await router.push('/')
  await router.isReady()

  return mount(Home, {
    global: {
      plugins: [pinia, router],
    },
  })
}

describe('Home page', () => {
  it('shows portfolio details, portrait, and section navigation', async () => {
    const wrapper = await mountHome({
      homePage: { yourName: 'Nimisha', yourRole: 'Product Designer' },
      aboutPage: { summary: 'I make thoughtful digital experiences.' },
    })

    expect(wrapper.text()).toContain('Product Designer')
    expect(wrapper.text()).toContain('Nimisha')
    expect(wrapper.text()).toContain('I make thoughtful digital experiences.')
    expect(wrapper.text()).toContain('My work')
    expect(wrapper.find('img.portrait').exists()).toBe(true)
    expect(wrapper.get('a.work-button').attributes('href')).toBe('/work')
    expect(wrapper.find('nav[aria-label="Main navigation"] a[href="/work"]').exists()).toBe(true)
    expect(wrapper.get('nav[aria-label="Main navigation"]').text()).toContain('Contact')

    const menuToggle = wrapper.get('button[aria-controls="primary-navigation-links"]')
    expect(menuToggle.attributes('aria-expanded')).toBe('false')
    await menuToggle.trigger('click')
    expect(menuToggle.attributes('aria-expanded')).toBe('true')
    expect(menuToggle.text()).toBe('×')
    await wrapper.get('nav[aria-label="Main navigation"] a[href="/work"]').trigger('click')
    expect(menuToggle.attributes('aria-expanded')).toBe('false')
  })

  it('uses friendly defaults for unset template values', async () => {
    const wrapper = await mountHome({
      homePage: { yourName: '$name', yourRole: '$role' },
      aboutPage: { summary: '$summary' },
    })

    expect(wrapper.text()).toContain('Nimisha')
    expect(wrapper.text()).toContain('Frontend Engineer')
    expect(wrapper.text()).toContain('Building reactive, high-performance UI components')
    expect(wrapper.text()).not.toContain('$summary')
  })
})
