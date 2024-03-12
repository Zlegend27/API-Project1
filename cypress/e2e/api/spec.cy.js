import { postRequestBody } from "../../fixtures/testData.json";
import { putRequestBody } from "../../fixtures/testData.json";

describe("CRUD Operations", () => {

  let studentId;

  it("Create a new student using POST", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("baseUrl"),
      body: postRequestBody,
    }).then((response) => {
      studentId = response.body.id
        expect(response.status).to.equal(200)
        // expect(response.body.firstName).to.equal(postRequestBody.firstName)
        expect(response.duration).to.be.below(1500)
        cy.validateResponse(response, postRequestBody)
    })
  });


  /**
   * Get the user you created
   * And validate your status is 200
   */

  it("Read the created student using GET", () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env("baseUrl")}/${studentId}`,
    }).then((response) => {
        expect(response.status).to.equal(200)
        cy.validateResponse(response, postRequestBody)
    })
    })

   /**
   * Create a PUT request
   * Update the student that we created
   * And validate your status is 200
   * And validate your request is matching with the response of your PUT request
   */

   it('Update the created student using PUT', () => {
    cy.request({
      method: 'PUT',
      url: `${Cypress.env("baseUrl")}/${studentId}`,
      body: putRequestBody,
    }).then((response) => {
      expect(response.status).to.equal(200)
      cy.validateResponse(response, putRequestBody)
    })
   })

     /**
   * Send a request and GET the updated user
   * Validate its 200
   * Validate response time is under 400ms
   * and validate student firstname on the response is matching with your updated name
   */
   
     it('get the updated student using get', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env("baseUrl")}/${studentId}`,
      }).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.duration).to.be.below(1500)
          cy.validateResponse(response, putRequestBody)
      })
     })

     it('deleting the student ', () => {
      cy.request({
        method: "DELETE",
        url: `${Cypress.env("baseUrl")}/${studentId}`,
      }).then((response) => {
        expect(response.status).to.equal(200)
      })
     })
  })

