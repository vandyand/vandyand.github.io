let slider = document.getElementById("myRange");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    // let color = 'red';
    // let color = '#'+String(slider.value).padStart(3,'0');
    // let color = 'rgb(100,100,100)';
    let color1 = 'hsl('+String(slider.value*3.6)+',50%,50%)';
    let color2 = 'hsl('+String((slider.value*3.6-45)%360)+',50%,50%)';
    let color3 = 'hsl('+String((slider.value*3.6+45)%360)+',50%,50%)';
    console.log(color1,color2,color3);
    document.body.style.backgroundColor = color1;
    for (let item of document.getElementsByClassName('card')){
        item.style.backgroundColor = color2;
        item.style.borderColor = color3;
    }
    // document.getElementsByClassName('card').style.backgroundColor = color2;
    // document.getElementsByClassName('card').style.borderColor = color3;
}
