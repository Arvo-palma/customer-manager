/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import app from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import { existsSync, readdirSync } from 'fs'
import path from 'path'

const adminPath = path.join(__dirname, '..', 'app', 'features', 'admin')
const adminFeatures = readdirSync(adminPath)
adminFeatures.forEach(async (feature) => {
  const routeFile = Env.get('NODE_ENV') !== 'local' ? 'routes.js' : 'routes.ts'
  const routePath = path.join(adminPath, feature, routeFile)
  if (existsSync(routePath)) {
    await import(routePath)
    app.container.alias(path.join(adminPath, feature, 'controllers'), `${feature}/controllers`)
  }
})

