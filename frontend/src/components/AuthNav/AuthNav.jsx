import s from "./AuthNav.module.scss";
import Button from "../button/button"

const AuthNav = () => {
    return (<div className={s.authNav}>
        <ul className={s.authNav__list}>
            <li className={s.authNav__item}><Button className={s.authBtn}>Login</Button></li>
            <li className={s.authNav__item}><Button className={s.authBtn}>Registration</Button></li>
        </ul>
    </div>)
}

export default AuthNav;