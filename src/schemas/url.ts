import mongoose, {
  Schema,
  Document,
  SchemaOptions,
  SchemaDefinition
} from 'mongoose'

/**
 * Url.
 */
const url: SchemaDefinition = {
  url: String,
  shortUrl: String
}

/**
 * Document.
 */
export interface UrlDocument extends Document {
  url: string
  shortUrl: string
}

/**
 * Options.
 */
const options: SchemaOptions = {
  timestamps: true
}

/**
 * Schema.
 */
export const UrlSchema = new Schema(url, options)

/**
 * Model.
 */
export const Url = mongoose.model<UrlDocument>('url', UrlSchema)
