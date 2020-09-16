'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.string('description', 100).notNullable()
      table.decimal('cost')
        .notNullable()
      table.decimal('sell')
        .notNullable()
      table.integer('duration')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
