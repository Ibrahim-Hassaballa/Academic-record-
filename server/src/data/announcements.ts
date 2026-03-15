import type { Announcement } from '../types'

export const announcements: Announcement[] = [
  {
    id: 'a1',
    titleAr: 'موعد تسجيل مقررات الفصل الثاني',
    titleEn: 'Second Semester Course Registration',
    bodyAr: 'يُعلم الطلاب بأن تسجيل مقررات الفصل الدراسي الثاني 1446هـ سيبدأ بتاريخ 15/07/1446هـ وحتى 25/07/1446هـ.',
    bodyEn: 'Students are informed that second semester registration (1446H) will open on 15/07/1446H until 25/07/1446H.',
    date: '2026-03-01',
    priority: 'high',
  },
  {
    id: 'a2',
    titleAr: 'إعلان عن اختبارات منتصف الفصل',
    titleEn: 'Midterm Examination Announcement',
    bodyAr: 'ستُعقد اختبارات منتصف الفصل الدراسي الأول خلال الفترة من 20-30 مارس 2026. يرجى مراجعة جدول الاختبارات في البوابة.',
    bodyEn: 'Midterm exams will be held from March 20-30, 2026. Please review the exam schedule on the portal.',
    date: '2026-03-05',
    priority: 'high',
  },
  {
    id: 'a3',
    titleAr: 'ورشة عمل: مهارات البحث العلمي',
    titleEn: 'Workshop: Research Skills',
    bodyAr: 'تدعو عمادة الدراسات العليا طلاب الماجستير لحضور ورشة عمل حول مهارات كتابة رسالة الماجستير يوم الأربعاء 12 مارس 2026.',
    bodyEn: 'The Deanship of Graduate Studies invites Master\'s students to a thesis writing workshop on Wednesday, March 12, 2026.',
    date: '2026-03-07',
    priority: 'normal',
  },
  {
    id: 'a4',
    titleAr: 'تحديث سياسة الحضور',
    titleEn: 'Attendance Policy Update',
    bodyAr: 'يذكّر القسم بأن الحضور إلزامي ولا يجوز تجاوز 25% من إجمالي ساعات المقرر. الطلاب الذين يتجاوزون هذه النسبة سيُحرمون من الاختبار.',
    bodyEn: 'The department reminds students that attendance is mandatory. Students who exceed 25% absences will be barred from exams.',
    date: '2026-02-28',
    priority: 'normal',
  },
  {
    id: 'a5',
    titleAr: 'إجازة اليوم الوطني',
    titleEn: 'National Day Holiday',
    bodyAr: 'تُعلم الجامعة بأن يوم 23 سبتمبر سيكون إجازة رسمية بمناسبة اليوم الوطني للمملكة العربية السعودية.',
    bodyEn: 'The university announces that September 23rd will be an official holiday for Saudi National Day.',
    date: '2026-02-20',
    priority: 'normal',
  },
]
