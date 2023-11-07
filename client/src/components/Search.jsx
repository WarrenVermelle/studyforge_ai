import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SyncLoader from 'react-spinners/SyncLoader';
import Stories from './Stories';
import '../styles/search.css';
import 'react-toastify/dist/ReactToastify.css';
import searchIcon from '../assets/icons/search-icon.svg';

function Search() {

    const inputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [story, setStory] = useState({success: '', user_prompt:'', message: ''});

    const handleSubmit = async (event) => {

        event.preventDefault();
        
        if (inputRef.current.value) {
            setLoading(true);
            try {
                const response = await fetch(window.location.origin + '/ask', {
                    method: 'POST',
                    mode: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'user_prompt': inputRef.current.value
                    }),
                });
                const data = await response.json();
                if ('status' in data && data.status === 429) {
                    toast.warning('Trop de requêtes ! Veuillez attendre 1 minute.');
                } else {
                    setStory(data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

    }

    return(
        <>
            <form onSubmit={handleSubmit} action='' method='post' className='form-search' autoComplete='off'>
                <fieldset>
                    <legend>Votre compagnon d'écriture alimenté par l'IA</legend>
                    <div className='inner-form'>
                        <div className='input-field'>
                            <input className='form-control' id='choices-text-preset-values' 
                                type='text' name='keywords' placeholder="Entre tes idées d'histoire..."
                                autoComplete='false' ref={inputRef} />
                            <button className='btn-search'>
                                <img src={searchIcon} alt='Bouton rechercher' title='Lancer la recherche' />
                            </button>
                        </div>
                    </div>
                    <div className='waiting-container'>
                        <SyncLoader
                            color='white'
                            size={15}
                            loading={loading}
                            aria-label='Loading Spinner'
                            data-testid='loader'
                        />
                    </div>
                </fieldset>
            </form>
            <Stories story={story}/>
        </>
    )
}

export default Search;