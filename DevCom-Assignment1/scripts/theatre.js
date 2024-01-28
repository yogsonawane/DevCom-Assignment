const track = document.getElementById("image-track");

track.style.transform = 'translate(-20%, -70%)';

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;
    // console.log(mouseDelta)

    const percentage = (mouseDelta / maxDelta) * -100;
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    nextPercentage = Math.max(nextPercentage, -90);
    nextPercentage = Math.min(nextPercentage, -20);
    track.dataset.percentage = nextPercentage;

    
    // track.style.transform = 'translate('+(nextPercentage*0.8 - 5)+'%, -70%)';
    // for(const image of track.getElementsByClassName("image")){
    //     image.style.objectPosition = (1.3*nextPercentage+100) + "% 50%";
    // }

    track.animate({
        transform: 'translate('+(nextPercentage*0.8 - 5)+'%, -70%)'
    }, {duration: 1200, fill:"forwards"});

    for(const image of track.getElementsByClassName("image")){
        image.animate({
            objectPosition: (1.2*nextPercentage+100) + "% 50%"
        }, {duration: 1200, fill: "forwards"})
    }
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.ontouchstart = e => {
    track.dataset.mouseDownAt = e.changedTouches[0].pageX;
    console.log(e.changedTouches[0].pageX);
}

window.ontouchmove = e => {
     if(track.dataset.mouseDownAt === "0") return;
     const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.changedTouches[0].pageX,
     maxDelta = window.innerWidth / 2;
     console.log(mouseDelta)

     const percentage = (mouseDelta / maxDelta) * -100;
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    track.dataset.percentage = nextPercentage;
    
    track.style.transform = 'translate('+(nextPercentage*0.8 - 5)+'%, -70%)';
    for(const image of track.getElementsByClassName("image")){
        image.style.objectPosition = (1.4*nextPercentage+100) + "% 50%";
    }
}

window.ontouchend = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

