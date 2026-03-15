import { Router } from 'express'
import { getCourses, registerCourse, dropCourse } from '../controllers/courseController'
import { authMiddleware } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)
router.get('/', getCourses)
router.post('/register', registerCourse)
router.delete('/drop/:courseId', dropCourse)

export default router
