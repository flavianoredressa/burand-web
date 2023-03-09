export class JsonStorage {
    static getItem(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    static setItem(key, value) {
        const stringify = JSON.stringify(value);
        localStorage.setItem(key, stringify);
    }
    static removeItem(key) {
        localStorage.removeItem(key);
    }
    static clear() {
        localStorage.clear();
    }
}
