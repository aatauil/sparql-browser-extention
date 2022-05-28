import Dexie from 'dexie';

export const db = new Dexie('myDatabase');

db.version(1).stores({
  folders: '++id, name',
  files: '++id, name, folderId, active',
  tabs: '++id, name, fileId, code',
})

db.open().then(function (db) {
  console.log("db initialized")
}).catch (function (err) {
  console.log("db error", err)
});