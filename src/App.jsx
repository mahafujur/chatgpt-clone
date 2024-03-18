import {ChatContextProvider} from './context/chatContext';
import LeftMenu from './components/LeftMenu.jsx';
import ChatBox from './components/ChatBox.jsx';


const App = () => {

    return (
        <ChatContextProvider>
            <div className='flex transition duration-500 ease-in-out'>
                <LeftMenu/>
                <ChatBox/>
            </div>
        </ChatContextProvider>
    );
};

export default App;
