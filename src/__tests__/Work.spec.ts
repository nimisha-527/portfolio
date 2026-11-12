import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import Work from '../views/Work.vue'

describe('Work page', () => {
  it('renders project cards with chips and links that open safely in a new tab', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: Work },
        { path: '/about', component: Work },
        { path: '/work', component: Work },
      ],
    })
    await router.push('/work')
    await router.isReady()

    const wrapper = mount(Work, {
      global: {
        plugins: [router],
      },
    })
    const projectCards = wrapper.findAll('article.project-card')

    expect(projectCards).toHaveLength(2)
    expect(wrapper.text()).toContain('Reading Bliss')
    expect(wrapper.text()).toContain('Express.js')
    expect(wrapper.get('video').attributes('src')).toBeTruthy()
    expect(wrapper.get('video').attributes('aria-label')).toBe('Reading Bliss site preview')
    const githubLink = wrapper.get('a[aria-label="View Reading Bliss on GitHub"]')
    expect(githubLink.attributes('href')).toBe('https://github.com/nimisha-527/the-reading-bliss')
    expect(githubLink.attributes('target')).toBe('_blank')
    expect(githubLink.attributes('rel')).toBe('noopener noreferrer')
    const projectFooter = wrapper.get('article.project-card').get('footer.card-footer')
    expect(
      projectFooter.get('a[aria-label="Visit Reading Bliss site"]').classes(),
    ).toContain('project-link--visit')
    expect(
      projectFooter.get('a[aria-label="View Reading Bliss on GitHub"]').classes(),
    ).toContain('project-link--github')
    for (const card of projectCards) {
      expect(card.find('a[target="_blank"]').exists()).toBe(true)
      expect(card.find('footer.card-footer').exists()).toBe(true)
    }
  })
})
