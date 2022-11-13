import s from "./Navigation.module.scss";
import Nav from "../Nav";
import UserNav from "../UserNav";
import AuthNav from "../AuthNav";
import Button from "../button/button";
import { useState } from "react";

const Navigation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isAuthorized = true; // Це буде у редакс-сторі. Витягуємо через селектор
    
    const onBurgerClick = (e) => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <div className={s.navigation}>
            <Button className={s.burgerBtn} onClick={onBurgerClick}><svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20H30V16.6667H0V20ZM0 11.6667H30V8.33333H0V11.6667ZM0 0V3.33333H30V0H0Z" fill="#212121"/>
            </svg></Button>

            <div className={s.mobMenu}>
                {isModalOpen &&
                    <>
                        {isAuthorized
                            ?
                            <UserNav />
                            :
                            <AuthNav />
                        }
                            <Nav />
                    </>
                }
            </div>

            <div className={s.tabMenu}>
    
                {isModalOpen
                    ?
                    <Nav />
                    :
                    <>                    
                        {isAuthorized
                            ?
                            <UserNav />
                            :
                            <AuthNav />
                        } 
                    </>
                }
            </div>

            <div className={s.deskMenu}>
                <Nav />
                {isAuthorized
                    ?
                    <UserNav />
                    :
                    <AuthNav />
                }
                
            </div>
        </div>
    )
}

export default Navigation;