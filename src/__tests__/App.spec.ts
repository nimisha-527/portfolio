import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import About from '../views/About.vue'
import { useApiHandling } from '../stores/apiHandling'

describe('About page', () => {
  it('renders the available portfolio details and work approach', () => {
    setActivePinia(createPinia())
    const api = useApiHandling()
    api.apiSuccessFn({
      tabs: ['Home', 'About'],
      aboutPage: {
        aboutLabel: 'About me',
        summary: 'I enjoy making thoughtful digital experiences.',
      },
      homePage: {
        yourName: 'Nimisha',
        yourRole: 'Designer and developer',
      },
    })

    const wrapper = mount(About)

    expect(wrapper.text()).toContain('Hello, I’m Nimisha.')
    expect(wrapper.text()).toContain('Designer and developer')
    expect(wrapper.text()).toContain('I enjoy making thoughtful digital experiences.')
    expect(wrapper.text()).toContain('Start with curiosity')
    expect(wrapper.text()).toContain('Technical skills')
    expect(wrapper.text()).toContain('Microsoft Azure Fundamentals')
    expect(wrapper.text()).toContain('Claude Code 101')
    expect(wrapper.text()).toContain('Awards & achievements')
    expect(wrapper.text()).toContain('ACE Award')
    expect(wrapper.text()).toContain('BORN Academy of Excellence')
  })

  it('uses a friendly fallback when API values are template tokens', () => {
    setActivePinia(createPinia())
    const api = useApiHandling()
    api.apiSuccessFn({
      tabs: ['Home', 'About'],
      aboutPage: { aboutLabel: '$aboutLabel', summary: '$summary' },
      homePage: { yourName: '$name', yourRole: '$role' },
    })

    const wrapper = mount(About)

    expect(wrapper.text()).toContain('A little about me.')
    expect(wrapper.text()).toContain(
      'I’m a web developer focused on building clean, accessible, and responsive applications.',
    )
    expect(wrapper.text()).not.toContain('$summary')
  })
})
