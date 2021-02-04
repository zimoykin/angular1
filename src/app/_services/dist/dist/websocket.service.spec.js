"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var websocket_service_1 = require("../websocket.service");
describe('WebsocketService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(websocket_service_1.WebsocketService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
