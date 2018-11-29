import {authHeader, URL} from '../../utils';
import AuthStore,
{events as authStoreEvents} from '../../modules/auth/AuthStore'

import {dispatchEvent} from "../../utils/flux-state";

/**
 * Get all the images for the logged user
 * @param token
 * @param id
 */
export const getProfileImages = async (token, id) => {
    console.log(`authActions:getProfileImages:`, [token, id]);

    const headers = {
        headers: authHeader(token),
        method: 'GET',
    };
    console.log(`authActions:getProfileImages:`, headers);
    try {
        const response = await fetch(`${URL}profile/${id}/list-image-profile/`, headers);
        console.log(`authActions:getProfileImages:`, response);
        const jsonResponse = await response.json();
        console.log(`authActions:getProfileImages:`, jsonResponse);
        console.log(`authActions:getProfileImages:`, jsonResponse[0].image_1x);
        dispatchEvent(authStoreEvents.PROFILE_IMAGE, jsonResponse[0].image_1x);
    } catch (err) {
        dispatchEvent(AuthStore.events.ERROR, err.message);
    }

};


