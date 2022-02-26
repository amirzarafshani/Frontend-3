const { v4: uuidv4 } = require('uuid');

describe('filter', () => {
  it('user can make filter', () => {
    cy.visit('/');

    cy.get('div#reults-container').should('not.exist');
    cy.get('div#with-projectId-with-gatewayId').should('not.exist');
    cy.get('div#no-projectId-with-gatewayId-total-chart').should('not.exist');
    cy.get('div#with-projectId-no-gatewayId-total-chart').should('not.exist');
    cy.get('div#with-projectId-with-gatewayId-total').should('not.exist');
    cy.get('div#no-projectId-no-gatewayId-total').should('not.exist');

    //get projects without any filter
    //press filter button
    cy.get('button[id=filter]').click();
    cy.get(`[data-testid="projectsSelectBox"]`).contains('All projects');
    cy.get(`[data-testid="gatewaysSelectBox"]`).contains('All gateways');
    cy.get('div#reults-container').should('exist');
    cy.get('div#no-projectId-no-gatewayId-total').should('exist');
    cy.get('div#with-projectId-with-gatewayId').should('not.exist');
    cy.get('div#no-projectId-with-gatewayId-total-chart').should('not.exist');
    cy.get('div#with-projectId-no-gatewayId-total-chart').should('not.exist');
    cy.get('div#with-projectId-with-gatewayId-total').should('not.exist');

    //get projects with date range
    cy.get('input[name=fromDate]').type('2021/01/01');
    cy.get('input[name=toDate]').type('2021/12/31');
    //press filter button
    cy.get('button[id=filter]').click();
    cy.get(`[data-testid="projectsSelectBox"]`).contains('All projects');
    cy.get(`[data-testid="gatewaysSelectBox"]`).contains('All gateways');
    cy.get('div#reults-container').should('exist');
    cy.get('div#no-projectId-no-gatewayId-total').should('exist');
    cy.get('div#with-projectId-with-gatewayId').should('not.exist');
    cy.get('div#no-projectId-with-gatewayId-total-chart').should('not.exist');
    cy.get('div#with-projectId-no-gatewayId-total-chart').should('not.exist');
    cy.get('div#with-projectId-with-gatewayId-total').should('not.exist');

    //get projects with project 1 without any gateway
    cy.document().then(($doc) => {
      // Use "raw" DOM methods for constructing and firing the mousedown event:
      const clickDownEvent = $doc.createEvent('MouseEvents');
      clickDownEvent.initEvent('mousedown', true, true);
      $doc.querySelector(`[data-testid="projectsSelectBox"]`).dispatchEvent(clickDownEvent);
    });
    // // Now the select options are opened:
    cy.get('[role=option]:contains("Project 1")').click();
    cy.get(`[data-testid="projectsSelectBox"]`).contains('Project 1');
    //press filter button
    cy.get('button[id=filter]').click();
    cy.get(`[data-testid="gatewaysSelectBox"]`).contains('All gateways');
    cy.get('div#reults-container').should('exist');
    cy.get('div#no-projectId-no-gatewayId-total').should('not.exist');
    cy.get('div#with-projectId-with-gatewayId').should('not.exist');
    cy.get('div#no-projectId-with-gatewayId-total-chart').should('not.exist');
    cy.get('div#with-projectId-no-gatewayId-total-chart').should('exist');
    cy.get('div#with-projectId-with-gatewayId-total').should('not.exist');

    //
    //get gateways with project 1 with Gateway 1
    cy.document().then(($doc) => {
      // Use "raw" DOM methods for constructing and firing the mousedown event:
      const clickDownEvent = $doc.createEvent('MouseEvents');
      clickDownEvent.initEvent('mousedown', true, true);
      $doc.querySelector(`[data-testid="gatewaysSelectBox"]`).dispatchEvent(clickDownEvent);
    });
    // // Now the select options are opened:
    cy.get('[role=option]:contains("Gateway 1")').click();
    cy.get(`[data-testid="gatewaysSelectBox"]`).contains('Gateway 1');
    //press filter button
    cy.get('button[id=filter]').click();
    cy.get(`[data-testid="projectsSelectBox"]`).contains('Project 1');
    cy.get('div#reults-container').should('exist');
    cy.get('div#no-projectId-no-gatewayId-total').should('not.exist');
    cy.get('div#with-projectId-with-gatewayId').should('not.exist');
    cy.get('div#no-projectId-with-gatewayId-total-chart').should('not.exist');
    cy.get('div#with-projectId-no-gatewayId-total-chart').should('not.exist');
    cy.get('div#with-projectId-with-gatewayId-total').should('exist');

    //
    //get projects with Gateway 1 without any projects
    cy.document().then(($doc) => {
      // Use "raw" DOM methods for constructing and firing the mousedown event:
      const clickDownEvent = $doc.createEvent('MouseEvents');
      clickDownEvent.initEvent('mousedown', true, true);
      $doc.querySelector(`[data-testid="projectsSelectBox"]`).dispatchEvent(clickDownEvent);
    });
    // // Now the select options are opened:
    cy.get('[role=option]:contains("All projects")').click();
    cy.get(`[data-testid="projectsSelectBox"]`).contains('All projects');
    //press filter button
    cy.get('button[id=filter]').click();
    cy.get(`[data-testid="gatewaysSelectBox"]`).contains('Gateway 1');
    cy.get('div#reults-container').should('exist');
    cy.get('div#no-projectId-no-gatewayId-total').should('not.exist');
    cy.get('div#with-projectId-with-gatewayId').should('not.exist');
    cy.get('div#no-projectId-with-gatewayId-total-chart').should('exist');
    cy.get('div#with-projectId-no-gatewayId-total-chart').should('not.exist');
    cy.get('div#with-projectId-with-gatewayId-total').should('not.exist');
  });
});
