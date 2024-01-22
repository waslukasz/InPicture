import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="flex bg-slate-500 justify-center">
            <Link to='/'><img src={logo} alt="InPicture logo" /></Link>
        </div>
    );
}