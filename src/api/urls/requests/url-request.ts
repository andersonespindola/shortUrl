import { IsString } from 'class-validator'

export class UrlRequest {
  @IsString()
  url: string
}
