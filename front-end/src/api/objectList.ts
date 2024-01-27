import { ObjectInterface } from '../core/object/objectInterface';
import { SessionObject } from '../core/object/sessionObject';

export const objectList: Map<String, ObjectInterface> = new Map<String, ObjectInterface>();
objectList.set('session', new SessionObject());