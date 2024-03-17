import { useEffect, useState } from 'react';
import { checkApiKey } from '../utils/checkKeys';

import PropTypes from 'prop-types';
import {readFromLocalStorage, removeFromLocalStorage, writeToLocalStorage} from "../utils/localStorage.js";
import {LOCAL_STORAGE} from "../utils/constant.js";

const OpenApiKeyInput = ({ modalOpen, setModalOpen }) => {
  const apiKey = readFromLocalStorage(LOCAL_STORAGE.API_KEY) || '';
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [input, setInput] = useState('');

  const saveKey = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const keys = input;

    await checkApiKey(keys)
      .then(() => {
       writeToLocalStorage(LOCAL_STORAGE.API_KEY, keys);
        setModalOpen(false);
      })
      .catch(() => {
        setErrorMsg('error: incorrect keys');
      });

    setLoading(false);
  };

  const removeApiKey = () => {
   removeFromLocalStorage(LOCAL_STORAGE.API_KEY)
      setInput('');
  };

  useEffect(() => {
    if (modalOpen) {
      setInput(apiKey);
    }
  }, [apiKey, modalOpen]);

  return (
    <form
      onSubmit={saveKey}
      className='flex flex-col items-center justify-center gap-2'>
      <p className='text-lg font-semibold'>Use your own API-key.</p>
      <p className='italic'>
        Get OpenAI API key{' '}
        <a
          className='text-blue-600'
          rel='noreferrer'
          target='_blank'
          href='https://platform.openai.com/account/api-keys'>
          here
        </a>
        .
      </p>
        <br/>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type='password'
        className='w-full max-w-xs input input-bordered'
      />
      <button disabled={loading} className='w-full max-w-xs btn btn-outline'>
        {loading ? (
          <>
            <span className='loading loading-spinner' />
            <p>Checking Api Key</p>
          </>
        ) : (
          'save to localStorage'
        )}
      </button>
      {apiKey && input && (
        <span
          onClick={removeApiKey}
          disabled={loading}
          className='w-full max-w-xs btn btn-error'>
          remove keys
        </span>
      )}
      <p>{errorMsg}</p>
    </form>
  );
};

export default OpenApiKeyInput;

OpenApiKeyInput.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};
