
$(function () {
    if (getFromLocalStorage() != null) {
        createTable();

    } else {
        $.getJSON("index.json", function (data) {
            let localData = getFromLocalStorage(data)
            createTable(localData);
        });
    }

});


function getFromLocalStorage(data) {
    let get = JSON.parse(localStorage.getItem("iAmJsonFile"));
    // console.log(get);
    if (get == null) {
        console.log("Nulll");
        addToLocalStorage(data);
    }

    get = JSON.parse(localStorage.getItem("iAmJsonFile"));
    return get;

}

function addToLocalStorage(data) {
    localStorage.setItem("iAmJsonFile", JSON.stringify(data));
}



// $.getJSON("index.json", function (data) 
// {
//     let localData = getFromLocalStorage(data)
//     createTable(localData);
// });








function createTable() {
    //last
    $("#thead").html("");
    $("#tbody").html("");

    // empty it and the work

    let data = getFromLocalStorage();


    let rows = data.length;
    colName = Object.keys(data[0]);
    colLen = Object.keys(data[0]).length;

    //head
    let tr = $(`<tr></tr>`);
    for (let i = 0; i < colLen; i++) {
        let th = $(`<th></th>`);
        th.text(colName[i]);
        tr.append(th)
        // Every th element is sent into tr.
    }

    $("#thead").append(tr);

    //body
    for (let i = 0; i < rows; i++) {
        let tr = $(`<tr></tr>`);
        let colVal = Object.values(data[i]);

        for (let j = 0; j < colLen; j++) {
            let td = $(`<td></td>`)
            td.text(colVal[j])
            // each and every col value is sent one by one to each td.
            tr.append(td)
        }
        let btn = $(`<div class="btnGroup" >
        <button class="btn btn-primary delbtn">Delete</button>
        <button class="btn btn-primary updatebtn">UPDATE</button>
        </div>`);

        tr.append(btn)

        $("#tbody").append(tr);
    }
    $("#table").DataTable();

    deleteRow();
}

// On Click appear Modal for input field
$("#addbtn").click(function () {

    createInputField();

});


//create input data field
function createInputField() {
    const currDiv = $('#inputDataDiv');
    $(currDiv).html("");
    const inputForm = $(`<form></form>`);
    inputForm.attr('class', 'row g-3');

    let data = getFromLocalStorage();
    colName = Object.keys(data[0]);



    //create input field
    for (let i = 0; i < colName.length; i++) {
        if (i == 0) {
            continue;
        } else {
            const div = $('<div></div>');
            div.attr('class', 'col-md-4');

            const label = $('<label></label>');
            label.attr('for', `inputField${i}`);
            label.attr('class', 'form-label fw-bold');
            label.text(`${colName[i]}:`);


            const input = $('<input></input>');
            input.attr('class', 'form-control inputClass')
            input.attr('id', `inputField${i}`);

            div.append(label);
            div.append(input);
            inputForm.append(div)
        }
    }
    currDiv.append(inputForm);

}

// on save changes
$("#addElement").click(function () {
    let inputs = $(".inputClass");
    let inputData = [];

    for (let i = 0; i < inputs.length; i++) {
        inputData.push($(inputs[i]).val())
        // inputs[i]..sab  ka value is pushed.

    }
    let data = getFromLocalStorage();


    let lastId = data[data.length - 1]["BookId"];
    lastId++;
    // 7
    // unique element ka naam.


    let keys = Object.keys(data[0])

    const obj = {};

    // console.log(keys);
    obj["BookId"] = lastId;
    // 7 is sent into this in the first col


    for (let i = 1; i < keys.length - 1; i++) {
        obj[keys] = inputData[i];
        // obj[keys] =values.
    }

    data.push(obj);



    addToLocalStorage(data);
    // console.log(data);
    createTable();


});

function deleteRow() {

    $(".delbtn").click(function () {
        let temp = $(this).parent()[0] //div

        let tr = $(temp).parent()[0];

        tr.remove();

        let trChild = $(tr).children();

        let id = $(trChild[0]).text();
        console.log(id);

        let tempArr = getFromLocalStorage();

        let delid;
        for (let i = 0; i < tempArr.length; i++) {
            if (tempArr[i]["BookId"] == id) {

                delid = i + 1;//1th id se derahe hai.
                break; //todo remove if doesn't work
            }
        }

        tempArr.splice(delid - 1, 1);

        addToLocalStorage(tempArr);


    });
    console.log("called");
}




