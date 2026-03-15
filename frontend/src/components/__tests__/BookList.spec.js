import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import BookList from '../BookList.vue'

describe('BookList.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('renders loading state initially', async () => {
    // create a delayed promise so we can observe the loading state
    let resolvePromise
    const promise = new Promise(resolve => { resolvePromise = resolve })
    global.fetch.mockImplementation(() => promise)
    
    const wrapper = mount(BookList)
    
    // Wait for Vue to update the DOM with the loading state
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('.loading-msg').exists()).toBe(true)
    expect(wrapper.text()).toContain('Loading books...')
    
    // Cleanup by resolving the delayed promise
    resolvePromise({ ok: true, json: async () => [] })
  })

  it('renders book list upon successful fetch', async () => {
    const mockBooks = [
      { id: 1, title: 'Book 1', author: 'Author 1', published_year: 2020, average_rating: 4.5 },
      { id: 2, title: 'Book 2', author: 'Author 2', published_year: 2021, average_rating: null }
    ]

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockBooks
    })

    const wrapper = mount(BookList)
    
    // Wait for the mounted hook to finish fetching
    await flushPromises()

    expect(wrapper.find('.loading-msg').exists()).toBe(false)
    
    const bookItems = wrapper.findAll('.book-item')
    expect(bookItems).toHaveLength(2)
    
    expect(bookItems[0].text()).toContain('Book 1')
    expect(bookItems[0].text()).toContain('4.5')
    expect(bookItems[0].text()).toContain('por Author 1 (2020)')
    
    expect(bookItems[1].text()).toContain('Book 2')
    expect(bookItems[1].text()).toContain('Sin calificación')
    expect(bookItems[1].text()).toContain('por Author 2 (2021)')
  })

  it('renders error message upon failed fetch', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    })

    const wrapper = mount(BookList)
    await flushPromises()

    expect(wrapper.find('.error-msg').exists()).toBe(true)
    expect(wrapper.text()).toContain('Error fetching books: 500')
  })

  it('renders empty message when no books are returned', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => []
    })

    const wrapper = mount(BookList)
    await flushPromises()

    expect(wrapper.find('.empty-msg').exists()).toBe(true)
    expect(wrapper.text()).toContain('No books available.')
  })

  it('calls fetch again when refresh button is clicked', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => []
    })

    const wrapper = mount(BookList)
    await flushPromises()

    expect(global.fetch).toHaveBeenCalledTimes(1)

    await wrapper.find('.refresh-btn').trigger('click')
    
    expect(global.fetch).toHaveBeenCalledTimes(2)
  })
})
