import React, {useRef, useState, forwardRef, useImperativeHandle, useCallback, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import {ArticlesListContext} from '../../contexts/ArticlesList.context';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as S from './SearchInput.module.scss';
import useTheme from '@material-ui/core/styles/useTheme';

const SearchInput = forwardRef(
  ({cancelOnEscape, disabled, onCancelSearch, onRequestSearch, onChange, placeholder, onKeyUp}, ref) => {
    const inputRef = useRef();
    const {query} = useContext(ArticlesListContext);
    const [value, setValue] = useState('');
    const theme = useTheme();

    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
      if (query) {
        setValue(query);
      }
    }, [query]);

    const handleInput = useCallback(
      (e) => {
        setValue(e.target.value);
        if (onChange) {
          onChange(e.target.value);
        }
      },
      [onChange],
    );

    const handleCancel = useCallback(() => {
      setValue('');
      if (onCancelSearch) {
        onCancelSearch();
      }
    }, [onCancelSearch]);

    const handleRequestSearch = useCallback(() => {
      if (onRequestSearch) {
        onRequestSearch(value);
      }
    }, [onRequestSearch, value]);

    const handleKeyUp = useCallback(
      (e) => {
        if (e.charCode === 13 || e.key === 'Enter') {
          handleRequestSearch();
        } else if (cancelOnEscape && (e.charCode === 27 || e.key === 'Escape')) {
          handleCancel();
        }
        if (onKeyUp) {
          onKeyUp(e);
        }
      },
      [handleRequestSearch, cancelOnEscape, handleCancel, onKeyUp],
    );

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
      blur: () => {
        inputRef.current.blur();
      },
    }));

    return (
      <Paper className={`${S.root} ${isSmDown && S.mobileRoot}`}>
        <div className={S.searchContainer}>
          <Input
            placeholder={placeholder}
            inputRef={inputRef}
            value={value}
            onInput={handleInput}
            onKeyUp={handleKeyUp}
            fullWidth
            className={S.input}
            disableUnderline
            disabled={disabled}
          />
        </div>
        <IconButton
          onClick={handleRequestSearch}
          className={`${S.iconButton} ${S.searchIconButton} ${value !== '' && S.iconButtonHidden}`}
          disabled={disabled}>
          <SearchIcon className={S.icon} />
        </IconButton>
        <IconButton
          onClick={handleCancel}
          className={`${S.iconButton} ${value === '' && S.iconButtonHidden}`}
          disabled={disabled}>
          <ClearIcon className={S.icon} />
        </IconButton>
        <Divider orientation='vertical' />
        <Button
          color={'primary'}
          variant={'text'}
          className={S.searchButton}
          size={'small'}
          onClick={handleRequestSearch}>
          Search
        </Button>
      </Paper>
    );
  },
);

SearchInput.defaultProps = {
  disabled: false,
  placeholder: 'Search',
  value: '',
};

SearchInput.propTypes = {
  cancelOnEscape: PropTypes.bool,
  disabled: PropTypes.bool,
  onCancelSearch: PropTypes.func,
  onChange: PropTypes.func,
  onRequestSearch: PropTypes.func,
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func,
};

SearchInput.displayName = 'SearchInput';
export default SearchInput;
