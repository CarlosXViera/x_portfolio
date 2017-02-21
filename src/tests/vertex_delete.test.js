var expect = require('expect')

describe('Delete a vertex', function() {
    it('Should draw a Vertex by clicking the play area.', () => {
      browser.url('http://localhost:3000');
      browser.leftClick('#bknd', 500, 250);
      browser.pause(1000);
    });
    it('Should draw a second vertex', () => {
      browser.leftClick('#bknd', 500, 50);
      browser.pause(1000);
    });
    it('Should highlight the first Vertex then click the second Vertex to connect an Edge.', () => {
      browser.leftClick('#bknd', 500, 250);
      browser.pause(1000);
      browser.leftClick('#bknd', 500, 50);
      browser.pause(1000);
    });
    it('Should doubleClick the first vertex.', () => {
      browser.leftClick('#bknd', 500, 250);
      browser.leftClick('#bknd', 500, 250);
      browser.pause(1000);
    })
});
