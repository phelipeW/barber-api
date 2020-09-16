'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with barbers
 */

 const Barber = use('App/Models/Barber');
class BarberController {
  /**
   * Show a list of all barbers.
   * GET barbers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ }) {
    const barbers = await Barber.all();
    return barbers;
  }

  /**
   * Create/save a new barber.
   * POST barbers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.all();
    const barber = await Barber.create(data)

    return barber;

  }

  /**
   * Display a single barber.
   * GET barbers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    try{
      const barber = await Barber.findOrFail(params.id)

      return barber
    } catch (err) {
      return response.status(404).send('ID não encontrado')
    }
  }

  /**
   * Update barber details.
   * PUT or PATCH barbers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try{
      const barber = await Barber.findOrFail(params.id)

      barber.merge(request.all())

      await barber.save()

      return barber
    } catch (err){
        return response.status(404).send('ID não encontrado')
    }
  }

  /**
   * Delete a barber with id.
   * DELETE barbers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try{
      const barber = await Barber.findOrFail(params.id)
      barber.delete()
    } catch(err){
      return response.status(404).send('ID não encontrado')
    }
  }
}

module.exports = BarberController
