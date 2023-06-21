import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import Utils from "../utils"
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [users, setUsers] = useState([])
    
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!username || !password) {
           return setError('Invalid username or password.')
        }   

        const users = Utils.getUsers();
        //temp user
        const user = users.find(user => user.username === username && user.password === password)
        console.log(user)
        if(user) {
            Utils.setToken(user.id)
        } else {
            //register
            const userId = Utils.addUser(username, password, users)
            Utils.setToken(userId)
        }
        navigate('/', { replace: true})

    }

    return (
        <div id="login">
            <form action="" onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">My Bots Management Login</h3>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        onChange={(e) => setUsername(e.target.value) }
                        value={username}
                        />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value) }
                        value={password}
                        />
                </div>
                <button type="submit" className="info">Login / Register</button>

                { error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}
export default Login
