import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'app/models/user-model'
import { v4 } from 'uuid'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        id: v4(),
        name: 'João',
        email: 'joao@gmail.com',
        phone: '999990000',
        coordX: 2,
        coordY: 2,
      },
      {
        id: v4(),
        name: 'Maria',
        email: 'maria@gmail.com',
        phone: '999990001',
        coordX: 4,
        coordY: 2,
      },
      {
        id: v4(),
        name: 'José',
        email: 'jose@gmail.com',
        phone: '999990002',
        coordX: -3,
        coordY: -3,
      },
      {
        id: v4(),
        name: 'Adamastor',
        email: 'adamastor@gmail.com',
        phone: '999990003',
        coordX: 100,
        coordY: 50,
      },
    ])
  }
}
