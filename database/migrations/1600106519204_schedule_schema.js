'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up () {
    this.create('schedules', (table) => {
      table.increments()
      table.time('start_time')
        .notNullable()
      table.time('end_time')
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('barber_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('barbers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('service_id')
        .notNullable()
        .references('id')
        .inTable('services')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('schedules')
  }
}

module.exports = ScheduleSchema
