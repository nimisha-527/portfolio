import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import Contact from '../views/Contact.vue'
import { useApiHandling } from '../stores/apiHandling'

async function mountContact(emailAddress?: string) {
  const pinia = createPinia()
  const api = useApiHandling(pinia)
  api.apiSuccessFn({
    tabs: ['Home', 'About', 'Work', 'Contact'],
    contactPage: {
      contactLabel: 'Contact me',
      emailAddress: emailAddress ?? '$email',
    },
  })

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/contact', component: Contact }],
  })
  await router.push('/contact')
  await router.isReady()

  return mount(Contact, {
    global: {
      plugins: [pinia, router],
    },
  })
}

describe('Contact page', () => {
  it('renders email, GitHub, LinkedIn, and main navigation links', async () => {
    const wrapper = await mountContact('nimisha@example.com')

    expect(wrapper.text()).toContain('Contact me')
    expect(wrapper.get('button.email-link').text()).toContain('nimisha@example.com')
    expect(wrapper.get('a[href="https://github.com/nimisha-527"]').attributes('target')).toBe(
      '_blank',
    )
    expect(
      wrapper
        .get('a[href="https://www.linkedin.com/in/nimisha-jain-1405a931b/"]')
        .attributes('rel'),
    ).toBe('noopener noreferrer')
    expect(wrapper.find('nav[aria-label="Main navigation"] a[href="/contact"]').exists()).toBe(
      true,
    )
  })

  it('opens provider choices, copies the email, and closes from cancel', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
    const wrapper = await mountContact('nimisha@example.com')

    await wrapper.get('button.email-link').trigger('click')

    expect(wrapper.get('[role="dialog"]').text()).toContain('nimisha@example.com')
    expect(wrapper.get('a[aria-label="Compose with Gmail"]').attributes('href')).toBe(
      'https://mail.google.com/mail/?view=cm&fs=1&to=nimisha%40example.com',
    )
    expect(wrapper.get('a[aria-label="Compose with Outlook"]').attributes('href')).toBe(
      'https://outlook.live.com/mail/0/deeplink/compose?to=nimisha%40example.com',
    )
    await wrapper.get('a[aria-label="Compose with Gmail"]').trigger('click')
    expect(open).toHaveBeenCalledWith(
      'https://mail.google.com/mail/?view=cm&fs=1&to=nimisha%40example.com',
      '_blank',
      'noopener,noreferrer',
    )

    await wrapper.get('button.copy-email').trigger('click')
    expect(writeText).toHaveBeenCalledWith('nimisha@example.com')
    expect(wrapper.text()).toContain('Email address copied.')

    await wrapper.get('button.cancel-email').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('opens mobile mail apps and falls back to web compose when an app is unavailable', async () => {
    const userAgentDescriptor = Object.getOwnPropertyDescriptor(navigator, 'userAgent')
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
    })
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    open.mockClear()
    vi.useFakeTimers()
    try {
      const wrapper = await mountContact('nimisha@example.com')

      await wrapper.get('button.email-link').trigger('click')
      expect(wrapper.get('a[aria-label="Compose with Gmail"]').attributes('href')).toBe(
        'googlegmail:///co?to=nimisha%40example.com',
      )
      expect(wrapper.get('a[aria-label="Compose with Outlook"]').attributes('href')).toBe(
        'ms-outlook://compose?to=nimisha%40example.com',
      )

      await wrapper.get('a[aria-label="Compose with Gmail"]').trigger('click')
      expect(open).toHaveBeenNthCalledWith(
        1,
        'googlegmail:///co?to=nimisha%40example.com',
        '_self',
      )

      vi.advanceTimersByTime(1500)
      expect(open).toHaveBeenNthCalledWith(
        2,
        'https://mail.google.com/mail/?view=cm&fs=1&to=nimisha%40example.com',
        '_self',
      )
    } finally {
      vi.useRealTimers()
      open.mockRestore()
      if (userAgentDescriptor) {
        Object.defineProperty(navigator, 'userAgent', userAgentDescriptor)
      } else {
        Reflect.deleteProperty(navigator, 'userAgent')
      }
    }
  })

  it('does not expose the email template token when no address is configured', async () => {
    setActivePinia(createPinia())
    const wrapper = await mountContact()

    expect(wrapper.text()).toContain('Email address coming soon')
    expect(wrapper.text()).not.toContain('$email')
    expect(wrapper.find('button.email-link').exists()).toBe(false)
  })
})
