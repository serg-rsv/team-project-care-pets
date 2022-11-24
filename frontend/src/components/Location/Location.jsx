import { useState } from 'react';
import Select from 'react-select';
import styles from './Location.module.scss';
import regions from '../../assets/Ukraine-UA/allStates.lite.json';
import { useEffect } from 'react';

const Location = ({ setLocationInfo, isLocation }) => {
  const [isRegionChosen, setIsRegionChosen] = useState(false);
  const [region, setRegion] = useState('');
  const [cities, setCities] = useState('');

  const options = data => {
    return data?.map(location => ({
      value: `${JSON.stringify(location)}`,
      label: location.name,
    }));
  };

  const onRegionClick = e => {
    const citiesDB = require(`../../assets/Ukraine-UA/${
      JSON.parse(e.value).isoCode
    }/allCities.geo.json`);

    setCities(citiesDB);
    setRegion(e.label);
    setIsRegionChosen(true);
  };

  const onCityClick = e => {
    const location = JSON.parse(e.value);
    setIsRegionChosen(false);
    const locationForFormik = location.name + ', ' + region;
    setLocationInfo(locationForFormik);
  };

  const controlStyles = () => ({
    paddingLeft: '5px',
    display: 'flex',
    color: 'fieldtext',
    borderRadius: 'inherit',
    borderColor: 'var(--accent-cl)',
    height: '100%',
    backgroundColor: 'var(--main-bg-cl)',
  });

  const themeFixer = theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: 'var(--accent-cl)',
      primary: 'var(--accent-cl-active)',
    },
  });

  return (
    <div className={styles.locationWrapper}>
      <Select
        options={options(regions)}
        onChange={onRegionClick}
        styles={{
          control: controlStyles,
          dropdownIndicator: dropdownIndicator => ({
            ...dropdownIndicator,
            color: 'var(--accent-cl)',
          }),
        }}
        className={styles.addPetFormInput}
        theme={theme => themeFixer(theme)}
      />
      {isRegionChosen ? (
        <Select
          options={options(cities)}
          onChange={onCityClick}
          styles={{
            control: controlStyles,
            dropdownIndicator: dropdownIndicator => ({
              ...dropdownIndicator,
              color: 'var(--accent-cl)',
            }),
          }}
          className={styles.addPetFormInput}
          theme={theme => themeFixer(theme)}
        />
      ) : (
        <p>{isLocation ? isLocation : ''}</p>
      )}
    </div>
  );
};

export default Location;
