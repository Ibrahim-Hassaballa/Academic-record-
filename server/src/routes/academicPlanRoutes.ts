import { Router } from 'express'
import { getAcademicPlan } from '../controllers/academicPlanController'
import { authMiddleware } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)
router.get('/', getAcademicPlan)

export default router
