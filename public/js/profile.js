
// self invoking function as soon as page loads
(function () {
    fetch("/data/1")
        .then(res => {
            return res.text();
        })
        .then(text => {
            console.log("accessed database");
            let data = document.getElementById("data");
            let p = document.createElement("p");
            data.appendChild(p).append(text);
            console.log("got data");
        });
}

)();

function changeBio(){
    var a = document.getElementById("firstname")
}
function getFirst(){
    return "Alex"
}
function edit(){
    var a = document.getElementById("firstname").value
    window.alert(a)
    //getElementById("firstname").value = "hello"
}