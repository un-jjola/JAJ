const main = document.querySelector("#main"); //const: 변수 기호(상수로써 하나만 선언 가능) //querySelector -> 선택자 하나만 가져와서 변수에 저장
const qna = document.querySelector("#qna"); //querySelector: 문서에서 css 선택자 선택해주는 기능
const result = document.querySelector("#result");

const endPoint = 19; //총 질문 개수

// 사용자가 각 문제마다 어떤 번호를 선택했는지 정하는 배열. 19문제 ->19개의 배열
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
//각 역할별로 점수가 몇점인지 저장하는 배열
const answer=[0, 0, 0, 0, 0, 0, 0, 0];

//연산 함수
function calResult(){ 
  //console.log(select);
  //var result = select.indexOf(Math.max(...select)); //indexOf: index 값 반환, Math.max함수로 인하여 소괄호 안의 값 최대값으로 반환 ...selext: 전개구문(선택한 것 펼치게 해줌)
  //return result;

  for(let i=0;i<endPoint;i++) //질문 개수
  {

      for(let k=0;k<8;k++)
      {
        if(select[i]==0){ //매우 그렇다
            answer[k]=answer[k]+qnaList[i].a[select[i]].type[k]*2;
        }
        else if(select[i]==1){ //그렇다
          answer[k]=answer[k]+qnaList[i].a[select[i]].type[k]*1;
        }
        else if(select[i]==2){ //보통이다
          answer[k]=answer[k]+qnaList[i].a[select[i]].type[k]*0;
        }
        else if(select[i]==3){ //아니다
          answer[k]=answer[k]+qnaList[i].a[select[i]].type[k]*-1;
        }
        else if(select[i]==4){ //매우아니다
          answer[k]=answer[k]+qnaList[i].a[select[i]].type[k]*-2;
        }
      }
    
  }
  console.log(answer);
}

//1등 인덱스 계산, 반환해주는 함수
function calResultIdx1(){
  let Idx1=0;
  for(let i=0;i<8;i++){
      if(answer[i]>answer[Idx1]){
        Idx1=i;
      }
  }
  //console.log(Idx1);
  return Idx1;
  
}

//2등 인덱스 계산 , 반환해주는 함수
function calResultIdx2(){
  Idx1=calResultIdx1();
  let Idx2=0;
  if(Idx1==0) Idx2=1;

  for(let i=0;i<8;i++){
    if(answer[i]>answer[Idx1]){ //largest보다 크다면
      Idx2=Idx1;
      Idx1=i;
    }
    else if(answer[i]>answer[Idx2]&&answer[i]<answer[Idx1]){
      Idx2=i;
    }
  }
  return Idx2;
}

function calResultIdx3(){
  Idx1=calResultIdx1();
  Idx2=calResultIdx2();
  let Idx3=0;
  if(Idx1==0||Idx2==0) Idx3=1;
  if(Idx1==1||Idx2==1) Idx3=2;

  for(let i=0;i<8;i++){
    if(answer[i]>answer[Idx1]){ //largest보다 크다면
      Idx3=Idx2;
      Idx2=Idx1;
      Idx1=i;
    }
    else if(answer[i]>answer[Idx2]&&answer[i]<answer[Idx1]){
      Idx3=Idx2;
      Idx2=i;
    }
    else if(answer[i]>answer[Idx3]&&answer[i]<answer[Idx2]&&answer[i]<answer[Idx1])
      Idx3=i;
  }
  return Idx3;
}

//최종 결과 보여주는 함수
function showResult(){
  Idx1=calResultIdx1();
  Idx2=calResultIdx2();
  Idx3=calResultIdx3();
  setResult1();
  setResult2();
  setResult3();

  console.log((infoList[Idx1]));
  console.log("idx1",Idx1);
  console.log("idx2",Idx2);
  console.log("idx3",Idx3);
  console.log(infoList[0].desc[0]);
  //console.log((infoList[Idx2]));

}


function setResult1(){
  let point1 = calResultIdx1(); //point: 가장 많이 선택한 index 담김
  const resultName = document.querySelector('.resultname1');
  resultName.innerHTML = infoList[point1].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/img_' + point1 + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point1; // 공유페이지
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc'); // 설명 부분
  resultDesc.innerHTML = infoList[point1].desc;
 // resultDesc.innerHTML = infoList[point1].desc[0];
}

