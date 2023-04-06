import React from 'react';
import styles from './Search.module.scss';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

const Search = () => {
	const { setSearchValue } = React.useContext(SearchContext);
	const [value, setValue] = React.useState('');
	const inputRef = React.useRef();
	const onRemove = () => {
		setSearchValue('');
		setValue('');
		inputRef.current.focus();
	};
	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	}
	const updateSearchValue = React.useCallback(
		debounce((str) => {
			setSearchValue(str);
		}, 350),
		[],
	);

	return (
		<div className={styles.root}>
			<svg className={styles.icon} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
			<input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder="Поиск пиццы..." />
			{value && <svg onClick={() => onRemove()} className={styles.clear} data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg"><title /><path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" /></svg>}
		</div>
	)
}

export default Search;
