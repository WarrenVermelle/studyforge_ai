const form = document.getElementsByClassName("form-search");
const button = document.getElementsByClassName("btn-search");

button[0].addEventListener("click", function(){
    const element = document.getElementById("choices-text-preset-values");

    fetch("http://127.0.0.1:3000/ask", {
        method: "POST",
        mode: "cors",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "keywords": element.value
        }),
    })
    .then((response) => response.json())
    .then(function(data) {
        console.log(data);
    });
    
});