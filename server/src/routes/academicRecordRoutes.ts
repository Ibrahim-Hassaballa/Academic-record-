import { Router } from 'express'
import { getAcademicRecord } from '../controllers/academicRecordController'
import { authMiddleware } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)
router.get('/', getAcademicRecord)

export default router
