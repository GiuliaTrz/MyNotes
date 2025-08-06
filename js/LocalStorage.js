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

    /**
     * Initializes a new database structure in LocalStorage
     * @private
     */
    _initDB() {
        const db = {
            name: this.dbName,
            createdAt: new Date().toISOString(),
            data: {},
        };
        localStorage.setItem(this.dbName, JSON.stringify(db));
    }

    /**
     * Retrieves the entire database object
     * @private
     * @returns The parsed database object or null if not found
     */
    _getDB(){
        const db = localStorage.getItem(this.dbName);
        if(db){ 
            return JSON.parse(db);
        }else{ // database not found!
            return null;
        }
    }

    /**
     * Saves the entire database object to LocalStorage
     * @private
     * @param {*} db - The database object to save
     */
    _saveDB(db){
        localStorage.setItem(this.dbName, JSON.stringify(db));
    }

    /**
     * Stores an object using the key and the value
     * @param {string} key the key used to store the object 
     * @param {*} value the value we want to archive
     */
    set(key, value){
        const db = this._getDB();
        db.data[key]= value;
        this._saveDB(db);
    }
}