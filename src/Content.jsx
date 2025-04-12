import { Outlet } from 'react-router-dom'
import Head from './JSX/Head.jsx'
import Bot from './JSX/Bot.jsx'
import Chatbox from './JSX/Chatbox.jsx'
function Content() {
    return (
        <>
            <Head/>
            <div style={{ height: '213px' }}></div>
            <Outlet></Outlet>
            <Chatbox/>
            <Bot/>
        </>
    )
}

export default Content;