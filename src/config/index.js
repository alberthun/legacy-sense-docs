
import { deepMerge } from 'lodash';
import defaultConfig from './default';
import prodConfig from './prod';

const { hostname } = window.location;

// because its annoying to see it appear in the tests
function log(message) {
  if (process.env.NODE_ENV !== 'test') console.log(message); // eslint-disable-line
}

let tmp = defaultConfig;
if (hostname === 'docs.sixgill.com') { //eslint-disable-line
  log('prod env');
  tmp = deepMerge(prodConfig, defaultConfig);
} else {
  log('default env');
}
const config = tmp;
export default config;