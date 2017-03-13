import * as actionTypes from '../actionTypes/colorizableElement';

export const fetchColorizableElements = () => {
    return {
        type: actionTypes.FETCH_COLORIZABLEELEMENTS
    };
};

export const createColorizableElement = (colorizableElement, token) => {
    return {
        type: actionTypes.CREATE_COLORIZABLEELEMENT,
        colorizableElement,
        token
    };
};

export const editColorizableElement = (id, colorizableElement, token) => {
    return {
        type: actionTypes.EDIT_COLORIZABLEELEMENT,
        id,
        newColorizableElement: colorizableElement,
        token
    };
};

export const deleteColorizableElement = (id, token) => {
    return {
        type: actionTypes.DELETE_COLORIZABLEELEMENT,
        id,
        token
    };
};
