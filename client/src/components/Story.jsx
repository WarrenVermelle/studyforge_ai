import { toast } from 'react-toastify';
import '../styles/story.css';
import 'react-toastify/dist/ReactToastify.css';
import speechIcon from '../assets/icons/speech-icon.png';
import shareIcon from '../assets/icons/share-icon.png';

function Story({user_prompt, content, share}) {

    function playSpeech() {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(content));
    }

    async function shareLink() {
        
        try {
            const response = await fetch(window.location.origin + '/save', {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'story': {
                        'user_prompt': user_prompt,
                        'content': content
                    }
                }),
            });
            const data = await response.json();

            navigator.clipboard.writeText(window.location.origin + '/story/' + data.story_id).then(() => {
                toast.info('Lien copié dans le presse-papier.')
            });
        } catch (error) {
            console.log(error.message);
        }

    }

    return(
        <div className='story' >
            <div className='story-head'>
                <div className='prompt'>{user_prompt}</div>
                <div className='icons'>
                    <img className='speech-icon' src={speechIcon} alt='Bouton lecture' title='Lire le message' 
                        onClick={playSpeech} />

                    { share
                        ? <img className='share-icon' src={shareIcon} alt='Bouton partage' title='Partager le lien' 
                            onClick={shareLink} />
                        : null
                    }
                    
                </div>
            </div>
            <div className='story-body'>
                {content}
            </div> 
        </div>
    )
}

export default Story;