import { useEffect, useState } from 'react'
import Utils from "../utils"
import BotForm from './botform'


const Dashboard = () => {
    const { getBots, addBot, deleteBot, updateBot, getToken } = Utils
    const [token] = useState(getToken())
    const [bots, setBots] = useState(getBots())
    const [name, setName] = useState('')
    const [purpose, setPurpose] = useState('')
    const [error, setError] = useState('')
    const [edit, setEdit] = useState<Bot|null>(null)
    const [success, setSuccess] = useState('')
    const [active, setActive] = useState('list')
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       
        if(!name || !purpose) {
            return setError('Invalid name or purpose.')
        }
        if(!edit) {
            const bot = addBot(name, purpose, bots)
            setBots([...bots, bot])
            setSuccess('Bot successfully added')
        } else {
            const bot = updateBot(edit.id, {
                name,
                purpose
            } as Bot, bots)
            const targetIndex = bots.findIndex(bot => bot.id === edit.id)
            const copyBots = bots
            copyBots[targetIndex] = bot
            setBots([...copyBots])
            setSuccess('Bot successfully updated')
        }
        setName('')
        setPurpose('')
        
       

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setError('')
        if(name === 'name') setName(value)
        if(name === 'purpose') setPurpose(value)
    }

    const handleDelete = (id: string) => {
        deleteBot([...bots.filter(bot => bot.id !== id && bot.user_id === getToken())])
        setBots([...bots.filter(bot => bot.id !== id)])
    }

    const handleEdit = (bot: Bot) => {
        setEdit(bot)
        setName(bot.name)
        setPurpose(bot.purpose)
        setActive('edit')
    }

    useEffect(() => {
        if(active !== 'list') {
            //clear messages
            setError('')
            setSuccess('')
        }
    }, [active])
    return (
        <>
            <div className="flex mb-4">
                <button className={'info' +((active === 'list') ? ' active': '')} 
                    onClick={() => setActive('list')}>List</button>
                <button className={'success' +((active === 'add' || active === 'edit') ? ' active': '')}
                    onClick={() => {
                        setActive('add')
                        setEdit(null)
                    }}>
                        {active === 'edit' ? 'Editing' : 'Add'} bot
                    </button>
                
            </div>
            <div className="mb-4">
               {(active === 'add' || active === 'edit') &&
               <BotForm
                    bot={edit}
                    name={name}
                    purpose={purpose}
                    error={error}
                    success={success}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit} 
               />}
                {active === 'list' && bots && bots.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Purpose</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {bots.filter(b => b.user_id === token).map(bot => 
                        (<tr key={bot.id}>
                            <td><img src={bot.avatar} alt={bot.name} /></td>
                            <td>{bot.name}</td>
                            <td>{bot.purpose}</td>
                            <td>{new Date(bot.created).toLocaleString()}</td>
                            <td>
                                <div className="flex">

                                <button  onClick={() => handleEdit(bot)}>Edit</button>
                                <button className="danger" onClick={() => handleDelete(bot.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>)
                    )}
                    </tbody>
                </table>) }

                {active === 'list' && bots && bots.length === 0 && (
                    'No results yet.'
                )}
            </div>
      
          
        </>
    )
}
export default Dashboard
