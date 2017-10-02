window.onload =  (function () {
    const app = new App();
    const myBtn = document.getElementById('myBtn');
    var slider = document.getElementById("myRange");

    myBtn.addEventListener('mousedown', () => app.mousedown());
    myBtn.addEventListener('mouseup', () => app.mouseup());

    slider.oninput = function() {
        app.slider(this.value);
    }
});
