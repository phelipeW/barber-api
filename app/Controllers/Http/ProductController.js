'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */

const Product = use('App/Models/Product');

class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {

    const products = await Product.all();

    return products;
  }


  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only(['description', 'sell', 'cost'])
    console.log(data)
    const product = await Product.create({...data});

    return product;
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {

    try {
      const product = await Product.findOrFail(params.id);

      return product;
      } catch (err) {
      return response.status(404).send('ID não encontrado')
      }
  }


  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try {
      const product = await Product.findOrFail(params.id);

      product.merge(request.all());
      await product.save();

      return product;
      } catch (err) {
      return response.status(404).send('ID não encontrado')
      }



    return "product";
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
    const product = await Product.findOrFail(params.id);

    await product.delete();
    } catch (err) {
    return response.status(404).send('ID não encontrado')
    }
  }
}

module.exports = ProductController
