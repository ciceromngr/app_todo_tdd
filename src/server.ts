import 'dotenv/config'
import server from './app'
server.app.listen(
    process.env.PORT,
    () => console.log(`
        Server running on 
        http://${process.env.HOST}:${process.env.PORT}`
    )
)
