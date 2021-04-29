describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'name',
			username: 'username',
			password: 'password'
		}
		cy.createUser(user)
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
			cy.contains('logout').click()
		})

		it('fails with wrong credentials', function() {
			cy.get('#login_username').type('wrong_user')
			cy.get('#login_password').type('wrong_password')
			cy.get('#login_button').click()

			cy.get('.error')
				.should('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')

			cy.get('html').should('not.contain', 'name logged in')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'username', password: 'password' })
		})

		it('A blog can be created', function() {
			cy.contains('blogs')

			cy.contains('create new blog').click()
			cy.get('#title_input').type('blog_title')
			cy.get('#author_input').type('blog_author')
			cy.get('#url_input').type('blog_url')
			cy.get('#create_button').click()

			cy.get('.notif')
				.should('contain', 'a new blog blog_title by blog_author added')
				.and('have.css', 'color', 'rgb(0, 128, 0)')
			cy.contains('blog_title blog_author')
		})

		it('User can like blog', function() {
			cy.createBlog({
				title: 'blog_title',
				author: 'blog_author',
				url: 'blog_url'
			})

			cy.get('#view_button').click()
			cy.contains('blog_url')
			cy.contains('likes 0')
			cy.get('#like_button').click()
			cy.contains('likes 1')
		})

		describe('Deleting blogs', function() {
			beforeEach(function() {
				cy.createUser({
					name: 'other_name',
					username: 'other_username',
					password: 'other_password'
				})
				cy.createBlog({
					title: 'blog_title',
					author: 'blog_author',
					url: 'blog_url'
				})
			})

			it('User that did not create blog cannot delete it', function() {
				cy.login({
					username: 'other_username',
					password: 'other_password'
				})
				cy.contains('blog_title blog_author').find('#view_button').click()
				cy.contains('#remove_button').should('not.exist')
			})

			it('User that created blog can delete it', function() {
				cy.contains('blog_title blog_author').find('#view_button').click()
				cy.get('#remove_button').click()
				cy.contains('blog_title blog_author').should('not.exist')
			})
		})
	})
})