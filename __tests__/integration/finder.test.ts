import { Url } from '~/schemas/url'
import {
  clearDatabase,
  closeDatabase,
  connectDatabase
} from '../helpers/server'

describe('[INTEGRAÇÃO] Busca de url', () => {
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

  test('Deve retornar a url vinculada ao hash', async () => {
    /**
     * Create hash.
     */
    const data = {
      url: 'https://teste.com.br',
      shortUrl: 'fG7DX6'
    }

    await Url.create(data)

    /**
     * Find url.
     */
    const foundUrl = await Url.findOne({ shortUrl: data.shortUrl }).lean()

    /**
     * Expect.
     */
    expect(foundUrl).toMatchObject({
      url: data.url,
      shortUrl: data.shortUrl
    })
  })
})
