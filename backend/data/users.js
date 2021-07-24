import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Sumit Wanole',
    email: 'sumit@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Atul Jain',
    email: 'atul@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
