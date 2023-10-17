const form = document.getElementsByClassName("form-search");
const button = document.getElementsByClassName("btn-search");

button[0].addEventListener("click", async function(){
    const element = document.getElementById("choices-text-preset-values");

    const response = await fetch("https://127.0.0.1:3000/ask", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(element.value),
    });

    console.log(response);
});