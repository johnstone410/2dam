interface BotFormProps {
    bot: Bot | null,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void
    name: string,
    purpose: string,
    error: string,
    success: string
}
const BotForm = (props: BotFormProps) => {
    const { bot, name, purpose, handleChange, handleSubmit, error, success } = props
    return (
        <div className="mb-4">
            <form action="" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} type="text" name='name' onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="purpose">Purpose</label>
                    <input value={purpose} type="text" name='purpose' onChange={handleChange} />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {success && <p style={{color: 'green'}}>{success}</p>}
                <button className="success"> { bot ? 'Save' : 'Add' }</button>
            </form>
        </div>
    )
}

export default BotForm
