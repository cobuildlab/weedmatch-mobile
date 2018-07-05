import {userService} from './service';

function changeToken(token) {

    userService.refreshToken(token)
        .then(async (response) => {
            const json = await response.json();
            console.log(`refreshToken:JSON:`, json);
            if (response.ok) {
                return;
            }
            console.log(json.detail)
        });
}

export { changeToken };