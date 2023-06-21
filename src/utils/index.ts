import { v4 as uuidv4 } from 'uuid'

const DICEBEAR_API_URL = 'https://api.dicebear.com/6.x/bottts/svg?seed='
const users = localStorage.getItem('users') || ''
const parseUsers = (): User[] => (users.length === 0) ? []: JSON.parse(users)
const updateUsers = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users))
}
const bots = localStorage.getItem('bots') || ''
const parseBots = (): Bot[] => (bots.length === 0) ? []: JSON.parse(bots)
const updateBots = (newBots: Bot[]) => {
    localStorage.setItem('bots', JSON.stringify(newBots))
}

const Utils = {
    getUsers: () => parseUsers(),
    addUser: (username: string, password: string, users: User[]): string =>  { 
        const id = uuidv4()
        updateUsers([
        ...users,
        { id, username, password} as User
        ])
        return id
    },
    getToken: (): string | null => localStorage.getItem('token'),
    setToken: (token: string) => localStorage.setItem('token', token),
    deleteToken: () => localStorage.removeItem('token'),
    getBots: () => parseBots(),
    addBot: (name: string, purpose: string, stateBots: Bot[]): Bot =>  { 
        const bot =  {
            name,
            purpose,
            id: uuidv4(),
            created: new Date().getTime(),
            avatar: DICEBEAR_API_URL + name,
            user_id: localStorage.getItem('token')
        } as Bot
        updateBots([
            ...stateBots,
           bot
        ]) 
        return bot
    },
    updateBot: (id: string, updatedBot: Bot, stateBots: Bot[]): Bot => {
        const bots = stateBots
        const targetIndex = bots.findIndex(b => b.id === id)
        if(targetIndex > -1) {
            const copyBots = bots
            copyBots[targetIndex] = {
                ...updatedBot,
                id,
                created: copyBots[targetIndex].created,
                avatar: DICEBEAR_API_URL + updatedBot.name,
                updated: new Date().getTime(),
            }
            
            updateBots(copyBots) 
            return copyBots[targetIndex]
        } else return updatedBot
    },
    deleteBot: (stateBots: Bot[]) =>  updateBots(stateBots),
    generateUUID: () => uuidv4()
}

export default Utils
