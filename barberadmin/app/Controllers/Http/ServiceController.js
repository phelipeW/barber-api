'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with services
 */

 const Service = use('App/Models/Service')
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const services = await Service.all()
    return services
  }

  /**
   * Create/save a new service.
   * POST services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.all();
    const service = await Service.create(data)

    return service
  }

  /**
   * Display a single service.
   * GET services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    try{
      const service = await Service.findOrFail(params.id);
      return service;
    } catch(err){
      return response.status(404).send('Erro ao encontrar serviço!')
    }

  }

  /**
   * Update service details.
   * PUT or PATCH services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try{
      const service = await Service.findOrFail(params.id)
      service.merge(request.all())

      await service.save()

      return service
    } catch(err){
      return response.status(404).send('Erro ao atualizar serviço')
    }

  }

  /**
   * Delete a service with id.
   * DELETE services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try{
      const service = await Service.findOrFail(params.id)
      service.delete();
    } catch(err){
      return response.status(404).send('Erro ao excluir serviço')
    }
  }
}

module.exports = ServiceController
