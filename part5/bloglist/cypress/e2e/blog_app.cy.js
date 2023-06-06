describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const newUser = {
      username: 'johndoe',
      name: 'John Doe',
      password: 'test'
    }

    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000')
  })


  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.get('#btn-showlogin').click()
    cy.contains('username')
    cy.contains('password')
  })


  describe('Login',function() {
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



})