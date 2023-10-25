import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Story from '../components/Story';
import Error from '../pages/Error';
import '../styles/app.css';

function StoryPage () {

    const { id } = useParams();
    const [story, setStory] = useState({});

    async function getStory() {
        const response = await fetch('http://localhost:8080/story', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': id
            }),
        });
        const data = await response.json();
        setStory(data);
    }

    function ShowStory({story}) {
        if (story.success) {
            return (
                <>
                    <h1 className='title'>
                        Cette histoire te plait ? 
                        <Link to="/" style={{ textDecoration: 'none' }} >
                            <h2 className='subtitle'>À toi de créer la tienne, ici !</h2>
                        </Link>
                    </h1>
                    <Story 
                        user_prompt={story.user_prompt}
                        content={story.content} 
                    />
                </>
            )
        }
        return <Error />
    }

    useEffect(() => {
        getStory();
    }, []);

    return (
        <ShowStory story={story} />
    )
}

export default StoryPage;