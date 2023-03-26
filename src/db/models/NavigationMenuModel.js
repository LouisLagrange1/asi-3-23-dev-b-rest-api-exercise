import BaseModel from "./BaseModel.js"

class NavigationMenuModel extends BaseModel {
  static tableName = "navigation_menus"

  static modifiers = {
    paginate: (query, limit, page) => {
      return query.limit(limit).offset((page - 1) * limit)
    },
  }
}

export default NavigationMenuModel
