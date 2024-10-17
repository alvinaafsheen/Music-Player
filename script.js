console.log("Welcome to spotify");
let songIndex=0;
let AudioElement=new Audio("songs/0.mp3");
let masterPlay=document.getElementById("masterplay");
let myprogressbar=document.getElementById("myprogressbar");
myprogressbar.value=0;
let gif=document.getElementById("gif");
let mastersongname=document.getElementById("mastersongname");
let songitem=Array.from(document.getElementsByClassName("songitem"));
let songplayicon=Array.from(document.getElementsByClassName("songitemplay"));
let update =document.getElementById("update");
let fduration=document.getElementById("finalduration")
let temp=-1;
songs=[
    { songName: "Umbrella - Ember Island" , filePath: "songs/0.mp3", coverPath:"covers/1.jpg",duration:"04:45"},
    { songName: "True Love" , filePath: "songs/1.mp3", coverPath:"covers/2.jpg",duration:"03:50"},
    { songName: "Warrior - Moratl" , filePath: "songs/2.mp3", coverPath:"covers/3.jpg",duration:"02:33"},
    { songName: "Cielo - Huma-Huma" , filePath: "songs/3.mp3", coverPath:"covers/4.jpg",duration:"04:33"},
    { songName: "Deaf Kev" , filePath: "songs/4.mp3", coverPath:"covers/5.jpg",duration:"04:30"},
    { songName: "Different Heaven & EHIDE" , filePath: "songs/5.mp3", coverPath:"covers/6.jpg",duration:"03:30"},
    { songName: "Enchanted" , filePath: "songs/6.mp3", coverPath:"covers/7.jpg",duration:"06:57"},
    { songName: "Under the influence" , filePath: "songs/7.mp3", coverPath:"covers/8.jpg",duration:"03:01"},
    { songName: "Shameless" , filePath: "songs/8.mp3", coverPath:"covers/9.jpg",duration:"04:47"},

]
songitem.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerText=songs[i].duration;
});
masterPlay.addEventListener('click',()=>{
    if(AudioElement.paused || AudioElement.currentTime<=0)
        {
            AudioElement.play();
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            mastersongname.innerText=songs[songIndex].songName;
            gif.style.opacity=1;
            document.getElementById(songIndex).classList.remove("fa-play-circle");
           document.getElementById(songIndex).classList.add("fa-pause-circle");
        }
    else{
             AudioElement.pause();
            masterPlay.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
            gif.style.opacity=0;
            document.getElementById(songIndex).classList.remove("fa-pause-circle");
            document.getElementById(songIndex).classList.add("fa-play-circle");
    }
}
)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
}

AudioElement.addEventListener('timeupdate',()=> {
    console.log("timeupdate");
    let progress=parseInt((AudioElement.currentTime/AudioElement.duration)*100);
    myprogressbar.value=progress;
    fduration.innerText=formatTime(AudioElement.duration);
    update.innerText=formatTime(AudioElement.currentTime);
    fduration.innerText=songs[songIndex].duration;
    if (myprogressbar.value==100)
    {
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0;
        document.getElementById(songIndex).classList.remove("fa-pause-circle");
        document.getElementById(songIndex).classList.add("fa-play-circle");
        if(songIndex>=8)
            {
                songIndex=0;
            }
            else{
                songIndex+=1;
            }
        document.getElementById(songIndex).classList.remove("fa-play-circle");
        document.getElementById(songIndex).classList.add("fa-pause-circle");
        mastersongname.innerText=songs[songIndex].songName;
        AudioElement.src=`songs/${songIndex}.mp3`;
        AudioElement.currentTime=0;
        AudioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
})
myprogressbar.addEventListener('change', ()=>{
    AudioElement.currentTime=myprogressbar.value*AudioElement.duration/100;
}
)
const makeAllPlay=()=>
    {
        Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
    }
songplayicon.forEach((element)=>
    {
        element.addEventListener('click',(e)=>{
        makeAllPlay();
        songIndex=parseInt(e.target.id);
        if(AudioElement.paused || AudioElement.currentTime<=0 || songIndex!=temp)
            {
                mastersongname.innerText=songs[songIndex].songName;
                AudioElement.src=`songs/${songIndex}.mp3`;
                AudioElement.currentTime=0;
                AudioElement.play();
                temp=songIndex;
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
                masterPlay.classList.remove("fa-play-circle");
                masterPlay.classList.add("fa-pause-circle");
                gif.style.opacity=1;
            }
        else{

                  AudioElement.pause();
                  e.target.classList.remove("fa-pause-circle");
                  e.target.classList.add("fa-play-circle");
                  masterPlay.classList.remove("fa-pause-circle");
                  masterPlay.classList.add("fa-play-circle");
                  gif.style.opacity=0;
        }
        }
        )
    }
)
document.getElementById('next').addEventListener('click',()=>
{
    document.getElementById(songIndex).classList.remove("fa-pause-circle");
    document.getElementById(songIndex).classList.add("fa-play-circle");
    if(songIndex>=8)
        {
            songIndex=0;
        }
        else{
            songIndex+=1;
        }
        document.getElementById(songIndex).classList.remove("fa-play-circle");
        document.getElementById(songIndex).classList.add("fa-pause-circle");
        mastersongname.innerText=songs[songIndex].songName;
        AudioElement.src=`songs/${songIndex}.mp3`;
        AudioElement.currentTime=0;
        AudioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    
})
document.getElementById('previous').addEventListener('click',()=>
    {
        document.getElementById(songIndex).classList.remove("fa-pause-circle");
         document.getElementById(songIndex).classList.add("fa-play-circle");
        if(songIndex<=0)
            {
                songIndex=8;
            }
            else{
                songIndex-=1;
            }
            document.getElementById(songIndex).classList.remove("fa-play-circle");
            document.getElementById(songIndex).classList.add("fa-pause-circle");
            mastersongname.innerText=songs[songIndex].songName;
            AudioElement.src=`songs/${songIndex}.mp3`;
            AudioElement.currentTime=0;
            AudioElement.play();
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");

    })
    