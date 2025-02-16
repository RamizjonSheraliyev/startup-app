import { getUser } from '@/actions/user.action'
import { IUser } from '@/app.types'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRefresh } from './use-refresh'

const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null)

  const { onOpen } = useRefresh()
  const { userId } = useAuth()

  useEffect(() => {
    if (!userId) return // Null yoki undefined bo‘lsa, hech narsa qilmaydi

    const getData = async () => {
      try {
        const data = await getUser(userId)
        if (data === 'notFound') {
          onOpen() // Not found bo‘lsa, refresh modal ochadi
        } else {
          setUser(data)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setUser(null) // Xatolik bo‘lsa, foydalanuvchini null qilamiz
      }
    }

    getData()
  }, [userId, onOpen]) // Dependensiyalarni to‘g‘ri qo‘shib qo‘yamiz

  return { user }
}

export default useUser
