let slider = document.getElementById("myRange");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    // let color = 'red';
    // let color = '#'+String(slider.value).padStart(3,'0');
    // let color = 'rgb(100,100,100)';
    let color = 'hsl('+String(slider.value*3.6)+',100%,50%)';
    console.log(color);
    document.body.style.backgroundColor = color;
}
