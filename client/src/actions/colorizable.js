import * as actionTypes from '../actionTypes/colorizable';

export const fetchColorizables = () => {
    return {
        type: actionTypes.FETCH_COLORIZABLE
    };
};

export const createColorizable = (colorizable, token) => {
    return {
        type: actionTypes.CREATE_COLORIZABLE,
        colorizable,
        token
    };
};

export const editColorizable = (id, colorizable, token) => {
    return {
        type: actionTypes.EDIT_COLORIZABLE,
        id,
        newColorizable: colorizable,
        token
    };
};

export const deleteColorizable = (id, token) => {
    return {
        type: actionTypes.DELETE_COLORIZABLE,
        id,
        token
    };
};
