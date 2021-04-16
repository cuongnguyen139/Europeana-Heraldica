"use strict";

//get language from URL
var lang = getUrlParameter('lang');
if (lang === undefined) {
    lang = "fi";
}
if (lang !== "en" && lang !== "fr" && lang !== "sv") {
    lang = "fi";
}

//termi button
termiButton(lang);

//tietoja button
tietojaButton(lang);

//changing languages when clicking taskbar
langButtons("index.html");

//etusivu button
etusivuButton(lang);

//palaute button
palauteButton();

$("#aineistoLink").attr('href', config.domain + 'luettelo.html?hakusana=undefined&f=1601&lang=' + lang);
$("#ilmentymaLink").attr('href', config.domain + 'luettelo.html?hakusana=undefined&f=1602&lang=' + lang);
$("#toimijaLink").attr('href', config.domain + 'luettelo.html?hakusana=undefined&f=1604&lang=' + lang);

$('#haku-form').submit(function(event) {
    event.preventDefault();
    window.location.href= config.domain + 'luettelo.html?lang=' + lang + '&hakusana=' + $('input[name=text]').val();
})

$("#luettelo1").attr('href', config.domain + 'luettelo.html?lang=' + lang);
$("#luettelo2").attr('href', config.domain + 'luettelo.html?lang=' + lang);


async function aneistoKuva(lang) {
    while (true) {
        var randomAineistoResponse;
        try {
            randomAineistoResponse = await $.ajax({
                url: config.domain + "V4/heraldicaLogicLayer/v1/API/randomAineisto/",
                type: "GET",
                dataType: "JSON"
            });
            if (randomAineistoResponse.data.aineisto.polku_txt !== null) {
                if (randomAineistoResponse.data.aineisto.thumb === 1) {
                    $('#aineistoImage').html('<a href="' + config.domain + 'aineisto.html?id=' + randomAineistoResponse.data.aineisto.id + '&lang=' + lang + '"><img src="img/' + randomAineistoResponse.data.aineisto.polku_txt.replace("//", "/") + 'thumb/' + randomAineistoResponse.data.aineisto.iso_kuva + '" alt="Kuvalinkki satunnaiseen vaakunaan" class="lang_alt" key_alt="SatunnainenVaakuna" style="width: 116px"></a>');
                } else {
                    $('#aineistoImage').html('<a href="' + config.domain + 'aineisto.html?id=' + randomAineistoResponse.data.aineisto.id + '&lang=' + lang + '"><img src="img/' + randomAineistoResponse.data.aineisto.polku_txt.replace("//", "/") + randomAineistoResponse.data.aineisto.iso_kuva + '" alt="Kuvalinkki satunnaiseen vaakunaan" class="lang_alt" key_alt="SatunnainenVaakuna" style="width: 116px"></a>');
                }
                changeLanguage(lang);
                break;
            }
        } catch(e) {
            console.log(e);
        }   
    }
}

async function ilmentymaKuva(lang) {
    while (true) {
        var randomIlmentymaResponse;
        try {
            randomIlmentymaResponse = await $.ajax({
                url: config.domain + "V4/heraldicaLogicLayer/v1/API/randomIlmentyma/",
                type: "GET",
                dataType: "JSON"
            });
            if (randomIlmentymaResponse.data.ilmentyma.polku_txt !== null) {
                if (randomIlmentymaResponse.data.ilmentyma.thumb === 1) {
                    $('#ilmentymaImage').html('<a href="' + config.domain + 'ilmentyma.html?id=' + randomIlmentymaResponse.data.ilmentyma.id + '&lang=' + lang + '"><img src="img/' + randomIlmentymaResponse.data.ilmentyma.polku_txt.replace("//", "/") + 'thumb/' + randomIlmentymaResponse.data.ilmentyma.iso_kuva + '" alt="Kuvalinkki satunnaiseen ilmentymään" class="lang_alt" key_alt="SatunnainenIlmentyma" style="width: 116px"></a>');
                } else {
                    $('#ilmentymaImage').html('<a href="' + config.domain + 'ilmentyma.html?id=' + randomIlmentymaResponse.data.ilmentyma.id + '&lang=' + lang + '"><img src="img/' + randomIlmentymaResponse.data.ilmentyma.polku_txt.replace("//", "/") + randomIlmentymaResponse.data.ilmentyma.iso_kuva + '" alt="Kuvalinkki satunnaiseen ilmentymään" class="lang_alt" key_alt="SatunnainenIlmentyma" style="width: 116px"></a>');
                }
                changeLanguage(lang);
                break;
            }
        } catch(e) {
            console.log(e);
        }   
    }
}

async function toimijaKuva(lang, paanimi, alanimi) {
    //while (true) {
        var randomToimijaResponse;
        try {
            randomToimijaResponse = await $.ajax({
                url: config.domain + "V4/heraldicaLogicLayer/v1/API/randomToimija/",
                type: "GET",
                dataType: "JSON"
            });

            $('#toimijaImage').html(
            '<div class="container d-flex h-100 text-center border-right" style="width: 116px; height: 128px">' +
                '<div class="row justify-content-center align-self-center">' +
                '<a href="' + config.domain + 'toimija.html?id=' + randomToimijaResponse.data.toimija.id + '&lang=' + lang + '">' + (randomToimijaResponse.data.toimija[alanimi] ? randomToimijaResponse.data.toimija[alanimi] : "") + " " + (randomToimijaResponse.data.toimija[paanimi] ? randomToimijaResponse.data.toimija[paanimi] : "")  + '</a>' +
                '</div>' +
            '</div>'
            ); 
            
        } catch(e) {
            console.log(e);
        }   
    //}
}

//english page
if (lang === "en") {
    setAttribute("en");
    luetteloLink("en");
    logoLink("en");
    aneistoKuva("en");  
    ilmentymaKuva("en");
    toimijaKuva("en", "paanimi_english", "alanimi_english");
} 

//french page
else if (lang === "fr") {
    setAttribute("fr");
    luetteloLink("fr");
    logoLink("fr");
    aneistoKuva("fr");
    ilmentymaKuva("fr");
    toimijaKuva("fr", "paanimi_english", "alanimi_english");
} 

//swedish page
else if (lang === "sv") {
    setAttribute("sv");
    luetteloLink("sv");
    logoLink("sv");
    aneistoKuva("sv");
    ilmentymaKuva("sv");
    toimijaKuva("sv", "paanimi_svenska", "alanimi_svenska");
} 

//finnish page
else {
    setAttribute("fi");
    luetteloLink("fi");
    logoLink("fi");
    aneistoKuva("fi");
    ilmentymaKuva("fi");
    toimijaKuva("fi", "paanimi", "alanimi");
}

updateHrefs();


