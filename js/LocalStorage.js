/*

*/

class LocalStorageDB {
    /**
     * Creates a new LocalStorageDB instance or loads an existing one
     * 
     * @param {string} dbName The database name
     */
    constructor(dbName){
        this.dbName = dbName;
        const existingDB = localStorage.getItem(this.dbName);

        if(!existingDB) {
            this._initDB();
        }
    }

    _initDB() {
        const db = {
            name: this.dbName,
            createdAt: new Date().toISOString(),
            data: {},
        };
        localStorage.setItem(this.dbName, JSON.stringify(db));
    }
}