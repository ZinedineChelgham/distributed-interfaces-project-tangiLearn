document.addEventListener('DOMContentLoaded', function() {
    const innerCircle = document.querySelector('.inner-circle');
    const outerCircle = document.querySelector('.outer-circle');

    let isGreen = false;

    innerCircle.addEventListener('click', function() {
        if (isGreen) {
            outerCircle.style.backgroundColor = 'grey';
            isGreen = false;
        } else {
            outerCircle.style.backgroundColor = 'green';
            isGreen = true;
        }
    });
});