import {ChatContextProvider} from './context/chatContext';
import LeftMenu from './components/LeftMenu.jsx';
import ChatBox from './components/ChatBox.jsx';
import {useState} from 'react';
import Modal from './components/Modal';
import OpenApiKeyInput from './components/OpenApiKeyInput.jsx';

const App = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <ChatContextProvider>
            <Modal title='Api Key Modal' modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <OpenApiKeyInput modalOpen={modalOpen} setModalOpen={setModalOpen}/>
            </Modal>
            <div className='flex transition duration-500 ease-in-out'>
                <LeftMenu/>
                <ChatBox/>
            </div>
        </ChatContextProvider>
    );
};

export default App;
