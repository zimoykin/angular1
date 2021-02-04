"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var authorization_service_service_1 = require("../authorization-service.service");
describe('AuthorizationServiceService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(authorization_service_service_1.Auth);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
