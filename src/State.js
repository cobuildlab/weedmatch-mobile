import { Subject } from 'rxjs/Subject';

const LOGINSTATE = new Subject();
const APPSTATE = new Subject();

export { LOGINSTATE, APPSTATE };
