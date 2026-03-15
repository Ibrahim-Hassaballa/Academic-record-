export interface MockUser {
  id: string
  username: string
  password: string
  studentId: string
  twoFACode: string
}

export const users: MockUser[] = [
  {
    id: 'u1',
    username: '45123456',
    password: 'pass123',
    studentId: 's1',
    twoFACode: '123456',
  },
]

export function findUser(username: string): MockUser | undefined {
  return users.find((u) => u.username === username)
}
