const quiz_box= document.getElementsByClassName("small-box");
const options = document.getElementsByClassName("options");

const timeNow = document.getElementById("countDown"); //CountDown division

//Counter
let curr_index=0;   //index counter
let correctOption=0; //Option Index
let correctlyAnswered=0; //Correct answer Counter

console.log(`Questions ${curr_index+1} / 10`);

//
let curr_tick_icon=0,curr_cross_icon=0,last_correct_pos=0,last_cross_pos=0;

//Time Counter Properties
let counter; //Time Counter

let timeValue = 15;
timeNow.innerHTML= timeValue;
startTimer(timeValue); //running counting


const next_btn=  document.getElementById("next-button");

//If Next Button is Clicked
next_btn.onclick = ()=>{
    if(curr_index < questions.length - 1){
        curr_index++;
        showQuestions(curr_index);
        console.log(`Questions ${curr_index+1} / 10`);
        clearInterval(counter);
        startTimer(timeValue);
        document.getElementById("countDown").innerHTML= timeValue;
        
    }
    else if(curr_index=10){
        clearInterval(counter);
        document.getElementById("main-body").innerHTML=
        `
        <!-- The video -->
        <video autoplay muted loop id="myVideo">
            <source src="./img/earthvideo.mp4" type="video/mp4">
        </video>
        <div class="last-image-container">
        <div class="last-page-container">
            <section class="top-section"></section>
            <section class="last-mid-section">
                <div class="small-box">
                    <h1>Thanks For Playing</h1>
                    <p>You got <span id="correctly">${correctlyAnswered}</span>/10 questions correct</p>
                    <a href="./index.html">
                        <button id="retry-button" class="btn btn-success btn-lg">
                            Try Again
                            <i class="fa-solid fa-rotate-right" style="color: #000000;"></i>
                        </button>
                    </a>
                </div>
            </section>
            <section class="bottom-section">
            </section>
        </div>`;
    }
    else{
        console.log("Questions Completed");
        //Redirect to final page
        console.log(`${correctlyAnswered} Correctly Answered`);
    }
}


//getting questions and options from the array
function showQuestions(index){
    const ques_no=document.getElementById("question-no");
    const ques_span=document.getElementById("question-span");
    
    const option1=document.getElementById("option-1");
    const option2=document.getElementById("option-2");
    const option3=document.getElementById("option-3");
    const option4=document.getElementById("option-4");

    let option1_tag= questions[index].options[0];
    let option2_tag= questions[index].options[1];
    let option3_tag= questions[index].options[2];
    let option4_tag= questions[index].options[3];
    
    ques_no.innerHTML= 'Question '+(index+1)+'<span>'+(index+1)+'/10</span>';
    ques_span.innerHTML= questions[index].question;
 

    option1.innerHTML= option1_tag;
    option2.innerHTML= option2_tag;
    option3.innerHTML= option3_tag;
    option4.innerHTML= option4_tag;

    removeTags();
}
function removeTags(){
    for(let i=1;i<5;i++){
        document.getElementById(`toSelect-${i}`).classList.remove("disabled");
        document.getElementById(`toSelect-${i}`).classList.remove("correct");
        document.getElementById(`toSelect-${i}`).classList.remove("wrong");
    }
    if(curr_tick_icon != 0){
        document.getElementById(`icon-${last_correct_pos}-${curr_tick_icon}`).classList.add("hide");
    }
    if(curr_cross_icon != 0){
        document.getElementById(`icon-${last_cross_pos}-${curr_cross_icon}`).classList.add("hide");
    }
    curr_tick_icon=0;
    last_correct_pos=0;
    last_cross_pos=0;
    curr_cross_icon=0;
}

function optionSelected(option_no){
    clearInterval(counter);

    let userAns,last_ans_pos=0;
    let curr_content,curr_pos;
    let correctAns = questions[curr_index].answer;
    switch (option_no) {
        case 1: curr_content= document.getElementById("option-1");
                curr_pos = document.getElementById("toSelect-1");
                last_ans_pos=1;
            break;
        case 2: curr_content= document.getElementById("option-2");
                curr_pos = document.getElementById("toSelect-2");
                last_ans_pos=2;
            break;
        case 3: curr_content= document.getElementById("option-3");
                curr_pos = document.getElementById("toSelect-3");
                last_ans_pos=3;
            break;
        case 4: curr_content= document.getElementById("option-4");
                curr_pos = document.getElementById("toSelect-4");
                last_ans_pos=4;
            break;
        default:
            break;
    }
    userAns= curr_content.textContent;
    if(userAns == correctAns){
        curr_pos.classList.add("correct");
        curr_tick_icon=1;
        last_correct_pos=last_ans_pos;
        // curr_pos.insertAdjacentHTML("beforeend",tickIcon);
        // show current pos tick mark
        document.getElementById(`icon-${option_no}-${curr_tick_icon}`).classList.remove("hide");
        correctlyAnswered++;
        console.log("Correct Answer");
    }
    else{
        console.log("Wrong Answer");
        curr_pos.classList.add("wrong");
        // curr_pos.insertAdjacentHTML("beforeend",crossIcon);
        last_cross_pos=last_ans_pos;
        curr_cross_icon=2;
        document.getElementById(`icon-${option_no}-${curr_cross_icon}`).classList.remove("hide");

        //automatically show correct answer if wrong
        for(let i=1; i<5;i++){
            let answer_check = document.getElementById(`option-${i}`).textContent;
            curr_pos = document.getElementById(`toSelect-${i}`);
            if(answer_check == correctAns){
                curr_pos.classList.add("correct");
                curr_tick_icon=1;
                last_correct_pos=i;
                document.getElementById(`icon-${i}-${curr_tick_icon}`).classList.remove("hide");
                // curr_pos.insertAdjacentHTML("beforeend",tickIcon);
            }
        }

    }
    //after selection all options are disabled
    let option = document.getElementsByClassName("option");
    for(let i=1;i<5;i++){
        document.getElementById(`toSelect-${i}`).classList.add("disabled");
    }
}

//timing functions
function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        console.log(time);
        time--;
        timeNow.innerHTML= time;
        // CountDown Stop
        if(time == 0){
            correctlyAnswered--;
            clearInterval(counter);
            //sending correct option in function
            let newObj= questions[curr_index];
            let CorrectAnwer= newObj.answer;
            let ansArray= newObj.options;
            for (let i = 0; i < 4; i++) {
                if(ansArray[i] == CorrectAnwer){
                   optionSelected(i+1);
                }
            }
            
        }
    }
}