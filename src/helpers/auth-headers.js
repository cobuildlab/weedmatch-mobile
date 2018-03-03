export function authHeader() {
    // return authorization header with jwt token
    let id_token = JSON.parse(localStorage.getItem('id_token'));
    if (user && user.Token) {
        return { 'Authorization': 'Token ' + id_token };
    } else {
        return {};
    }
}