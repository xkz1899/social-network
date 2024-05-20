export interface ICommentPhoto {
  id: number
  message: string
  createdAt: string
  updatedAt: string
  photoId: number
  userId: number
  user: User
}

interface User {
  id: number
  name: string
  surname: string
  image: string
}

