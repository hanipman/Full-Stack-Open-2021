describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'name',
			username: 'username',
			password: 'password'
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('log in to application')
		cy.contains('username')
		cy.contains('password')
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#login_username').type('username')
			cy.get('#login_password').type('password')
			cy.get('#login_button').click()
		})

		it('fails with wrong credentials', function() {
			cy.get('#login_username').type('wrong_user')
			cy.get('#login_password').type('wrong_password')
			cy.get('#login_button').click()

			cy.contains('wrong username or password').should('have.class', 'error')
		})
	})
})