import { Url } from '~/schemas/url'
import { DOMAIN } from '~/config/env'
import { UrlRequest } from './requests/url-request'
import { getRandomHash } from '~/helpers/helpers'

/**
 * Return url.
 */
export const getUrl = async (shortUrl: string) => {
  console.log('Buscando a url no banco.')

  const foundUrl = await Url.findOne({ shortUrl }).lean()

  if (!foundUrl) {
    console.log(
      'Não foi encontrado a url no banco será redirecionado para a tela principal'
    )
    return 'https://minis.vercel.app/'
  }

  console.log(
    `Url encontrada no banco será redirecionado para: ${foundUrl?.url}`
  )

  return foundUrl?.url
}

/**
 * Save new url.
 */
export const saveShortUrl = async (completeUrl: UrlRequest) => {
  /**
   * Extract values.
   */
  const { url } = completeUrl

  /**
   * Find url.
   */
  console.log('Buscando se já existe a url no banco.')
  const foundUrl = await Url.findOne({ url }).lean()

  if (foundUrl) {
    console.log(
      'Url já existente no banco, será passado a versão minificada dela.'
    )
    return `${DOMAIN}/${foundUrl?.shortUrl}`
  }

  console.log('Não foi encontrado, será criado')

  const hash = getRandomHash()

  /**
   * Create short url.
   */
  const shortUrl = `${DOMAIN}/${hash}`

  const data = {
    url,
    shortUrl: hash
  }

  await Url.create(data)

  return shortUrl
}
