// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {}
) => {
    const login = () => {
        cy.visit('/users/sign_in')

        cy.get("[data-qa-selector='login_field']").type(user)
        cy.get("[data-qa-selector='password_field']").type(password, { log: false })
        cy.get("[data-qa-selector='sign_in_button']").click()
    }

    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
            .should('not.eq', '/users/sign_in')
    }

    const options = {
        cacheAcrossSpecs: true,
        validate,
    }

    if (cacheSession) {
        cy.session(user, login, options)
    } else {
        login()
    }
})


Cypress.Commands.add('logout', () => {
    cy.get('.qa-user-avatar').click()
    cy.get('[data-qa-selector="sign_out_link"]').click()
})

Cypress.Commands.add('gui_createProject', (project) => {
    cy.visit('/projects/new')

    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description)
    cy.get('.qa-initialize-with-readme-checkbox').click()

    cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', (issue) => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
    cy.get('.qa-issuable-form-title').type(issue.title)
    cy.get('.qa-issuable-form-description').type(issue.description)
    cy.contains('Submit issue').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', (label) => {
    cy.get('.qa-edit-link-labels').click()    
    cy.get('.label-item').contains(label.name).click()    
    cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
    cy.get('.block.milestone .edit-link').click()
    cy.contains(milestone.title).click()
})