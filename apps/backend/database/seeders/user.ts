import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User, { RoleType } from 'app/models/user-model'
import { v4 } from 'uuid'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        id: v4(),
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'adminSecret',
        role: RoleType.ADMIN,
      },
    ])
  }
}
