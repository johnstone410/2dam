interface User {
    id: string,
    username: string,
    password: string
}

interface Bot {
    id: string,
    name: string,
    purpose: string,
    avatar: string,
    created: number,
    updated?: number,
    user_id: string
}