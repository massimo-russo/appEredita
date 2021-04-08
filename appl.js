//tramite document.querySelector accedo ai singoli elementi della pagina html
const start_btn = document.querySelector(".start_btn button");
const inizia_btn = document.querySelector(".inizia_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// bottone apri Istruzioni gioco
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

// bottone inizia Quiz
inizia_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0); 
    queCounter(1);
    startTimer(20);
    startTimerLine(0);
    var bleep = new Audio();
    bleep.src = "./suoni/musica.mp3";
    var div1 = document.getElementById("div1");
    bleep.play();
}
	let timeValue =  20;
	let que_count = 0;
	let que_numb = 1;
	let userScore = 0;
	let counter;
	let counterLine;
	let widthValue = 0;

// bottone esci informazioni
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}

//restart quiz o esci nel caso rispondo ad una domada errata
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// se esco dal quiz si ricarica la pagina
quit_quiz.onclick = ()=>{
    window.location.reload();     
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// passo alla domanda successiva
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb);
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue);
        next_btn.classList.remove("show");
    }else{
        clearInterval(counter); 
        clearInterval(counterLine);
        showResult();
    }
}

// preleva le domande dall'array domande creato 
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'+ '<div class="option"><span>'+ questions[index].options[1] +'</span></div>' + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'+ '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// icone selezione risposta
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//scelta opzione domanda tra le 4 possibili
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    //se la risposta è corretta incremento in punteggio e vado avanti altrimenti errore
    if(userAns == correcAns){
        userScore += 1; //aggiungo 1 punto in caso di riposta corretta
        answer.classList.add("correct"); //aggiungo alla lista delle domande corrette 
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        next_btn.classList.add("show"); //vado avanti se rispondo correttamente      
        var bleep = new Audio();
        bleep.src = "./suoni/esatta.mp3";
        var div1 = document.getElementById("div1");
        bleep.play();
    }else{
        //se risposta sbagliata
         answer.classList.add("incorrect"); 
         answer.insertAdjacentHTML("beforeend", crossIconTag);
         next_btn.classList.remove("show");
         result_box.classList.add("activeResult");//schermata hai perso
         next_btn.classList.remove("show");
         var bleep1 = new Audio();
         bleep1.src = "./suoni/errore.mp3";
         var div2 = document.getElementById("div2");
         bleep1.play();
         for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);    
            }
        }
    }    
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");    
    }
}



//schermata finale
function showResult(){
    info_box.classList.remove("activeInfo"); //rimuovi schermata info
    quiz_box.classList.remove("activeQuiz"); //rimuovi schermata quiz
    result_box.classList.add("activeResult"); //visualizza schermata finale risulatati
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = 'COMPLIMENTI HAI VINTO CARLO CONTI IS DEAD, LONG LIVE CARLO CONTI. '
    scoreText.innerHTML = scoreTag;
        var bleep1 = new Audio();
         bleep1.src = "./suoni/applausi.mp3";
         var a = document.getElementById("a");
         bleep1.play();
}

//start timer 20 sec per ogni domanda
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--; 
        if(time < 0){ 
            clearInterval(counter);
            result_box.classList.add("activeResult");
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer; 
            var bleep1 = new Audio();
            bleep1.src = "./suoni/errore.mp3";
            var div2 = document.getElementById("div2");
            bleep1.play();
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                 }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); //domanda successiva
        }
    }
}

/*funzione start timer*/
function startTimerLine(time){
    counterLine = setInterval(timer, 32);//velocità timer
    function timer(){
        time += 1; 
        time_line.style.width = time + "px";
        if(time > 649){ //timer si vede fino a fine tempo
            clearInterval(counterLine); 
        }
    }
}

//contatore avanzamento domade
function queCounter(index){
    let totalQueCounTag = +index;
    bottom_ques_counter.innerHTML = totalQueCounTag;
}
