import { Router } from 'express'
import { getProfile, getAnnouncements } from '../controllers/studentController'
import { authMiddleware } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)
router.get('/profile', getProfile)
router.get('/announcements', getAnnouncements)

export default router
