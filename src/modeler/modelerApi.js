"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelerApi = /** @class */ (function () {
    function ModelerApi() {
        this.express = null;
        this.router = null;
        this.express = require('express');
        this.router = this.express.Router();
        this.router.get('/test', function (request, response) {
            return response.status(200).json({ test: 'ing' });
        });
        module.exports = this.router;
    }
    return ModelerApi;
}());
exports.ModelerApi = ModelerApi;
new ModelerApi();
//# sourceMappingURL=modelerApi.js.map