import {dispatchEvent} from '../../utils/flux-state';
import {ERROR_ENUM, PLACE_ENUM, REPORT_API_ENDPOINT_URL} from "./index";
import * as Validation from "./services/typings";
import {APP_STORE} from "../../Store";
import {validateReport} from "./services/typings";

/**
 * Action to report a user
 */
export const reportAction = report => {
    console.log("ReportAction:", report);
    const {place, reported_user} = report;

    if (typeof place === 'undefined') {
        return dispatchEvent("ReportError", 'Missing `place` parameter in report route');
    }

    if (typeof reported_user !== 'string') {
        return dispatchEvent("ReportError", 'Missing or wrong type of `reported_user` parameter in report route');
    }

    try {
        validateReport(report);
    } catch (e) {
        return dispatchEvent("ReportError", e.message);
    }

    const headers = {
        Authorization: `Token ${APP_STORE.getToken()}`,
        'Content-Type': 'application/json',
    };

    fetch(REPORT_API_ENDPOINT_URL, {
        body: JSON.stringify(report),
        headers,
        method: 'POST',
    })
        .then(res => Promise.all([res.ok, res.json()]))
        .then(([ok, json]) => {
            console.log("ReportAction:", [ok, json]);
            if (ok) {
                if (!Validation.isSuccessResponse(json) && __DEV__) {
                    // eslint-disable-next-line no-console
                    console.log(
                        `Invalid response from server accompanied by OK response status: ${JSON.stringify(json)}`
                    );
                    return dispatchEvent("ReportError", 'Report Service Error');
                }
                return dispatchEvent("Reported", {});
            }
            return dispatchEvent("ReportError", 'Connection Error');
        })
};
