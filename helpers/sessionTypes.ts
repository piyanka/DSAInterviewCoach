import type { Session } from 'next-auth'

export type SessionWithId = Session & {
  user: Session['user'] & {
    id?: string
  }
}