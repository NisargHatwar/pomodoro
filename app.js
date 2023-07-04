const startstopbtn = document.querySelector('#timer-button').children[0];
const resetbtn = document.querySelector('#timer-button').children[1];
const hour = document.querySelector('#hourcounter').children[0];
const minute = document.querySelector('#minutecounter').children[0];
const second = document.querySelector('#secondcounter').children[0];
const modebtn = document.querySelector("#mode");
const settings = document.querySelector("#settings");
const audio = new Audio('audio/alert.mp3');
const toggle = document.querySelector('#togglesettingsbtn');
//assigning values to variables
let focustime = [0,25,0];
let shortb = [0,5,0];
let longb = [0,15,0];
let clockwork = false;
let mode = 'focus';

//defining functions
const togglesettings = (tog) => {
    if(tog === 'close'){
        toggle.children[1].style.display = 'none';
        toggle.children[0].style.display = 'inline';
        settings.style.display = 'none';
        document.querySelector('.container').style.height = '18vh !important';
        document.querySelector('.container').style.minheight = '300px !important';
    }
    else{
        toggle.children[0].style.display = 'none';
        toggle.children[1].style.display = 'inline';
        settings.style.display = 'flex';
        document.querySelector('.container').style.height = '30vh';
        document.querySelector('.container').style.minheight = '500px';
    }
    return tog;
}
const currtime = () => {
    if(mode === 'long break'){
        return longb;
    }
    else if(mode === 'short break'){
        return shortb;
    }
    return focustime;
}
const resetvalues = (h,m,s) => {
    second.innerText = s;
    minute.innerText = m;
    hour.innerText = h;
}

const countdown = () => {
    const time = parseInt(hour.innerText)*3600 + parseInt(minute.innerText)*60 + parseInt(second.innerText) - 1;
    resetvalues(parseInt(time/3600),parseInt(parseInt(time/60)%60),parseInt(time%60))
}

const resetCD = () => {
    const time = currtime();
    resetvalues(time[0],time[1],time[2])
    clockwork = false;
    startstopbtn.innerText = 'Start';
}
const setUpTheme = () => {
    const currmode = mode;
    // const colorpalette = ['#557153', '#7D8F69', '#A9AF7E','#E6E5A3'];
    const colorpalette = ['#797A7E','#D8D3CD','#E0ECE4','#F7F2E7']
    modebtn.children[0].style.backgroundColor = colorpalette[1];
    modebtn.children[1].style.backgroundColor = colorpalette[1];
    modebtn.children[2].style.backgroundColor = colorpalette[1];
    document.querySelector('#togglesettingsbtn').style.backgroundColor = colorpalette[0];
    document.querySelector('#timer').style.backgroundColor = colorpalette[3];
    startstopbtn.style.backgroundColor = colorpalette[1];
    resetbtn.style.backgroundColor = colorpalette[1];
    for(let elem of settings.children){
        elem.style.backgroundColor = colorpalette[2];
        for(let ele of elem.children[1]){
            ele.style.backgroundColor = colorpalette[3];
        }
        elem.children[1].children[3].style.backgroundColor = colorpalette[1];
    }
    if(currmode === 'focus'){
        modebtn.children[0].style.backgroundColor = colorpalette[0];
    }
    else if(currmode === 'short break'){
        modebtn.children[1].style.backgroundColor = colorpalette[0];
    }
    else{
        modebtn.children[2].style.backgroundColor = colorpalette[0];
    }
}
const changemode = function(nextmode){
    mode = nextmode;
    setUpTheme();
    resetCD();
}
//giving starting themes
setUpTheme('focus');
//This code will run every second
setInterval(() => {
    if(clockwork === true){
        countdown();
    }
    const timenow = parseInt(hour.innerText)*3600 + parseInt(minute.innerText)*60 + parseInt(second.innerText);
    if(timenow === 0){
        if(mode === 'focus'){
            changemode('short break');
        }
        else{
            changemode('focus');
        }
        audio.play();
    }
},1000)

//adding event listeners
//  start/stop button and reset button
startstopbtn.addEventListener('click', () => {
    clockwork = !clockwork;
    clockwork?(startstopbtn.innerText = 'Pause'):(startstopbtn.innerText = 'Start');
})

resetbtn.addEventListener('click', resetCD);

// mode buttons
modebtn.children[0].addEventListener('click', () => {
    mode = 'focus';
    resetvalues(...focustime);
    resetCD();
    setUpTheme();
})

modebtn.children[1].addEventListener('click', () => {
    mode = 'short break';
    resetvalues(...shortb);
    resetCD();
    setUpTheme();
})

modebtn.children[2].addEventListener('click', () => {
    mode = 'long break';
    resetvalues(...longb);
    resetCD();
    setUpTheme();
})

//form buttons
for(let elem of settings.children){
    elem.children[1].addEventListener('submit', (e) => {
        e.preventDefault();
        const htime = parseInt(elem.children[1].children[0].value) || 0;
        const mtime = parseInt(elem.children[1].children[1].value) || 0;
        const stime = parseInt(elem.children[1].children[2].value) || 0;
        if(htime*3600 + mtime*60 + stime > 0){
            if(elem.children[0].innerText === 'Short Break:'){
                shortb = [htime,mtime,stime];
                if(mode === 'short break'){
                    resetCD();
                }
            }
            else if(elem.children[0].innerText === 'Long Break:'){
                longb = [htime,mtime,stime];
                if(mode === 'long break'){
                    resetCD();
                }
            }
            else{
                focustime = [htime,mtime,stime];
                if(mode === 'focus'){
                    resetCD();
                }
            }
        }
        else{
            window.alert("Can't set the timer for these values");
        }
    })
}
let currtog = togglesettings('close');
toggle.addEventListener('click', () => {
    if(currtog === 'close'){
        currtog = togglesettings('open');
    }
    else{
        currtog = togglesettings('close');
    }
})