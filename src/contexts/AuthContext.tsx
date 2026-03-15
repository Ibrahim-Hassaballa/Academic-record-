import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Student, AuthResponse, TempTokenResponse } from '../types'

interface AuthContextType {
  user: Student | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<TempTokenResponse>
  verify2FA: (tempToken: string, code: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Student | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(
    sessionStorage.getItem('ksu-token')
  )
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    sessionStorage.removeItem('ksu-token')
    setAccessToken(null)
    setUser(null)
  }, [])

  useEffect(() => {
    const token = sessionStorage.getItem('ksu-token')
    if (!token) {
      setIsLoading(false)
      return
    }
    fetch('/api/student/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then((data: Student) => {
        setUser(data)
        setAccessToken(token)
      })
      .catch(() => logout())
      .finally(() => setIsLoading(false))
  }, [logout])

  const login = async (username: string, password: string): Promise<TempTokenResponse> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Login failed')
    }
    return res.json()
  }

  const verify2FA = async (tempToken: string, code: string): Promise<void> => {
    const res = await fetch('/api/auth/verify-2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tempToken, code }),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Verification failed')
    }
    const data: AuthResponse = await res.json()
    sessionStorage.setItem('ksu-token', data.accessToken)
    setAccessToken(data.accessToken)
    setUser(data.student)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user,
        isLoading,
        login,
        verify2FA,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
