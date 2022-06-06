import Dexie from 'dexie';

export const db = new Dexie('myDatabase');

db.version(1).stores({
  folders: '++id, name, isCollapsed',
  files: '++id, name, folderId, inTab, focused, code, output, created, modified',
})

db.open().then(function (db) {
  console.log("db initialized")
}).catch (function (err) {
  console.log("db error", err)
});