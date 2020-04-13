import { registerDeprecationHandler } from '@ember/debug';
import config from '../config/environment';

export function initialize() {
  registerDeprecationHandler((message, options, next) => {
    if (config.environment === 'development') {
      return;
    } else {
      next(message, options);
    }
  });
}

export default { initialize };