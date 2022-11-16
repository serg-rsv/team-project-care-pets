import s from "./Nav.module.scss";


// Заглушки <a>. Нужно будет поменять на NavLink
const Nav = () => {
    return (
        <nav>
            <ul className={s.navList}>
                <li className={s.navList__item}><a href="#">News</a></li>
                <li className={s.navList__item}><a href="#">Find pet</a></li>
                <li className={s.navList__item}><a href="#">Our friend</a></li>
            </ul>
        </nav>
    )
}

export default Nav;