$(document).ready(function () {
    const $body = $('body');
    const $select = $('#select');
    const $overlay = $('.overlay');
    const textsToChange = $('[data-section]');
    const supportedLangs = ['es', 'en'];

    const toggleScroll = (enable) => {
        $body.toggleClass('without-scroll', !enable);
    };

    const getUserLang = () => navigator.language.slice(0, 2);

    const setSelectLang = (lang) => {
        $select.find('option').prop('selected', false);
        $select.find(`option[data-lang="${lang}"]`).prop('selected', true);
    };

    const changeLanguage = async (lang) => {
        try {
            const res = await fetch(`./languages/${lang}.json`);
            const texts = await res.json();

            textsToChange.each(function () {
                const section = $(this).data('section');
                const value = $(this).data('value');
                $(this).html(texts[section][value] || '');
            });
        } catch (e) {
            console.error(`No se pudo cargar el idioma "${lang}"`, e);
        }
    };

    toggleScroll(false);

    const userLang = getUserLang();
    const currentLang = $select.find('option:selected').data('lang');

    if (supportedLangs.includes(userLang) && currentLang !== userLang) {
        setSelectLang(userLang);
    }

    changeLanguage(userLang);
    toggleScroll(true);
    $overlay.remove();

    $select.on('change', function () {
        const selectedLang = $(this).find(':selected').data('lang');
        changeLanguage(selectedLang);
    });
});