let slider = document.getElementById("myRange");

updateColor = () => {
    // let color = 'red';
    // let color = '#'+String(slider.value).padStart(3,'0');
    // let color = 'rgb(100,100,100)';
    let color1 = 'hsl('+String(slider.value*0.18+120)+',10%,25%)';
    let color2 = 'hsl('+String((slider.value*0.18+120))+',10%,75%)';
    let color3 = 'hsl('+String((slider.value*0.045))+',50%,50%)';
    console.log(color1,color2,color3);
    document.body.style.backgroundColor = color1;
    for (let item of document.getElementsByClassName('card')){
        item.style.backgroundColor = color2;
        item.style.borderColor = color3;
    }
    for (let item of document.getElementsByClassName('slider')){
        item.style.backgroundColor = color2;
        item.style.borderColor = color3;
    }

    var style = document.querySelector('[data="test"]');
    style.innerHTML = ".slider::-webkit-slider-thumb { background-color: " + color3 + " !important; }";
}

document.onload = updateColor();
slider.oninput = () => updateColor();
