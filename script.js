// Welcome Effect Ends

window.addEventListener("load", () => {
    let tl = gsap.timeline();

    tl.from(document.querySelector("#websitestext"),{
        y: 12,
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
    })
    tl.from(document.querySelector("#appstext"),{
        y: 12,
        opacity: 0,
        duration: 0.5,
    })
    tl.from(document.querySelector("#brandingtext"),{
        y: 12,
        opacity: 0,
        duration: 0.5,
    })
    tl.from(document.querySelector("#taglinetext"),{
        y: 12,
        opacity: 0,
        duration: 0.5,
    })

    gsap.from(document.querySelector("#logotext"),{
        y: -15,
        opacity: 0,
        duration: 1,
    })
})

// Welcome Effect Code Ends

// Magnet Effect Code Starts

let kx = 5;
let ky = 5655;


const makeMagnetic = (ele,mf1) => {
    let going = true;
    const rect = ele.getBoundingClientRect();
    let centreY = rect.top+(rect.height/2);
    let centreX = rect.left+(rect.width/2);
    ele.addEventListener("mouseover",() => {
        going = false;
    })
    document.addEventListener("mousemove",(evt) => {
        let x = evt.clientX;
        let y = evt.clientY;
        let delx = x-centreX;
        let dely = y-centreY;
        let r = 70;
        if (Math.abs(delx) <= 50 && Math.abs(dely) <= 50) {
            document.removeEventListener("mousemove",mfMove);
            gsap.to(mf1,{
                height: 50,
                width: 50,
                x: centreX-kx-20,
                y: centreY-ky-20,
                duration: 0.2,
            })
        }
        let totalAngle = 0;
        if (Math.abs(delx) <= r && Math.abs(dely) <= r && !going) {
            const angle = Math.atan2(dely,delx)*(180/Math.PI);
            totalAngle += angle;
            document.removeEventListener("mousemove",mfMove);
            gsap.to(ele,{
                x: delx/10,
                y: dely/10,
            })
            gsap.to(mf1,{
                width: Math.max(50,((delx**2+dely**2)**(1/2)))+"px",
                height: 50,
                duration: 0.2,
            })
            gsap.to(mf1,{
                rotation: angle,
                duration: 0.2,
            })
            ele.src = "images/menuimgwhite.webp";
            ele.style.color = "white";
        }
        else {
            if (!going) {
                gsap.to(mf,{
                    rotate: -1*totalAngle,
                });
                let tl = gsap.timeline();
                tl.to(ele,{
                    x: -delx/30,
                    y: -dely/30,
                    duration: 0.25,
                })
                tl.to(ele,{
                    x: +delx/40,
                    y: +dely/40,
                    duration: 0.1875, 
                })
                tl.to(ele,{
                    x: -delx/40,
                    y: -dely/40,
                    duration: 0.1875,
                })
                tl.to(ele,{ 
                    x: +delx/50,
                    y: +dely/50,
                    duration: 0.125,
                })
                tl.to(ele,{ 
                    x: -delx/50,
                    y: -dely/50,
                    duration: 0.125,
                })
                tl.to(ele,{ 
                    x: +delx/60,
                    y: +dely/60,
                    duration: 0.125,
                })
                tl.to(ele,{ 
                    x: -delx/60,
                    y: -dely/60,
                    duration: 0.125,
                })
            }
            going = true;
            if (!(Math.abs(delx) <= r && Math.abs(dely) <= r)) {
                document.addEventListener("mousemove",mfMove);
            }
            ele.src = "images/menuimgblack.webp";
            ele.style.color = "black";
        }
    })
}

// Magnet Effect Code Ends

// Mouse Follower Code Starts

function createMouseFollower() {
    let mf = document.createElement("div");
    mf.classList.add("mouseFollower")
    document.body.append(mf);
    return mf;
}

let initial = true;
let mf;

const mfMove = (evt) => {
    if (initial) {
        mf = createMouseFollower();
        initial = false;
        let menuicon = document.querySelector("#menuicon");
        makeMagnetic(menuicon,mf);
    }
    gsap.to(mf,{
        x: evt.clientX-kx,
        y: evt.clientY-ky,
        height: 10,
        width: 10,
        duration: 0.4,
    })
}

document.addEventListener("mousemove", mfMove);

// Mouse Follower Code Ends

// Mask Code Start

