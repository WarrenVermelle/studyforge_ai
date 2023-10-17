if ('speechSynthesis' in window) {
    const playButton = document.getElementById('playButton');
    const textArea = document.getElementById('textArea');

    playButton.addEventListener('click', () => {
        const text = textArea.textContent;
        const synth = new SpeechSynthesisUtterance();
        
        synth.lang = 'fr-FR';
        synth.text = text;

        speechSynthesis.speak(synth);
    });
} else {
    console.error('L\'API Web Speech n\'est pas prise en charge dans ce navigateur.');
}
