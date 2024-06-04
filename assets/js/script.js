const controlsButtons = document.querySelectorAll('[data-type]');

controlsButtons.forEach(
    function (controlsButtons){
        controlsButtons.addEventListener('click', function(event){
            const controlsWeapon = controlsButtons.getAttribute('data-type');
            makeSelection(controlsWeapon);
            });
        });
function makeSelection(selection) {
console.log(selection);}