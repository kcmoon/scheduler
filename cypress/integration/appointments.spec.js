describe("Apoointments", () => {
  beforeEach(()=> {
    //Reset the test server
    cy.request("GET", "/api/debug/reset");
    //Visits the homepage
    cy.visit('/')
    //Confirm the data has loaded
    cy.contains("[data-testid=day]", "Monday");
  });
  it("should book an interview", () => {
    //Click on add button
    cy.get("[alt=Add]")
      .first()
      .click();
    //Enters their name
    cy.get('[data-testid="student-name-input"]')
      .type("Lydia Miller-Jones", {delay: 50});
    //Choose the interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();
    //Clicks the save button
    cy.contains("Save")
      .click();
    //Sees the booked interview
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })
  it("should edit an existing interview", () => {
    //Click on edit button
    cy.get("[alt=Edit]")
      .first()
      .click({force: true});
    //Select new interviewer
    cy.get("[alt='Tori Malcolm']")
      .click();
    //Clear Student Name & type in new Name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("John Doe", {Delay: 50});
    //Save new appointment
    cy.contains("Save")
      .click();
    //Sees edited interview
    cy.contains(".appointment__card--show", "John Doe");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an existing interview", () => {
    //Click on delete button
    cy.get("[alt=Delete]")
      .first()
      .click({force: true});
    //Click on confirm button
    cy.contains("Confirm")
      .click();
    //Confirm Deleting feature appears
    cy.contains("Deleting")
      .should("exist");
    cy.contains("Deleting")
      .should("not.exist");
    //Confirm appointment is deleted
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});