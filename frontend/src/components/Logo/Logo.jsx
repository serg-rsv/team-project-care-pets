import s from "./Logo.module.scss";
import logo from "../../images/logo/logo.png"
import logo2x from "../../images/logo/logo@2x.png"

const Logo = () => {
    const logoSet = [logo, "1x", ",", logo2x, "2x"].join(" ");

    return (
        <img className={s.logo}
            srcSet={logoSet}
            src={logo}
            alt="logo" />
    )
 }

export default Logo;