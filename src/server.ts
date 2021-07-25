import 'reflect-metadata'
import express from 'express'
import {
  useExpressServer,
  RoutingControllersOptions
} from 'routing-controllers'

import controllers from './api/controllers'
import { mongoConnect } from './lib/db'
import { NODE_ENV } from './config/env'
import { EnvironmentType } from './common/enums'

/**
 * Server configuration.
 */
const expressConfig: RoutingControllersOptions = {
  cors: '*',
  controllers
}

/**
 * Create server.
 */
export const server = () => {
  const app = express()
  useExpressServer(app, expressConfig)

  /**
   * Connect database.
   */
  if (NODE_ENV !== EnvironmentType.TEST) mongoConnect()

  return app
}
