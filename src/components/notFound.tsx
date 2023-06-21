const NotFound =  () => {
    return (
        <div 
            style={{
                display: 'flex',
                height: `50vh`,
                width: `100%`,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <h1>Oops !</h1>
            <p>Page not found.</p>
        </div>
    )
}

export default NotFound;