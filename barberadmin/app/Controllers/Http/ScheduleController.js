'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with schedules
 */

 const Schedule = use('App/Models/Schedule')
class ScheduleController {
  /**
   * Show a list of all schedules.
   * GET schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const schedule = await Schedule.query()
      .with('user')
      .with('barber')
      .with('service')
      .fetch()

    return schedule
  }


  /**
   * Create/save a new schedule.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.all();

    const schedule = await Schedule.create(data)

    return schedule;
  }

  /**
   * Display a single schedule.
   * GET schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    try{
    const schedule = await Schedule.findOrFail(params.id)
    return schedule
    }catch(err){
      return response.status(404).send('Erro ao encontrar agenda')
    }
  }

  /**
   * Update schedule details.
   * PUT or PATCH schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try{
    const schedule = await Schedule.findOrFail(params.id)

    schedule.merge(request.all())

    await schedule.save()
    } catch(err){
      return response.status(404).send('Erro ao atualizar agenda')
    }
  }

  /**
   * Delete a schedule with id.
   * DELETE schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try{
      const schedule = await Schedule(params.id)
      schedule.delete()
    } catch(err){
      return response.status(404).status('Erro ao excluir agenda')
    }
  }
}

module.exports = ScheduleController
