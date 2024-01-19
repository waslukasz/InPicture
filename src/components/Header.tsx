import logo from '../assets/logo.png'

export default function Header() {
    return (
        <div className="flex bg-slate-500 justify-center">
            <img src={logo} alt="InPicture logo" />
        </div>
    );
}