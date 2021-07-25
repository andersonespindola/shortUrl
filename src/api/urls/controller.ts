import {
  Get,
  Post,
  Body,
  Param,
  OnUndefined,
  JsonController
} from 'routing-controllers'

import { UrlRequest } from './requests/url-request'
import { getUrl, saveShortUrl } from './service'

@JsonController()
export class UrlController {
  @Get('/:shortUrl')
  @OnUndefined(204)
  async getUrl(@Param('shortUrl') shortUrl: string) {
    /**
     * Get url.
     */
    return getUrl(shortUrl)
  }

  @Post('/')
  async saveShortUrl(@Body() completeUrl: UrlRequest) {
    /**
     * Save new url.
     */
    return saveShortUrl(completeUrl)
  }
}
