import projectRoutes from './routes/project.js'

// server/index.js
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import config from './config.js'
import authRoutes from './routes/auth.js'
import path from "path"

const app = express();
const __dirname = path.resolve()

app.use(express.json());
app.use(cors());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, 
                                    useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes)

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'../frontend','build','index.html'))
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));