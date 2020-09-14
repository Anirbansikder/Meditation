const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  const timeSelect = document.querySelectorAll('.time-select button');

  const sounds = document.querySelectorAll(".sound-picker button");

  const timedisplay = document.querySelector(".time-display");

  const outlinelength = outline.getTotalLength();

  let fakeduration = 120;

  outline.style.strokeDasharray = outlinelength;
  outline.style.strokeDashoffset = outlinelength;

  sounds.forEach(sound =>{
      sound.addEventListener("click" , function(){
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        play.src = "./svg/play.svg";
      });
  });

  play.addEventListener("click", () => {
    checkplaying(song);
  });

  timeSelect.forEach(option => {
      option.addEventListener('click' , function (){
        fakeduration = this.getAttribute('data-time');
        timedisplay.textContent = `${Math.floor(fakeduration/60)}:00`;
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.pause();
      });
  });

  const checkplaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  song.ontimeupdate = () =>{
    let currentTime = song.currentTime;
    let lapsed  = fakeduration - currentTime ;
    let seconds  = Math.floor(lapsed % 60);
    let minutes = Math.floor(lapsed / 60);
    
    let progress = outlinelength - (currentTime/fakeduration) * outlinelength;
    outline.style.strokeDashoffset = progress;
    if(seconds<10){
        timedisplay.textContent = `${minutes}:0${seconds}`;
    }
    else{
        timedisplay.textContent = `${minutes}:${seconds}`;
    }
    if(currentTime >= fakeduration){
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.pause();
    }
  }
};

app();
