
async function getImages(width, height) {
    if (!height) height = width;
    
    let response = await fetch(`https://picsum.photos/${width}/${height}`);
    
    return response
}


function createImageElement (response) {
    console.log(response)
    let father = document.querySelector('.gallery');

    let div = document.createElement('div');
    div.classList.add('photo')

    father.appendChild(div);

    const img = new Image();

    img.src = response['url'];
    img.classList.add('photo-media')
    div.appendChild(img);
}


for (let i = 0; i < 2; i++) {
    getImages(700, 400).then( 
        createImageElement,
        (error) =>  new Error("something goes wrong", error)
    )
}





// async function createElement(src) {
//     let father = document.querySelector('.gallery');
//     const img = new Image();

//     img.src = 'assents/image/logo.png';
//     img.classList.add('photo')
//     father.appendChild(img);
// }

// createElement('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw2E7HOAbS9MIlQkVHW0DiYW&ust=1667057481964000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNj2spqfg_sCFQAAAAAdAAAAABAD')
// createElement('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw2E7HOAbS9MIlQkVHW0DiYW&ust=1667057481964000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNj2spqfg_sCFQAAAAAdAAAAABAD')
// createElement('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw2E7HOAbS9MIlQkVHW0DiYW&ust=1667057481964000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNj2spqfg_sCFQAAAAAdAAAAABAD')


