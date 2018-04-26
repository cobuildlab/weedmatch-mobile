import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';

function publicProfileAction(token, id) {
    console.log(`publicProfileAction: ${token}, ${id}`);

    userService.publicProfile(token, id)
        .then(async (response) => {
            console.log(`publicProfileAction: ${token}, ${id}`, response);
            const json = await response.json();
            console.log(`publicProfileAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PUBLICPROFILE_EVENT.next({"publicProfile": json});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

export {publicProfileAction};