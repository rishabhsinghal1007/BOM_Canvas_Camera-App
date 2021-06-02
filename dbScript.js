let request = indexedDB.open("camera", 1);
let db;
request.onsuccess = function (e) {
    db = request.result;
    let note = {
        nId: "fbjsbdghjb",
        txt: "hello  df"
    }
    
    let tx = db.transaction("gallery", "readwrite");
    let store = tx.objectStore("gallery");
    store.add(note);
}

request.onupgradeneeded = function (e) {
    db = request.result;
    db.createObjectStore("gallery", { keyPath: "nId" });
}