// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

document.addEventListener("dragenter", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

document.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();


  for (const f of e.dataTransfer.files) {
        // Using the path attribute to get absolute file path
    console.log('File Path of dragged files: ', f.path)
        //pathArr.push(f.path); // assemble array for main.js
  }
    //console.log(pathArr);
    //const ret = ipcRenderer.sendSync('dropped-file', pathArr);
    //console.log(ret);
});

