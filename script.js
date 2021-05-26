let listInput = document.querySelector("input")
let sumbit = document.querySelector(".submit")
let lists = document.querySelector("ul")

// 저장소 이름
const list_LS = "listSave"
//저장소 value
let listSave = [];
let idNumbers = 1;


// 1. input에서 얻어온 값을 list에 올려주는 함수로 보낸다
function onAdd(){
    const currentValue = listInput.value;
    if(currentValue === ""){
        listInput.focus();
        return;
    }
    createItem(currentValue);
    listInput.value = "";
    listInput.focus();
}

// 2. list 입력
function createItem(text){
    //list에 추가
    const list = document.createElement("li");
    list.setAttribute("class", "item__row")
    list.setAttribute('data-id', idNumbers);
    list.innerHTML = `
        <span>${text}</span>
        <button class="trash">
            <i class="fas fa-trash-alt" data-id=${idNumbers}></i>
        </button>
    `;
    //화면에 보이게
    const item = lists.appendChild(list);
    item.scrollIntoView({block: "center"});

    // data에 추가(local storage가기 전 밑작업)
    const listObj = {
        text: text,
        id: idNumbers
    };
    listSave.push(listObj);
    saveData();
    idNumbers++;

    return list;
}

// 3. local storage 추가
function saveData(){    
    localStorage.setItem(list_LS, JSON.stringify(listSave))
}


// 4. list 제거
function deleteItem(event){
    const id = event.target.dataset.id;
        if(id){
            deleteData(id);
            const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
            toBeDeleted.remove();
        }
}

// 5. local storage에서 삭제
function deleteData(id){
    const cleanList = listSave.filter(function(item){
        return item.id !== parseInt(id);
        //item.id = number
        //li.id = string -> parseInt 사용(숫자로 반환)
    });
    listSave = cleanList;
    saveData();
}

// 6. local storage에 저장된 내용 불러오기
function loadLists(){
    const loadedLists = localStorage.getItem(list_LS);
    if(loadedLists !== null){
        const parsedLists = JSON.parse(loadedLists);
        parsedLists.forEach(list => {
            createItem(list.text)
        });
    }
}



function init(){
    loadLists();
    sumbit.addEventListener("click", onAdd);

    listInput.addEventListener("keypress", (event) => {
        if(event.key === "Enter"){
            onAdd();
        }
    });

    lists.addEventListener("click", deleteItem)
}

init();