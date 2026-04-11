import './element-prefix';
import './components/login';

export {
  elementLocalTag,
  getElementPrefix,
  isElementPrefixFrozen,
  normalizeElementPrefix,
  syncElementPrefixFromGlobal,
} from './element-prefix';
export * from './components/login';
export { default as styleUrl } from './style.css?url';
