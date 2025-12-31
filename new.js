let index=0;
let started=false;
const slider=document.getElementById("slider");
const music=document.getElementById("music");
const heart = document.getElementById("heart");
const h1slide1 = document.getElementById("h1slide1");

music.volume = 1.0;

function next(){
    if(!started){
        music.play();
        started=true;
    }
    index++;
    slider.style.transform=`translateX(-${index*100}vw)`;

    if(index===3){
        fireworks();
        playFireworkSounds();
        sparkleConfetti();
        animateHeartAndName();
        shimmerH1Slide1();
        createSparkles();
    }
}

function restart(){
    index=0;
    slider.style.transform="translateX(0)";
    heart.classList.remove("fireworkPulse");
    document.querySelector(".name").style.textShadow="";
    h1slide1.style.animation = "";
}

// CONFETTI
let confettiList = [];
for(let i=0;i<150;i++){
    let c=document.createElement("div");
    c.className="confetti";
    c.style.left=Math.random()*100+"vw";
    c.style.animationDuration=(Math.random()*3+2)+"s";
    c.style.background=`hsl(${Math.random()*360},100%,50%)`;
    document.body.appendChild(c);
    confettiList.push(c);
}

// FIREWORKS
function fireworks(){
    for(let i=0;i<7;i++){
        setTimeout(createFirework,i*500);
    }
}

function createFirework(){
    const x=Math.random()*window.innerWidth;
    const y=Math.random()*window.innerHeight/2;
    for(let i=0;i<35;i++){
        const f=document.createElement("div");
        f.className="firework";
        f.style.left=x+"px";
        f.style.top=y+"px";
        f.style.background=`hsl(${Math.random()*360},100%,50%)`;
        const angle=Math.random()*Math.PI*2;
        const dist=Math.random()*180;
        f.style.setProperty("--x",Math.cos(angle)*dist+"px");
        f.style.setProperty("--y",Math.sin(angle)*dist+"px");
        document.body.appendChild(f);
        setTimeout(()=>f.remove(),1000);
    }
}

function playFireworkSounds(){
    for(let i=0;i<7;i++){
        setTimeout(()=>{
            const fw = new Audio("https://cdn.pixabay.com/download/audio/2022/12/27/audio_2a1b3e5d8a.mp3");
            fw.volume = 0.7;
            fw.play();
        }, i*500);
    }
}

function sparkleConfetti(){
    let sparkleCount = 0;
    const sparkleInterval = setInterval(()=>{
        confettiList.forEach(c=>{
            c.style.background=`hsl(${Math.random()*360},100%,50%)`;
            c.style.transform=`scale(${Math.random()*1.5+0.5}) rotate(${Math.random()*360}deg)`;
        });
        sparkleCount++;
        if(sparkleCount>14) clearInterval(sparkleInterval);
    }, 100);
}

function animateHeartAndName(){
    heart.classList.add("fireworkPulse");
    const name = document.querySelector(".name");
    let glowCount = 0;
    const glowInterval = setInterval(()=>{
        name.style.textShadow = `0 0 ${Math.random()*20+10}px hsl(${Math.random()*360},100%,75%)`;
        glowCount++;
        if(glowCount>14){
            clearInterval(glowInterval);
            name.style.textShadow = "";
            heart.classList.remove("fireworkPulse");
        }
    },100);
}

// shimmer and bounce for slide 1
function shimmerH1Slide1(){
    h1slide1.style.animation = "shimmerBounce 1.5s ease-in-out infinite";
}

// Sparkles around text and heart
function createSparkles(){
    for(let i=0;i<30;i++){
        setTimeout(()=>{
            const sparkle = document.createElement("div");
            sparkle.className = "sparkle";
            const parentRect = Math.random()>0.5 ? h1slide1.getBoundingClientRect() : heart.getBoundingClientRect();
            sparkle.style.left = (parentRect.left + Math.random()*parentRect.width) + "px";
            sparkle.style.top = (parentRect.top + Math.random()*parentRect.height) + "px";
            document.body.appendChild(sparkle);
            setTimeout(()=>sparkle.remove(),1000);
        }, i*100);
    }
}

// FLOATING STARS
for(let i=0;i<50;i++){
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random()*window.innerWidth + "px";
    star.style.top = Math.random()*window.innerHeight + "px";
    star.style.setProperty("--randX", Math.random());
    star.style.animationDuration = (Math.random()*20+10) + "s";
    document.body.appendChild(star);
}