const mask = (ele) => {
    ele.addEventListener("mousemove",(evt) => {
        document.removeEventListener("mousemove",mfMove);
        ele.style.color = "#ffffff";
        gsap.to(mf,{
            color: "black",
            x: evt.clientX-kx-20,
            y: evt.clientY-ky-20,
            height: 70,
            width: 70,
            duration: 0.3,
        })
    })
    ele.addEventListener("mouseout",() => {
        document.addEventListener("mousemove",mfMove);
        ele.style.color = "#000000";
    })
}

let logo = document.querySelector("#logo");
mask(logo);

// Mask Code Ends

// Video in Mouse Follower code starts

const mfVideo = (ele,videoLink) => {
    let vid = document.createElement("video");
    vid.src = videoLink;
    vid.muted = true;
    vid.style.width = "178%";
    vid.style.height = "auto";
    vid.style.objectFit = "cover";
    vid.rotation = "0";
    ele.addEventListener("mousemove",(evt) => {
        document.removeEventListener("mousemove",mfMove);
        vid.loop = true;
        vid.play();
        mf.append(vid);
        gsap.to(mf,{
            x: evt.clientX-kx-160,
            y: evt.clientY-ky-160,
            height: 400,
            width: 400,
            duration: 0.5,
        })
    })
    ele.addEventListener("mouseout",() => {
        document.addEventListener("mousemove",mfMove);
        if (mf.contains(vid)) {
            mf.removeChild(vid);
        }
    })
}

let websitestext = document.querySelector("#websites");
let appstext = document.querySelector("#apps");
let brandingtext = document.querySelector("#branding");

mfVideo(websitestext,"videos/video1.mp4");
mfVideo(appstext,"videos/video2.mp4");
mfVideo(brandingtext,"videos/video1.mp4");

// Video in Mouse Follower code ends

// Image Effect Code starts

let projects = document.querySelector("#projectdescription");
let imgs = document.querySelector("#imgdescription")

document.addEventListener("scroll", () => {
    let rect = projects.getBoundingClientRect();
    if (rect.bottom <= projects.offsetHeight / 6) {
        imgs.style.position = "absolute";
        imgs.style.top = "502.5vh";
        imgs.style.right = "15vw";
    }
    else if (rect.top <= 0) {
        imgs.style.position = "fixed";
        imgs.style.top = "2.5vh";
        imgs.style.right = "13.9vw";
    }
    else {
        imgs.style.position ="absolute";
        imgs.style.top = "2.5vh";
        imgs.style.right = "15vw";
    }
})

document.addEventListener("scroll", () => {
    if (imgs.scrollTop+imgs.clientHeight < imgs.scrollHeight) {
        if (document.documentElement.scrollTop > 1300) {
            imgs.scrollTop = document.documentElement.scrollTop-1300;
        }
    }
})

imgs.addEventListener("scroll", () => {
    if (imgs.scrollTop+imgs.clientHeight < imgs.scrollHeight) {
        document.documentElement.scrollTop = imgs.scrollTop+1300;
    }
})

let noOfImages = 6;

document.addEventListener("scroll", () => {
    let parRect = imgs.getBoundingClientRect();
    for (let i = 1; i <= noOfImages; i++) {
        let image = document.getElementById('img'+i);
        let rect = image.getBoundingClientRect();
        if (rect.top < parRect.top) {
            image.style.position = "fixed";
            image.style.top = parRect.top+"px";
        }
        let next = i+1;
        if (next <= noOfImages) {
            let nextImage = document.getElementById('img'+next);
            let nextRect = nextImage.getBoundingClientRect();
            if (i > 1) {
                if (nextRect.top >= rect.bottom+image.height/38) {
                    image.style.position = "absolute";
                    let vari = 37.05*(i-1)*(image.height)*(1/38);
                    image.style.top = vari+"px";
                }
            }
        }
        if (i == 1) {
            if (rect.top > parRect.top) {
                image.style.position = "absolute";
                image.style.top = "0vh";
            }
        }
    }
})

let avgColors = [];
let first = [];
for (let i = 0; i < noOfImages; i++) {
    first.push(true);
}

let mfColor = ["black","white","brown","yellow","brownish grey","grey"];

