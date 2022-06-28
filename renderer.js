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

  window.electron.parseSrt(e.dataTransfer.files[0].path);
});

