const container = document.getElementsByTagName("fieldset");
const button = document.getElementsByClassName("btn-search");

button[0].addEventListener("click", function(){
    const choices = document.getElementById("choices-text-preset-values");

    if (choices.value !== "") {
        const waiting = document.getElementsByClassName("lds-ellipsis");
        waiting[0].style.display = "inline-block";
        fetch("http://127.0.0.1:3000/ask", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "keywords": choices.value
            }),
        })
        .then((response) => response.json())
        .then(function(data) {
            if(data.success && data.message) {
    
                choices_list = choices.value.split(",");
    
                // create response container
                const completion_container = document.createElement("div");
                completion_container.className = "completion";

                const completion = document.getElementsByClassName("completion");
                if(completion.length > 0) {
                    container[0].insertBefore(completion_container, completion[0]);
                } else {
                    container[0].appendChild(completion_container);
                }

                // create keyword list element
                const keywords_list = document.createElement("div");
                keywords_list.className = "completion_list"
                completion_container.appendChild(keywords_list);
    
                // create each keyword element
                choices_list.forEach(keyword => {
                    const keyword_element = document.createElement("div");
                    keyword_element.className = "completion_item"
                    keyword_element.innerHTML = keyword
                    keywords_list.appendChild(keyword_element);
                });

                const icons_container = document.createElement("div");
                icons_container.className = "icons-container";

                // speech button
                const speech_icon = document.createElement("img");
                speech_icon.src = "./assets/img/speech_icon.png";
                speech_icon.className = "speech-icon";

                icons_container.appendChild(speech_icon);
                keywords_list.appendChild(icons_container);

                // share button
                const share_icon = document.createElement("img");
                share_icon.src = "./assets/img/share_icon.png";
                share_icon.className = "share-icon";
                
                icons_container.appendChild(share_icon);
                keywords_list.appendChild(icons_container);
    
                // create message element
                const message_element = document.createElement("div");
                message_element.className = "completion-message";
                message_element.innerHTML = data.message;
                completion_container.appendChild(message_element);

                waiting[0].style.display = "none";
            }
        });
    }
});

document.addEventListener('click', function(element) {
    if (element.target.className === 'speech-icon') {
        const message = element.target.parentNode.parentNode.parentNode.lastElementChild.textContent;
        let text = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(text);
    }
});