import {jest} from "@jest/globals";
import usernameJson from '../fixtures/username_json.json';
import {getRepos} from "../../src/app/services/githubService";


describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the form and submits correctly', async () => {
    // Check if the form elements are rendered
    cy.get('label').contains('Please type a Github username or org name').should('be.visible');
    cy.get('label').contains('Select Type').should('be.visible');
    cy.get('label').contains('Results per page:').should('be.visible');
    cy.get('label').contains('Select page').should('be.visible');
    cy.get('label').contains('Sort by:').should('be.visible');
    cy.get('label').contains('Direction:').should('be.visible');

    // Fill out the form
    cy.get('input[placeholder="username or org"]').type('kevindavison1234');
    cy.get('select').eq(0).select('username');
    cy.get('select').eq(1).select('10');
    cy.get('input[type="text"]').clear().type('1');
    cy.get('select').eq(2).select('created');
    cy.get('select').eq(3).select('asc');

    // Mock the response from getRepos
    cy.intercept('GET', '**/repos', {fixture: 'username_json.json'}).as('getRepos');

    // Submit the form
    cy.get('button').contains('Submit').click();
    // Mock the response from getRepos
    // Mock the response from getRepos
    // Call getRepos function
    getRepos('kevindavison1234', 'username', 'created', '10', 'asc', '1').then(response => {
      expect(response).to.have.property('data');
      expect(response.data.size===1);
    });
    cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
    cy.get('[data-testid="repo-table"]').should('be.visible');
  });

  it('getRepos has no data present', async () => {
    // Mock the response from getRepos
    // Fill out the form
    cy.get('input[placeholder="username or org"]').type('testuser');
    cy.get('select').eq(0).select('username');
    cy.get('select').eq(1).select('10');
    cy.get('input[type="text"]').clear().type('1');
    cy.get('select').eq(2).select('created');
    cy.get('select').eq(3).select('asc');

    cy.intercept('GET', '**/repos', {fixture: 'username_json.json'}).as('getRepos');

    // Submit the form
    cy.get('button').contains('Submit').click();
    // Mock the response from getRepos
    // Mock the response from getRepos
    // Call getRepos function
    getRepos('testuser', 'username', 'created', '10', 'asc', '1').then(response => {
      expect(response).to.have.property('data');
      expect(response.data.size===0);
    });
    cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
    cy.get('[data-testid="repo-table"]').should('be.visible');
  });

});