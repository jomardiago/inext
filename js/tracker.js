(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const selectElems = document.querySelectorAll('select');
        const dateElems = document.querySelectorAll('.datepicker');
        M.FormSelect.init(selectElems);
        M.Datepicker.init(dateElems);
    });
})();