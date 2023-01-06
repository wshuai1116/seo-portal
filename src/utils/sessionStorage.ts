import { isBrowser } from "./ssr";

// simple mem storage, more safer
let storage: Record<string, any> = {};

const sessionStorage = {
  set(key: string, val: any) {
    if (val instanceof Object) {
      val = JSON.stringify(val);
    }

    if (!isBrowser()) {
      storage[key] = val;
    } else {
      if (window?.sessionStorage) {
        window.sessionStorage.setItem(key, val);
      } else {
        storage[key] = val;
      }
    }
  },
  get(key: string) {
    if (!isBrowser()) {
      return storage[key] || null;
    } else {
      if (window?.sessionStorage) {
        return window.sessionStorage.getItem(key) || null;
      } else {
        return storage[key] || null;
      }
    }
  },
  delete(key: string) {
    if (!isBrowser()) {
      delete storage[key];
    } else {
      if (window?.sessionStorage) {
        window.sessionStorage.removeItem(key);
      } else {
        delete storage[key];
      }
    }
  },
  clear() {
    if (!isBrowser()) {
      storage = {};
    } else {
      if (window?.sessionStorage) {
        window.sessionStorage.clear();
      } else {
        storage = {};
      }
    }
  },
};

export default sessionStorage;
