window.onload =  (function () {
    const app = new App();
    const myBtn = document.getElementById('myBtn');
    myBtn.addEventListener('mousedown', () => app.mousedown());
    myBtn.addEventListener('mouseup', () => app.mouseup());
});
