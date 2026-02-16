[code]/**
 * DBService.js
 * 
 * Low-level IndexedDB wrapper for AI DevTeam Todo application.
 * Handles schema initialization and provides CRUD operations.
 */

const DB_NAME = 'AI_DevTeam_Todo';
const DB_VERSION = 1;

class DBService {
  constructor() {
    this.db = null;
  }

  /**
   * Opens the IndexedDB connection and initializes the schema.
   * @returns {Promise<IDBDatabase>}
   */
  async open() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        reject('Failed to open IndexedDB');
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // 1. Tasks Store
        if (!db.objectStoreNames.contains('tasks')) {
          const taskStore = db.createObjectStore('tasks', { keyPath: 'id' });
          taskStore.createIndex('status', 'status', { unique: false });
          taskStore.createIndex('dueDate', 'dueDate', { unique: false });
          taskStore.createIndex('priority', 'priority', { unique: false });
          taskStore.createIndex('boardColumnId', 'boardColumnId', { unique: false });
          taskStore.createIndex('parentId', 'parentId', { unique: false });
        }

        // 2. Board Columns Store
        if (!db.objectStoreNames.contains('boardColumns')) {
          const columnStore = db.createObjectStore('boardColumns', { keyPath: 'id' });
          columnStore.createIndex('order', 'order', { unique: false });
        }

        // 3. Settings Store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
    });
  }

  /**
   * Standardized transaction wrapper.
   * @private
   */
  async _getTransaction(storeName, mode = 'readonly') {
    const db = await this.open();
    const transaction = db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  /**
   * Gets a single record by primary key.
   * @param {string} storeName 
   * @param {string|number} id 
   * @returns {Promise<any>}
   */
  async get(storeName, id) {
    const store = await this._getTransaction(storeName);
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Gets all records from a store or via an index.
   * @param {string} storeName 
   * @param {string} [indexName] 
   * @param {IDBKeyRange} [query] 
   * @returns {Promise<any[]>}
   */
  async getAll(storeName, indexName = null, query = null) {
    const store = await this._getTransaction(storeName);
    return new Promise((resolve, reject) => {
      let request;
      if (indexName) {
        const index = store.index(indexName);
        request = index.getAll(query);
      } else {
        request = store.getAll(query);
      }
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Adds or Updates a record.
   * @param {string} storeName 
   * @param {object} data 
   * @returns {Promise<string|number>}
   */
  async put(storeName, data) {
    const store = await this._getTransaction(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Deletes a record by primary key.
   * @param {string} storeName 
   * @param {string|number} id 
   * @returns {Promise<void>}
   */
  async delete(storeName, id) {
    const store = await this._getTransaction(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Clears all data from a specific store.
   * @param {string} storeName 
   * @returns {Promise<void>}
   */
  async clear(storeName) {
    const store = await this._getTransaction(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

// Export a singleton instance
export const dbService = new DBService();