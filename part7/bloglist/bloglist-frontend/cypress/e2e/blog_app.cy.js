describe('Blog app', function() {

  const resetDB = () => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const newUser = {
      username: 'johndoe',
      name: 'John Doe',
      password: 'test'
    }

    const newUser2 = {
      username: 'annadoe',
      name: 'Anna Doe',
      password: 'test2'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser2)
    cy.visit('')
  }

  before(() => {
    resetDB()
  })

  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.get('#btn-showlogin').click()
    cy.contains('username')
    cy.contains('password')
  })


  describe('Login', function () {
    beforeEach(() => {
      resetDB()
    })

    it('succeeds with correct credentials', function() {
      cy.get('#btn-showlogin').click()
      cy.get('#username').type('johndoe')
      cy.get('#password').type('test')
      cy.get('#btn-login').click()

      cy.contains('John Doe logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#btn-showlogin').click()
      cy.get('#username').type('johndoe')
      cy.get('#password').type('wrong')
      cy.get('#btn-login').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 99, 71)')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'border-color', 'rgb(255, 99, 71)')

      cy.get('html').should('not.contain', 'John Doe logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      resetDB()
      cy.login({ username: 'johndoe', password: 'test' })
    })

    it('A blog can be created', function() {
      cy.contains('create new')
      cy.contains('new note').click()
      cy.get('#title-input').type('Test blog')
      cy.get('#author-input').type('Anonymous')
      cy.get('#url-input').type('google.com')
      cy.get('#btn-newblog').click()

      cy.get('.success')
        .should('contain', 'a new blog Test blog by Anonymous added')

      cy.contains('Test blog Anonymous')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Another test blog',
          author: 'Anonymous Author',
          url: 'google.com'
        })
      })

      it('user can like a blog', function() {
        cy.get('.btn-viewdetails').click()
        cy.get('.blog-likes').should('contain', '0')
        cy.get('.btn-likeblog').click()
        cy.get('.blog-likes').should('contain', '1')
      })

      it('user can delete a blog', function() {
        cy.get('.btn-viewdetails').click()
        cy.get('.btn-removeblog').click()
        cy.get('html').should('not.contain', 'Another test blog')
      })
    })
  })


  describe('when several blogs added by different users exist', function () {

    before(function () {
      resetDB()
      cy.login({ username: 'johndoe', password: 'test' })
      cy.createBlog({ title: 'Test Blog 1', author: 'Anonymous Blogger 1', url: 'google.com' })
      cy.createBlog({ title: 'Test Blog 2', author: 'Anonymous Blogger 2', url: 'google.com' })
      cy.createBlog({ title: 'Test Blog 3', author: 'Anonymous Blogger 3', url: 'google.com' })
      cy.logout()
      cy.login({ username: 'annadoe', password: 'test2' })
      cy.createBlog({ title: 'Another Test Blog 1', author: 'Another Anonymous Blogger 1', url: 'google.com' })
      cy.createBlog({ title: 'Another Test Blog 2', author: 'Another Anonymous Blogger 2', url: 'google.com' })
      cy.visit('')
    })

    beforeEach(function () {
      cy.visit('')
      cy.login({ username: 'annadoe', password: 'test2' })
    })

    it('only creator can see delete button', function() {
      cy.contains('Test Blog 1').parent().find('.btn-viewdetails').click()
      cy.contains('Test Blog 1').parent().find('.blog-addedby').should('contain', 'John Doe')
      cy.contains('Test Blog 1').parent().find('.btn-removeblog').should('not.exist')

      cy.contains('Another Test Blog 1').parent().find('.btn-viewdetails').click()
      cy.contains('Another Test Blog 1').parent().find('.blog-addedby').should('contain', 'Anna Doe')
      cy.contains('Another Test Blog 1').parent().find('.btn-removeblog').should('exist')
    })

    it('blogs are ordered by likes descending', function() {

      cy.get('.btn-viewdetails').each(($el) => {
        $el.click()
        cy.wait(1000)
      })

      cy.get('.blogpost').eq(0).should('contain', 'Test Blog 1')
      cy.get('.blogpost').eq(0).find('.blog-likes').should('contain', '0')

      cy.get('.blogpost').eq(1).should('contain', 'Test Blog 2')
      cy.get('.blogpost').eq(1).find('.blog-likes').should('contain', '0')

      cy.get('.blogpost').eq(2).should('contain', 'Test Blog 3')
      cy.get('.blogpost').eq(2).find('.blog-likes').should('contain', '0')

      cy.get('.blogpost').eq(3).should('contain', 'Another Test Blog 1')
      cy.get('.blogpost').eq(3).find('.blog-likes').should('contain', '0')

      cy.get('.blogpost').eq(4).should('contain', 'Another Test Blog 2')
      cy.get('.blogpost').eq(4).find('.blog-likes').should('contain', '0')

      cy.get('.blogpost').eq(1).find('.btn-likeblog').click()
      cy.wait(1000)
      cy.get('.blogpost').eq(1).find('.btn-likeblog').click()
      cy.wait(1000)

      cy.get('.blogpost').eq(2).find('.btn-likeblog').click()
      cy.wait(1000)
      cy.get('.blogpost').eq(2).find('.btn-likeblog').click()
      cy.wait(1000)
      cy.get('.blogpost').eq(2).find('.btn-likeblog').click()
      cy.wait(1000)

      cy.reload()

      cy.get('.btn-viewdetails').each(($el) => {
        $el.click()
        cy.wait(1000)
      })

      cy.get('.blogpost').eq(0).should('contain', 'Test Blog 3')
      cy.get('.blogpost').eq(0).find('.blog-likes').should('contain', '3')

      cy.get('.blogpost').eq(1).should('contain', 'Test Blog 2')
      cy.get('.blogpost').eq(1).find('.blog-likes').should('contain', '2')
    })

  })


})