function setResult2(){
  let point2 = calResultIdx2(); //point: 2번째 많이 선택한 index 담김
  const resultName = document.querySelector('.resultname2');
  resultName.innerHTML = infoList[point2].name;

  var resultImg2 = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg2');
  var imgURL = 'img/img_' + point2 + '.png';
  resultImg2.src = imgURL;
  resultImg2.alt = point2; // 공유페이지
  resultImg2.classList.add('img-fluid');
  imgDiv.appendChild(resultImg2);
}

function setResult3(){
  let point3 = calResultIdx3(); //point: 3번째 많이 선택한 index 담김
  const resultName = document.querySelector('.resultname3');
  resultName.innerHTML = infoList[point3].name;

  var resultImg3 = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg3');
  var imgURL = 'img/img_' + point3 + '.png';
  resultImg3.src = imgURL;
  resultImg3.alt = point3; // 공유페이지
  resultImg3.classList.add('img-fluid');
  imgDiv.appendChild(resultImg3);

 // for(let i=0;i<3;i++) resultDesc.innerHTML += infoList[point3].desc[i];
 //for(let i=0;i<3;i++) resultDesc.add(infoList[point3].desc[i]);
}


function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450)})
  
  
  //console.log(answer);
    //setResult();
}


//qna에 해당하는 answer 버튼. qIdx:질문 인덱스 , idx:해당질문의 답 인덱스
function addAnswer(answerText, qIdx, idx){ 
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button'); //document.createElement(): 지정한tagname의 HTML요소(button)를 만들어 반환
  answer.classList.add('answerList'); //선택 버튼 5개 모두 선택
  answer.classList.add('my-3'); //버튼 간격
  answer.classList.add('py-3'); //버튼 간격
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn'); //버튼 애니메이션

  a.appendChild(answer); //a에 answer의 속성을 넣어준다.
  answer.innerHTML = answerText; //a의 값 각 버튼에 넣어줌 

  answer.addEventListener("click", function(){ //사용자 버튼 선택 함수, addEventListener(): 지정한 이벤트가 대상에 전달될 때마다 호출할 함수
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true; //버튼 비활성화
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s"; //버튼 애니메이션
    }
    setTimeout(() => {
      
      select[qIdx]=idx;  //몇번 째 질문에서 몇번 째 답을 선택했는지 select배열에 저장
      
      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none'; //한 버튼 클릭시 다른 버튼 무시, 모든 버튼 사라짐
      }
      goNext(++qIdx); // 다음 질문으로 넘어가기
    },450)
  }, false);
}


// 다음 질문 출력하는 함수
function goNext(qIdx){ 
  if(qIdx === endPoint){
    goResult();
    calResult();
    //calResultIndex();
    showResult();
    return;
  }
  
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q; // qIdx라는 변수를 통해 qna 리스트에 q를 불러온다.
  for(let i in qnaList[qIdx].a){ //a: 배열, 총 5번 반복
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);  //addAnswer함수 실행 해 질문에 따른 answer 보여주기
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%'; //질문 진행될 때 마다 진행 바 채우기
}


//검사 쫄? 버튼을 누르면 main 사라지고 qna 등장 setTimeout: 타이머가 만료된 뒤 함수나 지정된 코드를 실행하는 타이머 설정
function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450)
    let qIdx = 0;
    // begin함수가 끝나는 시점에 goNext함수를 실행시킨다.
    goNext(qIdx);  
  }, 450);
}

//모든 결과 확인 쫄? 버튼을 누르면 result 사라지고 resultAll 등장 js
function resultAllbutton(){
  result.style.WebkitAnimation = "fadeOut 1s";
  result.style.animation = "fadeOut 1s";
  setTimeout(() => {
    All.style.WebkitAnimation = "fadeIn 1s";
    All.style.animation = "fadeIn 1s";
    setTimeout(() => {
      result.style.display = "none";
      All.style.display = "block";
    }, 450)
  }, 450); 
}