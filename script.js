let listInput = document.querySelector("input")
let sumbit = document.querySelector(".submit")
let lists = document.querySelector("ul")


// 저장소
// 저장소 이름
const list_LS = "listSave"
//저장소 value
let listSave = [];
let idNumbers = 1;


// 1. input에서 얻어온 값을 list에 올려주는 함수로 보낸다
function onAdd(event){
    //event.preventDefault();
    const currentValue = listInput.value;
    if(currentValue === ""){
        listInput.focus();
        return;
    }
    listUp(currentValue);
    listInput.value = "";
    listInput.focus();
    
}

// 2. list에다 input 내역을 보아게 한다.
// li는 안에 text와 버튼으로 구성되어있다
function listUp(text){
    // 2. li 입력 - text 입력될 때마다 라인 업데이트해줘야되서 지역변수로 둠
    const list = document.createElement("li");

    //2-1. 내용 들어가는 구간
    const span = document.createElement("span");
    span.innerText = text;

    list.append(span);
    lists.append(list);

    // 새로 추가된 아이템으로 스크롤링
    list.scrollIntoView({block: "center"});



    // 저장소에서 구분할 수 있게 id지정
    const newId = idNumbers;
    idNumbers += 1;
    list.id = newId;
    // 내용을 저장소로 쓸 array에 넣어주기
    const listObj = {
        text: text,
        id: newId
    };
    listSave.push(listObj);
    // 내용 안날라가게 업데이트 한 array를 local storage에 저장시키기
    saveLists();



    //2-2. delete버튼 생성
    const delBtn = document.createElement("button");
    delBtn.setAttribute('class', 'trash');
    delBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`
    list.append(delBtn);


    // 아이콘은 변하지 않으니까 innerHTML로 처리
    //const delIcon = document.createElement("i");
    //delIcon.setAttribute('class', 'fas fa-trash-alt');
    //delBtn.append(delIcon);
    

    //지우는 함수 발동
    delBtn.addEventListener("click", deleteItem);
}


// 3. 내용 안날라가게 업데이트 한 array를 local storage에 저장시키기
function saveLists(){
    localStorage.setItem(list_LS, JSON.stringify(listSave))
}

// 3-1. LS에 저장된 데이터를 화면에 보이게 할 함수
function loadLists(){
    //이미 저장된 리스트
    const loadedLists = localStorage.getItem(list_LS);
    // list가 비어있지 않다면 string인 array를 다시 풀어서 활용할 수 있게 하기
    if(loadedLists !== null){
        const parsedLists = JSON.parse(loadedLists);
        //array로 들어온 것을 각각 list에 showup하기
        parsedLists.forEach(list => {
            listUp(list.text)
        });
    }
}

// 4. 지우는 함수
function deleteItem(event){
    // ls 내부 데이터 삭제과정
    
    // ls reference - 버튼 찾기
    const removeBtn = event.target.parentNode;
    // ls reference - 버튼 부모 찾기
    const li = removeBtn.parentNode;
    // 현재 lists 내 li 지우기
    lists.removeChild(li);

    // localstroage에서 지우기
    const cleanList = listSave.filter(function(item){
        // 방금 막 지운 li의 id가 아닌 놈들만 ls에서 추출해내기
        return item.id !== parseInt(li.id);
    })
    listSave = cleanList;
    saveLists();
}





function init(){
    loadLists();
    sumbit.addEventListener("click", onAdd);
    listInput.addEventListener("keypress", (event) => {
        if(event.key === "Enter"){
            onAdd();
        }
    });
}

init();