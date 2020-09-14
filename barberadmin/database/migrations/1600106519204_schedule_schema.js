'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

var knex = require('knex')({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'barberadmin'
  },
  migrations: {
    tableName: 'migrations'
  }
});

class ScheduleSchema extends Schema {
  up () {
    this.create('schedules', (table) => {
      table.increments()
      table.timestamp('start_time', { precision: 6 })
        .defaultTo(knex.fn.now())
        .notNullable()
      table.timestamp('end_time', { precision: 6 }).defaultTo(knex.fn.now(3))
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('barber_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('barber')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('service')
        .notNullable()
        .references('description')
        .inTable('service')
      table.timestamps()
    })
  }

  down () {
    this.drop('schedules')
  }
}

module.exports = ScheduleSchema
