import { Link } from 'react-router-dom';
import '../styles/app.css';

function Error() {
    return (
        <h1 className='title'>
            Cette page n'existe pas. 
            <Link to="/" style={{ textDecoration: 'none' }} >
                <h2 className='subtitle'>Tu peux créer une histoire qui te correspond ici !</h2>
            </Link>
        </h1>
    )
}
 
export default Error