"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var http_service_service_1 = require("../http-service.service");
describe('HttpServiceService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(http_service_service_1.Http);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
