export declare class JsonStorage {
    static getItem<T = any>(key: string): T;
    static setItem(key: string, value: any): void;
    static removeItem(key: string): void;
    static clear(): void;
}
