/**
 * server/controllers/shopController.js
 * 結盟青草店與購買指引控制器
 */
const shopService = require('../services/shopService');
const ApiResponse = require('../utils/apiResponse');

class ShopController {
  async getShops(req, res, next) {
    try {
      const { region, query, city } = req.query;
      const shops = await shopService.getShops({ region, query, city });
      res.json(ApiResponse.success(shops, { total: shops.length }));
    } catch (err) {
      next(err);
    }
  }

  async getBuyingGuides(req, res, next) {
    try {
      const guides = await shopService.getBuyingGuides();
      res.json(ApiResponse.success(guides));
    } catch (err) {
      next(err);
    }
  }

  async getShopById(req, res, next) {
    try {
      const { id } = req.params;
      const shop = await shopService.getShopById(id);
      if (!shop) {
        return res.status(404).json(ApiResponse.fail('找不到該結盟青草店', 404));
      }
      res.json(ApiResponse.success(shop));
    } catch (err) {
      next(err);
    }
  }

  async getShopsByHerb(req, res, next) {
    try {
      const { herbName } = req.params;
      const shops = await shopService.getShopsByHerb(herbName);
      res.json(ApiResponse.success(shops));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ShopController();
