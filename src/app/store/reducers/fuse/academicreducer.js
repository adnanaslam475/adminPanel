import * as Actions from '../../actions/fuse/index';

const initialState = {
    departments_list: [],
    courses_list: [],
    terms_list: [],
    sections_list: [],
    // products_list: []
};

const academic = function (state = initialState, action) {
    switch (action.type) {
        case Actions.DEPARTMENTS_LIST:
            {
                return {
                    ...state,
                    departments_list: action.departments_list
                }
            }
        case Actions.COURSES_LIST:
            {
                return {
                    ...state,
                    courses_list: action.courses_list
                }
            }
        case Actions.TERMS_LIST:
            {
                return {
                    ...state,
                    terms_list: action.terms_list
                }
            }
        case Actions.SECTIONS_LIST:
            {
                return {
                    ...state,
                    sections_list: action.sections_list
                }
            }
        

        default:
            {
                return state;
            }
    }
};

export default academic;