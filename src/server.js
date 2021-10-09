import express from 'express'
import cors from 'cors'
import { join } from "path"
import listEndPoints from 'express-list-endpoints'
import authorsRouter from './services/authors/index.js'
import fileRouter from './services/files/index.js'
import { notFoundErrorHandler, forbiddenErrorHandler, badRequestErrorHandler, genericServerErrorHandler } from "./errorHandlers.js"

const server = express()
const port = process.env.PORT

const publicFolderPath = join(process.cwd(), "public")
const whitelist= [process.env.FE_DEV_URL, process.env.FE_PROD_URL]

const corsOpts = {
  origin: function(origin, next){
    console.log('ORIGIN --> ', origin)
    if(!origin || whitelist.indexOf(origin) !== -1){ 
      next(null, true)
    }else{ 
      next(new Error(`Origin ${origin} not allowed!`))
    }
  }
}

//global middlewares
server.use(express.static(publicFolderPath))

server.use(express.json())
server.use(cors(corsOpts))

//Routes
server.use('/authors', authorsRouter)
server.use('/files',fileRouter)

// error middleware
server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)

console.table(listEndPoints(server))
server.listen(port,()=>{
    console.log('server listening on port ' + port)
})