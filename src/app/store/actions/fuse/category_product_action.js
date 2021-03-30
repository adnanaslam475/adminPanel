import axios from 'axios';
import { api } from 'utils/Constant';
export const CATEGORY_DISPATCH = 'CATEGORY_DISPATCH'
export const PRODUCT_DISPATCH = 'PRODUCT_DISPATCH'

export const loadmeta_categories = () => dispatch => {
    let arrayOfTypes = [];
    axios.get(`${api}5007/api/categories`)
        .then(({ data }) => {
            // data.data.filter(({ _id, sub_categories, category_name }) => {
            //     const meta_categories = { _id, category_name, sub_categories }
            //     arrayOfTypes.push(meta_categories);
            //     arrayOfTypes = [...new Set(arrayOfTypes)];
            // })

            data.data.filter(({ _id, categoryType, category_names }) => {
                const meta_categories = { _id, categoryType, category_names }
                arrayOfTypes.push(meta_categories);
                arrayOfTypes = [...new Set(arrayOfTypes)];
            })
            dispatch({
                type: CATEGORY_DISPATCH,
                meta_categories: arrayOfTypes
            })
        }).catch(err => {
            console.log('error to fetch', err)
        })
}



export const loadmeta_categoriesforcategories = () => dispatch => {
    let arrayOfTypes = [];
    axios.get(`${api}5007/api/categories`)
        .then(({ data }) => {
            data.data.filter(({ _id, categoryType, category_names }) => {
                const meta_categories = { _id, categoryType, category_names }
                arrayOfTypes.push(meta_categories);
                arrayOfTypes = [...new Set(arrayOfTypes)];
            })
            dispatch({
                type: CATEGORY_DISPATCH,
                meta_categories: arrayOfTypes
            })
        }).catch(err => {
            console.log('error to fetch', err)
        })
}


export const load_meta_products = () => dispatch => {
    let arrayOfTypes = [];
    axios.get(`${api}5007/api/product`)
        .then(({ data }) => {
            // console.log('meta_products frm act',data.data);
            data.data.filter(({ _id, name, price }) => {
                const products = { _id, name, price }
                arrayOfTypes.push(products);
                arrayOfTypes = [...new Set(arrayOfTypes)];
            })
            dispatch({
                type: PRODUCT_DISPATCH,
                meta_products: arrayOfTypes
            })
        }).catch(err => {
            console.log('error to fetch', err)
        })
}
