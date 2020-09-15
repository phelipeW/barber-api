'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarberSchema extends Schema {
  up () {
    this.create('barbers', (table) => {
      table.increments()
      table.string('name', 60)
        .notNullable()
      table.string('email', 254)
        .notNullable()
        .unique()
      table.string('phone',15)
      table.string('password', 60)
        .notNullable()
      table.enu('payment', ['monthly', 'weekly', 'haircut', 'percentage'])
      table.timestamps()
    })
  }

  down () {
    this.drop('barbers')
  }
}

module.exports = BarberSchema
