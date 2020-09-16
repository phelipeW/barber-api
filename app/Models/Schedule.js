'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Schedule extends Model {
  user() {
    return this.belongsTo("App/Models/User")
  }
  barber() {
    return this.belongsTo("App/Models/Barber")
  }
  service() {
    return this.belongsTo("App/Models/Service")
  }
}

module.exports = Schedule