for (let i = 1; i <= noOfImages; i++) {
    const canvas = document.getElementById('img' + i);
    const ctx = canvas.getContext('2d');
    let k = 20;
    const waveSpeed = 0.01;
    let amplitude = 10;
    const frequency = 0.02;
    let time = 0;
    let im = new Image();
    im.src = `images/projectimg/img${i}.webp`;
    let avgColor = [0, 0, 0, 0];
    document.addEventListener("scroll", () => {
        if (canvas.getBoundingClientRect().top <= imgs.getBoundingClientRect().top) {
            k = 44;
            amplitude = 1;
        }
        else {
            k = 20;
            amplitude = 10;
        }
    })
    const waveHeight = canvas.height / k;
    function drawWave() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / k);
        for (let j = 0; j < canvas.width; j++) {
            const randomOffset = amplitude * Math.sin(frequency * j);
            const y = waveHeight * Math.sin(waveSpeed * j + time) + canvas.height / k + randomOffset;
            ctx.lineTo(j, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(im, 0, 0, canvas.width, canvas.height);

        time += 0.03;
        requestAnimationFrame(drawWave);
    }

    im.onload = function () {
        if (first[i - 1]) {
            imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            for (let j = 0; j < imgData.length; j += 4) {
                for (let k = 0; k < 4; k++) {
                    avgColor[k] += imgData[j + k];
                }
            }
            for (let j = 0; j < 4; j++) {
                avgColor[j] /= imgData.length / 4;
            }
            let projectColor = "linear-gradient(to bottom";
            for (let j = 1; j <= noOfImages; j++) {
                let currPer = ((j - 1) * 100) / (noOfImages-1);
                projectColor += `, rgb(${Math.round(avgColors[j - 1][0]-6)},${Math.round(avgColors[j - 1][1]-6)},${Math.round(avgColors[j - 1][2]-6)},${avgColors[j - 1][3]-6}) ${currPer}%`;
            }
            projectColor += ")";
            projects.style.background = projectColor;
            first[i - 1] = false;
        }
    };

    drawWave();
    avgColors.push(avgColor);
}

document.addEventListener("scroll", () => {
    if (projects.getBoundingClientRect().top <= 0) {
        menuicon.style.zIndex = 2;
    }
    else {
        menuicon.style.zIndex = 0;
    }
})

const mfColorChange = () => {
    let proRect = projects.getBoundingClientRect();
    let mfRect =  mf.getBoundingClientRect();
    if (mfRect.top > proRect.top && mfRect.bottom < proRect.bottom) {
        mf.style.zIndex = 1;
        let posY = mfRect.top - proRect.top;
        let i = Math.ceil(posY/(projects.offsetHeight/6));
        mf.style.backgroundColor = `rgb(${255-avgColors[i-1][0]},${255-avgColors[i-1][1]},${255-avgColors[i-1][2]})`;

    }
    else {
        mf.style.zIndex = -1;
        mf.style.backgroundColor = "black";
    }
}

document.addEventListener("mousemove",mfColorChange);
document.addEventListener("scroll",mfColorChange);

document.addEventListener("mousemove", (evt)=> {
    let imgsRect = imgs.getBoundingClientRect();
    if (evt.x > imgsRect.left && evt.x < imgsRect.right && evt.y > imgsRect.top && evt.y < imgsRect.bottom) {
        document.removeEventListener("mousemove",mfMove);
        mf.innerHTML = "<p> Explore </p> <p> Now </p>";
        gsap.to(mf,{
            x: evt.clientX-kx-50,
            y: evt.clientY-ky-50,
            height: 100,
            width: 100,
            duration: 0.3,
        })
    }
    else {
        if (mf.children.length == 2) {
            mf.innerHTML = "";
        }
        document.addEventListener("mousemove",mfMove);
    }
})

document.addEventListener("scroll", ()=> {
    let imgsRect = imgs.getBoundingClientRect();
    let mfRect = mf.getBoundingClientRect();
    const mfCenterX = (mfRect.left+mfRect.right)/2;
    const mfCenterY = (mfRect.top+mfRect.bottom)/2;
    if (!(mfCenterX > imgsRect.left && mfCenterX < imgsRect.right && mfCenterY > imgsRect.top && mfCenterY < imgsRect.bottom)) {
        if (mf.children.length == 2) {
            mf.innerHTML = "";
        }
        gsap.to(mf,{
            height: 10,
            width: 10,
            duration: 0.3,
        })
    }
})

// Image Effect Code Ends