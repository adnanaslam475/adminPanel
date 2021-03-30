import axios from 'axios';
export const DEPARTMENTS_LIST = 'DEPARTMENTS_LIST';
export const COURSES_LIST = 'COURSES_LIST'
export const TERMS_LIST = 'TERMS_LIST';
export const SECTIONS_LIST = 'SECTIONS_LIST';
// export const PRODUCTS_LIST = 'PRODUCTS_LIST';

export const loadDepartments = () => dispatch => {
    let arrayOfTypes = [];
    axios.get('http://192.168.18.71:5001/api/dpt')
        .then(({ data }) => {
            data.data.filter(({ _id, name }) => {
                const depart = { _id, name }
                arrayOfTypes.push(depart);
                arrayOfTypes = [...new Set(arrayOfTypes)];
            })
            dispatch({
                type: DEPARTMENTS_LIST,
                departments_list: arrayOfTypes
            })
        }).catch(err => {
            console.log('error to fetch', err)
        })
}


// export const loadProducts = () => dispatch => {
//     let arrayOfTypes = [];
//     axios.get('http://192.168.18.71:5007/api/product')
//         .then(({ data }) => {

//             console.log('products dtaat',data)
//             data.data.filter(({ _id, name }) => {
//                 const depart = { _id, name }
//                 arrayOfTypes.push(depart);
//                 arrayOfTypes = [...new Set(arrayOfTypes)];
//             })
//             dispatch({
//                 type: PRODUCTS_LIST,
//                 products_list: arrayOfTypes
//             })
//         }).catch(err => {
//             console.log('error to fetch', err)
//         })
// }

export const loadCourses = () => dispatch => {
    let arrayOfTypes = [];
    axios.get('http://192.168.18.71:5001/api/crs')
        .then(({ data }) => {
            data.data.filter(({ _id, course_name }) => {
                const course = { _id, course_name }
                arrayOfTypes.push(course);
                arrayOfTypes = [...new Set(arrayOfTypes)];
            })
            dispatch({
                type: COURSES_LIST,
                courses_list: arrayOfTypes
            })
        }).catch(err => {
            console.log('error to fetch', err)
        })
}



export const loadTerms = () => dispatch => {
    let arrayOfTypes = [];
    axios.get('http://192.168.18.71:5001/api/trm')
        .then(({ data }) => {
            data.term.filter(({ _id, name }) => {
                const terms = { _id, name }
                arrayOfTypes.push(terms);
                arrayOfTypes = [...new Set(arrayOfTypes)];
            })
            dispatch({
                type: TERMS_LIST,
                terms_list: arrayOfTypes
            })
        }).catch(err => {
            console.log('error to fetch', err)
        })
}


export const loadSections = () => dispatch => {
    let arrayOfTypes = [];
    axios.get('http://192.168.18.71:5001/api/sec')
        .then(({ data }) => {
            data.data.filter(({ _id, name }) => {
                const terms = { _id, name }
                arrayOfTypes.push(terms);
                arrayOfTypes = [...new Set(arrayOfTypes)];
            })
            dispatch({
                type: SECTIONS_LIST,
                sections_list: arrayOfTypes
            })
        }).catch(err => {
            console.log('error to fetch', err)
        })
}
