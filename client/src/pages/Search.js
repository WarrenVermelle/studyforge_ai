import { ToastContainer } from 'react-toastify';
import Search from '../components/Search';
import 'react-toastify/dist/ReactToastify.css';

function SearchPage() {

    return (
        <>
            <ToastContainer />
            <Search />
        </>
    );
}

export default SearchPage;
