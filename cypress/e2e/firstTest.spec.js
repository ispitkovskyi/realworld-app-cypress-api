describe('Test with backend', () => {

  beforeEach(() => {
    // 3rd parameter - the value to be used as our response for intercepted call
    // cy.intercept('GET', '**/tags', {fixture: 'tags.json'})
    cy.intercept({method: 'Get', path: 'tags'}, {fixture: 'tags.json'})
    cy.loginToApplication()
  })

  it('verify correct request and response', () => {
    cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/')
        .as('postArticle') //configuration is saved to the postArticle variable

    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type('This is the title')
    cy.get('[formcontrolname="description"]').type('This is a description')
    cy.get('[formcontrolname="body"]').type('This is a body of the article')
    cy.contains('Publish Article').click()

    // Wait for the API call to be intercepted by the created interceptor saved to 'postArticle' variable
    cy.wait('@postArticle').then(xhr => {
      console.log(xhr)
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.request.body.article.body).to.equal('This is a body of the article')
      expect(xhr.response.body.article.description).to.equal('This is a description')
    })
  })

  it('verify popular tags are displayed', () => {
    cy.get('.tag-list').should('contain', 'cypress')
        .and('contain', 'automation')
        .and('contain', 'testing')
  })

  it('verify global feed likes count', () => {
    // A wildcard used at the end of ULR (avoid specifying parameters)
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles*', {fixture: 'articles.json'})

    // In the articles.json fixture we have 2 posts, 1st has favoritesCount=1, 2nd has favoritesCount=5. Assert this.
    cy.get('app-article-list button').then(heartList => {
      expect(heartList[0]).to.contain('1')
      expect(heartList[1]).to.contain('5')
    })

    //cy.fixture - reads content of file, stored in fixtures
    cy.fixture('articles.json').then(file => {
      const articleLink = file.articles[1].slug
      file.articles[1].favoritesCount = 6  // Mimic clicking "like" icon which increases previous value 5 by 1 = 6

      // Intercept the POST call, when the article "like" button is clicked (see code after this fixture-block)
      cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/' + articleLink + '/favorite', file)
    })

    cy.get('app-article-list button').eq(1).click().should('contain', '6')
  })

  it.only('intercepting and modifying the request and response', () => {

    //Example of modifying request
    // cy.intercept('POST', '**/articles/', (req) => {
    //   req.body.article.description = 'This is a description 2'
    // }).as('postArticle')

    //Example of modifying response
    cy.intercept('POST', '**/articles/', (req) => {
      req.reply(resp => {
        expect(resp.body.article.description).to.equal('This is a description')
        resp.body.article.description = 'This is a description 2'
      })
    }).as('postArticle')

    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type('This is the title')
    cy.get('[formcontrolname="description"]').type('This is a description')
    cy.get('[formcontrolname="body"]').type('This is a body of the article')
    cy.contains('Publish Article').click()

    // Wait for the API call to be intercepted by the created interceptor saved to 'postArticle' variable
    cy.wait('@postArticle').then(xhr => {
      console.log(xhr)
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.request.body.article.body).to.equal('This is a body of the article')
      expect(xhr.response.body.article.description).to.equal('This is a description 2')
    })
  })
})
