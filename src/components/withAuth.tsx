import Utils from '../utils';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
interface Props {
    children: JSX.Element 
}
const WithAuth = (props: Props) => {
    const navigate = useNavigate()
    const token = Utils.getToken()
    
    useEffect(() => {
        if(!token) navigate('/login')
    }, [token, navigate])

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        Utils.deleteToken()
        navigate('/login')
    }
    return (
        <div className="container">
            <div className="flex justify-between mb-4">
            <h3>My Bots Management</h3>
            <button className="transparent" onClick={handleLogout}>Logout</button>
            </div>
            {props.children}
        </div>
    )
}
export default WithAuth;
