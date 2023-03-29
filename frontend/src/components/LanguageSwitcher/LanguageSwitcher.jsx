import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLanguage } from '../../redux/selectors';
import { setLanguage } from '../../redux/languageSlice';
import s from './LanguageSwitcher.module.scss';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'uk', name: 'Українська', flag: 'ua' },
];

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);
  const [language, setSwitcherLanguage] = useState(
    LANGUAGES.find(l => l.code === currentLanguage)
  );
  const [isListOpen, setIsListOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setSwitcherLanguage(LANGUAGES.find(l => l.code === currentLanguage));
  }, [currentLanguage]);

  const handleClickOutside = event => {
    if (!containerRef?.current.contains(event.target)) {
      setIsListOpen(false);
    }
  };

  useEffect(() => {
    isListOpen
      ? document.addEventListener('click', handleClickOutside)
      : document.removeEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isListOpen]);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleLanguageSelect = l => {
    setSwitcherLanguage(l);
    dispatch(setLanguage(l.code));
    setIsListOpen(false);
  };

  return (
    <div className={s.container} ref={containerRef}>
      <button onClick={toggleList}>
        {language?.code?.toLocaleUpperCase()}
      </button>
      {isListOpen && (
        <ul className={s.list}>
          {LANGUAGES.map(l => (
            <li
              key={l.code}
              className={l.code === language.code ? s.selected : ''}
              onClick={() => handleLanguageSelect(l)}
            >
              <img
                src={`https://flagicons.lipis.dev/flags/4x3/${l.flag}.svg`}
                alt=""
                width="24"
              />
              <p>{l.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
