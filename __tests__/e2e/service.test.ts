import { Url } from '~/schemas/url'
import {
  clearDatabase,
  closeDatabase,
  connectDatabase,
  sendRequest
} from '../helpers/server'

describe('[E2E] Busca de url', () => {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  beforeAll(connectDatabase)

  /**
   * Clear all test data after every test.
   */
  afterEach(clearDatabase)

  /**
   * Remove and close the db and server.
   */
  afterAll(closeDatabase)

  test('Deve criar uma url minificada', async () => {
    /**
     * Create hash.
     */
    const data = {
      url: 'https://teste.com.br'
    }

    /**
     * Request.
     */
    await sendRequest('post', '/', data)

    /**
     * Find url.
     */
    const foundUrl = await Url.findOne({ url: data.url }).lean()

    /**
     * Expect.
     */
    expect(foundUrl).toMatchObject({
      url: data.url,
      shortUrl: expect.any(String)
    })
  })

  test('Deve retornar a url vinculada ao hash', async () => {
    /**
     * Create register.
     */
    const data = {
      url: 'https://teste.com.br',
      shortUrl: 'G2f8FB'
    }

    await Url.create(data)

    /**
     * Find url.
     */
    const foundUrl = await sendRequest('get', `/${data.shortUrl}`)

    /**
     * Expect.
     */
    expect(foundUrl.text).toMatch(data.url)
  })
})
