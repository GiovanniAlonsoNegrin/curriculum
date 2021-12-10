$( document ).ready(function (){
    let userLang = navigator.language;
    let mySelect = $('#select').val();
    if (userLang == 'es-ES'){
        mySelect = 'Spanish';
    }
    if  (userLang == 'en-EN'){
        mySelect = 'English';
    }

    //Languages
    let textsToChange = $('[data-section]');

    const changeLanguage = async (lang) => {
        const requestJson = await fetch(`./languages/${lang}.json`);
        const texts = await requestJson.json();

        for (let textToChange of textsToChange){
            const section = textToChange.dataset.section;
            const value = textToChange.dataset.value;

            textToChange.innerHTML = texts[section][value];
        }
    };

    $('#select').change(function () {
        mySelect = $(this).find(':selected').data('lang');
        if (mySelect == 'es'){
            changeLanguage('es');
        } else {
            changeLanguage('en');
        }
    });
});