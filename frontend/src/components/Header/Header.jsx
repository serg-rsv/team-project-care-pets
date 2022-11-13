import s from "./Header.module.scss"
import Logo from "../Logo/Logo"
import Navigation from "../Navigation";

const Header = () => { 
    return (
        <header>
            <div className={["container", s.content].join(" ")}>
                <Logo />
                <Navigation />
            </div>
        </header>
    )
};

export default Header;