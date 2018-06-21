import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';

function getSuper() {

    userService.superService(APP_STORE.getToken())
        .then(async (response) => {
            const json = await response.json();
            console.log(`getSuper:JSON:`, json);
            if (response.ok) {
                APP_STORE.SUPER_EVENT.next({"super": json.results});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

export { getSuper };