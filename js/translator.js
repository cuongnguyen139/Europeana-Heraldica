$(function() {
    let lang =localStorage.getItem('language');
    if (lang !== null) {
      changeLanguage(lang);
    }
    //location.reload();
  })

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
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

var langToBeUsed = getUrlParameter('lang');
if (langToBeUsed !== "en" && langToBeUsed !== "fr" && langToBeUsed !== "sv") {
    langToBeUsed = "fi";
}
localStorage.setItem('language', langToBeUsed);
changeLanguage(langToBeUsed);

/* $('.translate').click(function(){
    lang = $(this).attr('id');
    localStorage.setItem('language', lang);
    changeLanguage(lang);
}); */

function changeLanguage(lang){
  if (lang !== "en" && lang !== "fr" && lang !== "sv") {
    lang = "fi";
  }

  //location.reload();
  $.ajax({ 
    url:  './languages/' +  localStorage.getItem('language') + '.json', 
    dataType: 'json', 
    async: false, 
    dataType: 'json', 
    success: function (lang) { 
      arr = lang;
      $('.lang').each(function(index,element){
        $(this).html(arr[$(this).attr('key')]);
      }); 
      $('.lang_alt').each(function(index,element){
        $(this).prop("alt", arr[$(this).attr('key_alt')]);
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

