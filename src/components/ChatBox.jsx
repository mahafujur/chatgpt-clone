import { useState, useRef, useEffect, useContext } from 'react';
import Message from './Message';
import { ChatContext } from '../context/chatContext';
import Loading from './Loading.jsx';
import { replaceProfanities } from 'no-profanity';
import { davinci } from '../utils/davinci';
import { dalle } from '../utils/dalle';
import Modal from './Modal';
import OpenApiKeyInput from './OpenApiKeyInput.jsx';
import {readFromLocalStorage} from "../utils/localStorage.js";
import {LOCAL_STORAGE} from "../utils/constant.js";

const options = ['ChatGPT'];
const gptModel = ['gpt-3.5'];
const demoItems = [
  {
    title: 'Write a text',
    prompt: 'inviting my neighbors to a barbecue',
  },
  {
    title: 'how to make a cake',
    prompt: 'How to make a cake with chocolate and strawberries?',
  },
  {
    title: 'Business ideas',
    prompt: 'Generate 5 business ideas for a new startup company.',
  },
  {
    title: 'What is recursion?',
    prompt: 'What is recursion? show me an example in python.',
  },
];

const ChatBox = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const [gpt, setGpt] = useState(gptModel[0]);
  const [messages, addMessage] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateMessage = (newValue, ai = false, selected) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
      selected: `${selected}`,
    };

    addMessage(newMsg);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const key =readFromLocalStorage(LOCAL_STORAGE.API_KEY);
    if (!key) {
      setModalOpen(true);
      return;
    }

    const cleanPrompt = replaceProfanities(formValue);

    const newMsg = cleanPrompt;
    const aiModel = selected;
    const gptVersion = gpt;

    setLoading(true);
    setFormValue('');
    updateMessage(newMsg, false, aiModel);
    try {
      if (aiModel === options[0]) {
        const LLMresponse = await davinci(cleanPrompt, key, gptVersion);
        //const data = response.data.choices[0].message.content;
        LLMresponse && updateMessage(LLMresponse, true, aiModel);
      } else {
        const response = await dalle(cleanPrompt, key);
        const data = response.data.data[0].url;
        data && updateMessage(data, true, aiModel);
      }
    } catch (err) {
      window.alert(`Error: ${err} please try again later`);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // 👇 Get input value
      sendMessage(e);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <main className='relative flex flex-col h-screen py-2 overflow-hidden dark:bg-light-grey px-2'>
      <div className=' py-2 bg-white px-2 w-fit hover:bg-gray-100 rounded cursor-pointer'>
        <a
          onClick={() => setGpt(gptModel[0])}
          className={`flex `}>
         Chat GPT 3.5
        </a>
      </div>

      <section className='flex flex-col flex-grow w-full px-4 overflow-y-scroll sm:px-10 md:px-2 lg:px-32'>
        {messages?.length ? (
          messages.map((message, index) => (
            <Message key={index} message={{ ...message }} />
          ))
        ) : (
          <div className='flex my-2 mt-auto mb-8'>
            <div className='w-screen overflow-hidden '>
              <ul className='grid grid-cols-2 gap-2 mx-10'>
                {demoItems.map((item, index) => (
                  <li
                    onClick={() => setFormValue(item.prompt)}
                    key={index}
                    className='p-6 border rounded-lg border-slate-300 hover:border-slate-500'>
                    <p className='text-base font-semibold'>{item.title}</p>
                    <p className='text-sm'>{item.prompt}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {loading && <Loading />}

        <span ref={messagesEndRef}></span>
      </section>
      <form
        className='flex flex-col px-10 mb-2 md:px-32 join sm:flex-row'
        onSubmit={sendMessage}>
        <div className='flex items-stretch justify-between w-full'>
          <textarea placeholder={'Message ChatGPT'}
            ref={inputRef}
            className='w-full grow rounded-lg focus:border-[3px]  border-1 border px-2 py-1 outline-none hover:outline-none'
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setFormValue(e.target.value)}
          />
        </div>
        <br/>
      </form>
      <Modal title='OpenApiKeyInput' modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <OpenApiKeyInput modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal>
    </main>
  );
};

export default ChatBox;
