"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
require("popper.js/dist/umd/popper.min.js");
require("bootstrap/dist/js/bootstrap.min.js");
require("mdbootstrap/js/mdb.min.js");
require("../sass/main.scss");
$(document).ready(function () {
    // MDB Date Picker Initialization
    // @ts-ignore
    $('.datepicker').pickadate({
        // Allow the range of the years to be -100 to +100
        selectYears: 200
    });
    // @ts-ignore
    $('.js-datepicker-edit').pickadate({
        // display month in the abbreviated 3-letter format?
        showMonthsShort: true,
        format: 'yyyy mmm d',
        // Allow the range of the years to be +/-2
        selectYears: 4
    });
    // MDB Time Picker Initialization
    // @ts-ignore
    $('.js-timepicker-edit').pickatime({
        // 12 or 24 hour format.
        twelvehour: true,
    });
    // @ts-ignore
    $('.mdb-select').materialSelect();
});
//# sourceMappingURL=main.js.map