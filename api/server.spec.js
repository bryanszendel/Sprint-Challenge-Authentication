const request = require('supertest');
const server = require('./server.js');
const Users = require('../users/users-model.js');
const db = require('../database/dbConfig.js')
const bcrypt = require('bcryptjs')

const secrets = require('../config/secrets.js')

describe('server.js', () => {

  beforeEach(async () => {
    await db('users').truncate();
  })
  
  describe('POST /auth/register', () => {
    // test 1
    it('saves to DB', async () => {
      await Users.add({username: 'bryan', password: 'pass'})
      let users = await db('users')
      expect(users).toHaveLength(1)
    })
    
    // test 2
    it("returns {username: 'bryan'}", async () => {
      const [id] = await Users.add({username: 'bryan', password: 'pass'})
      let user = await db('users').where({id}).first()
      expect(user.username).toBe('bryan')
    })
  })

  describe('POST /login', () => {
    // test 1
    it('finds the user', async () => {
        const [id] = await Users.add({username: 'bryan', password: 'pass'})
        const user = await Users.findById(id)
        expect(user.username).toBe('bryan')
        console.log(user)
      })
      
    // test 2
    it('generates a hashed password', async () => {
      const user = {username: 'bryan', password: 'pass'}
      const hash = bcrypt.hashSync(user.password, 10)
      user.password = hash

            

      expect(user.password).toBe(hash)
    })
    

  })

  describe('GET /api/jokes with no token', () => {
    // test 1
    it('returns 400',  () => {
      return request(server).get('/api/jokes').then(res => {
        expect(res.status).toBe(400)
      })
    })

    // test 2
    it('returns JSON', () => {
      return request(server).get('/api/jokes').then(res => {
        expect(res.type).toMatch(/json/i)
      })
    
    })

  })

})

function generateToken(user) {
  const payload = {
    username: user.username
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}




///////////////////////////////////////////////////



// const request = require('supertest');
// const server = require('./server.js');


// describe('server.js', () => {

//   beforeEach(async () => {
//     await db('users').truncate();
//   })

//   describe('POST /register', () => {
//     // test 1
//     it('saves to DB', async () => {

//     })
//   })
//     // test 2


//   describe('POST /login', () => {
//     // test 1

//     // test 2

//   })

//   describe('GET /api/jokes', () => {
//     // test 1

//     // test 2

//   })

// })