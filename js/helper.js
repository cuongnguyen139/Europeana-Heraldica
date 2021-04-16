//get parameter from URL
var getUrlParameter = function getUrlParameter(sParam) {
    //return query string of URI (including ?)
    var sPageURL = window.location.search.substring(1),
        // divides sPageURL String into an ordered list of substrings,
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

//change language of the page
function changeLanguage(lang){
  if (lang !== "en" && lang !== "fr" && lang !== "sv") {
    lang = "fi";
  }

  $.ajax({ 
    url:  './languages/' +  localStorage.getItem('language') + '.json', 
    dataType: 'json', 
    async: false, 
    dataType: 'json', 
    success: function (lang) { 
      arr = lang;
      $('.lang').each(function(index,element){
        $(this).text(arr[$(this).attr('key')]);
      }); 
      $('.lang_alt').each(function(index,element){
        $(this).prop('alt', arr[$(this).attr('key_alt')]);
      });
      $('.lang_title').each(function(index,element){
        $(this).prop("title", arr[$(this).attr('key_title')]);
      });
      $('.lang_aria').each(function(index,element){
        $(this).attr("aria-label", arr[$(this).attr('key_aria')]);
      });
      updateHrefs();
    } 
  });
}
  
//Get image size before it's fully loaded
function getImageSize(img, callback){
  img = $(img);

  var wait = setInterval(function(){        
      var w = img.width(),
          h = img.height();

      if(w && h){
          done(w, h);
      }
  }, 0);

  var onLoad;
  img.on('load', onLoad = function(){
      done(img.width(), img.height());
  });

  var isDone = false;
  function done(){
      if(isDone){
          return;
      }
      isDone = true;

      clearInterval(wait);
      img.off('load', onLoad);

      callback.apply(this, arguments);
  }
}

//set lang attribute for html
function setAttribute(lang) {
  $("html").attr("lang", lang);
}

//link to luettelo page
function luetteloLink(lang) {
  $("#luettelo").attr('href', config.domain + 'luettelo.html?lang=' + lang);
}

//logo link
function logoLink(lang) {
  $("#logoLink").attr('href', config.domain + 'index.html?lang=' + lang);
}

//diplay data as pages
function displayAsPagination(source, hakutuloksia) {
  $(".loader").remove();
  if (lang === "en") {
    $("#hakutuloksia").html('Results: ' + hakutuloksia);
  } else if (lang === "fr") {
    $("#hakutuloksia").html('Résultats: ' + hakutuloksia);
  } else if (lang === "sv") {
    $("#hakutuloksia").html('Träffar: ' + hakutuloksia);
  } else {
    $("#hakutuloksia").html('Hakutuloksia: ' + hakutuloksia);
  }
  
  if (source.length === 0) {
    $('#pagination-container').remove();
  } else {
    $('#pagination-container').pagination({
      dataSource: source,
      pageSize: 100,
      callback: function(data, pagination) {
          var html = "";
          $.each(data, function(index, item){
              html += item;
          });
          $('#aineistot').html(html);
      }
    });
  }
}

$.ajax({
  url: config.domain + "V4/heraldicaLogicLayer/v1/API/lisenssiCc/9",
  type: "GET",
  dataType: "JSON"
})
  .done(function success(lisenssiCc) {
    $("#wikipediaCc").html(lisenssiCc.data.lisenssiCc.selite_html);
  })
  .fail(function error(http,_error) {
      console.log("Some Error Occured : " + _error);
  })

async function termiButton(lang) {
    var heroListLanguageResponse;
    try {
      heroListLanguageResponse = await $.ajax({
          url: config.domain + "V4/heraldicaLogicLayer/v1/API/heroList/1",
          type: "GET",
          dataType: "JSON"
      });
      
      var h = (Math.floor(Math.random() * (heroListLanguageResponse.data.heroList.length-1)) + 1);
      for (var i = 0; i <heroListLanguageResponse.data.heroList.length; i++) {
        if (heroListLanguageResponse.data.heroList[h].id !== 3915) {
          $("#termiSivu").attr('href', config.domain + 'termi.html?id=' + heroListLanguageResponse.data.heroList[h].id + '&lang=' + lang + '&t=' + lang);
        }
        break;
      }
    } catch(e) {
        console.log(e);
    }
}

async function tietojaButton(lang) {
  $("#tietojaSivu").attr("href", config.domain + "tietoja.html?lang=" + lang);
}

async function langButtons(sivu) {
    $("#en").attr('href', config.domain + '' + sivu + '?lang=en');
    $("#fi").attr('href', config.domain + '' + sivu + '?lang=fi');
    $("#sv").attr('href', config.domain + '' + sivu + '?lang=sv');
    $("#fr").attr('href', config.domain + '' + sivu + '?lang=fr');
}

async function etusivuButton(lang) {
    $("#etusivu").attr('href', config.domain + 'index.html?lang=' + lang);
}

async function palauteButton() {
    $("#palaute").attr('href', 'mailto:firstname.lastname@arkisto.fi?subject=Europeana Heraldica -palaute&body=Change in the recipient\'s email address firstname to yrjo and lastname to kotivuori.%20%0D%0AVaihda saajan sähköpostiosoitteesta etunimeksi (firstname) yrjo ja sukunimeksi (lastname) kotivuori.%20%0D%0A%0D%0A' + window.location.href);
}

function nimiCompare(a, b) {
  if (a.nimi < b.nimi){
    return -1;
  }
  if (a.nimi > b.nimi){
    return 1;
  }
  if (a.id < b.id){
    return -1;
  }
  if (a.id > b.id){
    return 1;
  }
  return 0;
}

function enNimiCompare(a, b) {
  if (a.nimi_en < b.nimi_en){
    return -1;
  }
  if (a.nimi_en > b.nimi_en){
    return 1;
  }
  if (a.id < b.id){
    return -1;
  }
  if (a.id > b.id){
    return 1;
  }
  return 0;
}

function svNimiCompare(a, b) {
  if (a.nimi_sv < b.nimi_sv){
    return -1;
  }
  if (a.nimi_sv > b.nimi_sv){
    return 1;
  }
  if (a.id < b.id){
    return -1;
  }
  if (a.id > b.id){
    return 1;
  }
  return 0;
}

function idNimiCompare(a, b) {
  if (a.id < b.id){
    return -1;
  }
  if (a.id > b.id){
    return 1;
  }
  if (a.id < b.id){
    return -1;
  }
  if (a.id > b.id){
    return 1;
  }
  return 0;
}

function txtCompare(a, b) {
  if (a.txt < b.txt){
    return -1;
  }
  if (a.txt > b.txt){
    return 1;
  }
  if (a.id < b.id){
    return -1;
  }
  if (a.id > b.id){
    return 1;
  }
  return 0;
}

function enNimi2Compare(a, b) {
  if (a.en_nimi < b.en_nimi){
    return -1;
  }
  if (a.en_nimi > b.en_nimi){
    return 1;
  }
  if (a.id < b.id){
    return -1;
  }
  if (a.id > b.id){
    return 1;
  }
  return 0;
}

function svNimi2Compare(a, b) {
  if (a.sv_nimi < b.sv_nimi){
    return -1;
  }
  if (a.sv_nimi > b.sv_nimi){
    return 1;
  }
  if (a.id < b.id){
    return -1;
  }
  if (a.id > b.id){
    return 1;
  }
  return 0;
}



// Call this after changing the language
function updateHrefs() {
    var lang = localStorage.getItem('language');
    // index.html
    $("#tarkennettuaHakua").attr('href', config.domain  + 'luettelo.html?lang=' + lang);
    $("#hautajaisvaakuna").attr('href', config.domain  + 'luettelo.html?lang=' + lang + '&hakusana=undefined&f=1505');
    $("#yhteiso").attr('href', config.domain  + 'luettelo.html?lang=' + lang + '&hakusana=undefined&f=1009');
    $("#sijainti").attr('href', config.domain  + 'luettelo.html?lang=' + lang + '&hakusana=undefined&f=1012');
    $("#suku").attr('href', config.domain  + 'luettelo.html?lang=' + lang + '&hakusana=undefined&f=1007');
    $("#henkilo").attr('href', config.domain  + 'luettelo.html?lang=' + lang + '&hakusana=undefined&f=1008');
}
