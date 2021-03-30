import * as Actions from '../../actions/fuse/index';

const initialState = {
  meta_categories: [],
  meta_products: []
};

const cat_pro = function (state = initialState, action) {
  switch (action.type) {
    case Actions.CATEGORY_DISPATCH:
      {
        return {
          ...state,
          meta_categories: action.meta_categories
        }
      }
    case Actions.PRODUCT_DISPATCH:
      {
        return {
          ...state,
          meta_products: action.meta_products
        }
      }

    default:
      {
        return state;
      }
  }
};

export default cat_pro;