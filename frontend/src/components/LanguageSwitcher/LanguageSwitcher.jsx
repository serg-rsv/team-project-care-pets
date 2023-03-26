import { useState, useEffect, useRef } from 'react';

import s from './LanguageSwitcher.module.scss';

const languages = [
  { code: 'EN', name: 'English', flag: 'gb' },
  { code: 'UA', name: 'Українська', flag: 'ua' },
];

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState(languages[0]);
  const [isListOpen, setIsListOpen] = useState(false);
  const containerRef = useRef(null);

  const handleClickOutside = event => {
    if (!containerRef?.current.contains(event.target)) {
      setIsListOpen(false);
      console.log('CLICK');
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
    setLanguage(l);
    setIsListOpen(false);
  };

  return (
    <div className={s.container} ref={containerRef}>
      <button onClick={toggleList}>{language.code}</button>
      {isListOpen && (
        <ul className={s.list}>
          {languages.map(l => (
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
