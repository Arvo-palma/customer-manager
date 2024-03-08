/**
 * Config source: https://git.io/JY0mp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import type { AuthConfig } from '@ioc:Adonis/Addons/Auth'
import Env from '@ioc:Adonis/Core/Env'

/*
|--------------------------------------------------------------------------
| Authentication Mapping
|--------------------------------------------------------------------------
|
| List of available authentication mapping. You must first define them
| inside the `contracts/auth.ts` file before mentioning them here.
|
*/
const authConfig: AuthConfig = {
  guard: 'admin',
  guards: {
    admin: {
      driver: 'jwt',
      publicKey: Env.get('JWT_PUBLIC_KEY', '').replace(/\\n/g, '\n'),
      privateKey: Env.get('JWT_PRIVATE_KEY', '').replace(/\\n/g, '\n'),
      persistJwt: true,
      jwtDefaultExpire: '10h',
      refreshTokenDefaultExpire: '60d',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'admin_tokens',
        foreignKey: 'user_id',
      },
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('app/models/user-model'),
      },
    },
  },
}

export default authConfig
