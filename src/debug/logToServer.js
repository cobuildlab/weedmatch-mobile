const LOG_SERVER_URL = '';

/**
 * Log stringifiable anything to log server. Uses JSON.
 * @param {any} stringifiable
 */
const logToServer = stringifiable => {
    if (LOG_SERVER_URL === '') {
        throw new Error('Specify log server url before calling logToServer()');
    }
    fetch(LOG_SERVER_URL, {
        body: JSON.stringify(stringifiable, null, 4),
        method: 'POST',
    }).catch(e => {
        // eslint-disable-next-line no-console
        console.warn(`error trying to log into server: ${e.message}`);
    });
};

export default logToServer;
