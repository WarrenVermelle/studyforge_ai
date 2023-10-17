const form = document.getElementsByClassName("form-search");
const button = document.getElementsByClassName("btn-search");

button[0].addEventListener("click", function(){
    const element = document.getElementById("choices-text-preset-values");
    console.log(element.value);
});