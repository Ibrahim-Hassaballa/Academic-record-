import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import studentRoutes from './routes/studentRoutes'
import courseRoutes from './routes/courseRoutes'
import academicPlanRoutes from './routes/academicPlanRoutes'
import academicRecordRoutes from './routes/academicRecordRoutes'

const app = express()
const PORT = process.env.PORT || 3001
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: CORS_ORIGIN, credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/academic-plan', academicPlanRoutes)
app.use('/api/academic-record', academicRecordRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})

export default app
