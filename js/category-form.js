(function() {
    const hashId = window.location.hash.substr(1);

    const validForm = () => {
        return document.querySelector('#type').value && document.querySelector('#name').value && document.querySelector('#description').value;
    };

    const addNewCategory = () => {
        if (validForm()) {
            const newCategory = {};

            newCategory.id = new Date().getTime();
            newCategory.type = document.querySelector('#type').value;
            newCategory.name = document.querySelector('#name').value;
            newCategory.description = document.querySelector('#description').value;

            const categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [];
            categories.push(newCategory);

            localStorage.setItem('categories', JSON.stringify(categories));

            document.querySelector('#name').value = '';  
            document.querySelector('#description').value = '';  
            M.toast({html: 'Category saved successfully.', classes: 'light-green'});
        } else {
            M.toast({html: 'Please input required fields.', classes: 'red'});
        }
    };

    const updateCategory = () => {
        const categories = JSON.parse(localStorage.getItem('categories'));

        categories.forEach(category => {
            if (category.id == hashId) {
                category.type = document.querySelector('#type').value;
                category.name = document.querySelector('#name').value;
                category.description = document.querySelector('#description').value;
            }
        });

        localStorage.setItem('categories', JSON.stringify(categories));
        M.toast({html: 'Category saved successfully.', classes: 'light-green'});

        document.querySelector('#name').value = '';  
        document.querySelector('#description').value = ''; 
    };

    const populateCategoryForm = (id) => {
        const categories = JSON.parse(localStorage.getItem('categories'));
        const category = categories.find(category => category.id == id);

        document.querySelector('#type').value = category.type;
        document.querySelector('#name').value = category.name;
        document.querySelector('#description').value = category.description;
    };

    document.addEventListener('DOMContentLoaded', function() {
        const selectElems = document.querySelectorAll('select');
        M.FormSelect.init(selectElems);
    });

    document.querySelector('#category-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (hashId === '') {
            addNewCategory();
        } else {
            updateCategory();
        }
    });

    if (hashId !== '') { populateCategoryForm(hashId); }
})();