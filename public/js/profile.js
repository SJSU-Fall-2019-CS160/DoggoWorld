let user = 'user1';
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

    fetch(`/profile/${user}/profilepic`)
        .then(res => {
            console.log('got image...');
            return res.blob();
        })
        .then(blob => {
            
            let img = document.getElementById("profilepic");
            img.src = URL.createObjectURL(blob);
        })
})();

document.getElementById("submitbtn").addEventListener("click", (ev) => {
    console.log('entered upload...');
    ev.preventDefault();
    let input = document.getElementById("uploadimg");
    let file = input.files[0];
    fetch(`/profile/${user}/profilepic`, {
        method: "POST",
        body: file  
    })
        .then(res => res.json())
        .then(() => {
            console.log("finished uploading...");
        })
    
});




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