$(document).ready(function () {

    //---------------------------------------------------------------------
    //Alkumuotoilua

    $(".pallo").addClass("badge", "badge-pill", "badge-white").html(function (i) { return (i + 1) });
    $('.chevron').each(function (i, obj) {
        var suunta = $(this).data("val").split(",");
        $(this).addClass("fas").addClass("fa-chevron-" + suunta[0]);
    });

    //---------------------------------------------------------------------
    //Ohjeikkunat

    $(".ka-ohje").each(function () {
        var ohjediv = $(this).html();
        var target = $(this).data("val");
        var otsikko = $("#" + target).children(".ka-ohjeikkuna-otsikko").html();
        var sisalto = $("#" + target).children(".ka-ohjeikkuna-sisalto").html();
        var html = '<div class="modal fade" id="' + target + '" tabindex="-1" role="dialog" aria-labelledby="' + target + '" aria-hidden="true">';
        html = html + '<div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header">';
        html = html + '<h2 class="modal-title" id="' + target + 'Title">' + otsikko + '</h2>';
        html = html + '<button type="button" class="close lang_aria" key_aria="Sulje" data-dismiss="modal" aria-label="Sulje"><span aria-hidden="true">&times;</span></button>';
        html = html + '</div><div class="modal-body">' + sisalto + '</div><div class="modal-footer">';
        html = html + '<button type="button" class="btn bg-sininen lang" key="Sulje" data-dismiss="modal">Sulje</button>';
        html = html + '</div></div></div></div>';
        $("#" + target).parent().removeClass("piilossa").html(html);
        if (ohjediv == "") {
            ohjediv = '<a data-toggle="modal" href="#' + target + '" class="float-right punainen ohje"><span class="far fa-question-circle"></span>&nbsp;Ohje</a>';
        } else {
            ohjediv = '<a data-toggle="modal" href="#' + target + '" class="float-right punainen ohje"><span class="far fa-question-circle"></span>&nbsp;Ohje</a>' + ohjediv;
        }
        $(this).html(ohjediv);
    });

    //---------------------------------------------------------------------
    //Monivalintabutton, valitse yksi

    $(".ka-monivalinta").click(function () {
        if ($(this).hasClass("buttonValittu")) {
            $(this).removeClass("buttonValittu").attr("aria-pressed", "false");
            $(this).parent().find(".ka-monivalinta-input").val("");
        } else {
            $(this).parent().children(".ka-monivalinta").removeClass("buttonValittu").attr("aria-pressed", "false");
            $(this).addClass("buttonValittu").attr("aria-pressed", "true");
            var arvo = $(this).data("val");
            $(this).parent().find(".ka-monivalinta-input").val(arvo);
        }
    });

    //---------------------------------------------------------------------
    //Monivalintabutton, valitse monta

    $(".ka-monivalinta2").click(function () {
        if ($(this).hasClass("buttonValittu")) {
            $(this).removeClass("buttonValittu").attr("aria-pressed", "false");
            var arvo = $(this).data("val");
            var teksti = $(this).parent().find(".ka-monivalinta-input").val();
            $(this).parent().find(".ka-monivalinta-input").val(teksti.replace(arvo, "").replace(/^,|,$/g, "").replace(/,+/g, ","));
        } else {
            $(this).addClass("buttonValittu").attr("aria-pressed", "true");
            var arvo = $(this).data("val");
            var teksti = $(this).parent().find(".ka-monivalinta-input").val();
            if (teksti != "") {
                teksti = teksti + "," + arvo;
            } else {
                teksti = arvo;
            }
            $(this).parent().find(".ka-monivalinta-input").val(teksti);
        }
    });

    //---------------------------------------------------------------------
    //Monivalintabutton, yksi pakollinen valinta

    $(".ka-monivalinta3").click(function () {
        if (!$(this).hasClass("buttonValittu")) {
            $(this).parent().children(".ka-monivalinta3").removeClass("buttonValittu").attr("aria-pressed", "false");
            $(this).addClass("buttonValittu").attr("aria-pressed", "true");
            var arvo = $(this).data("val");
            $(this).parent().find(".ka-monivalinta-input").val(arvo);
        }
    });

    //---------------------------------------------------------------------
    //Animoitu chevron nuoli

    $(".ka-chevron").click(function () {
        if ($($(this).data('target')).hasClass('collapsing') || $($(this).attr('href')).hasClass('collapsing')) {
            return false;
        }
        var suunnat = $(this).find(".chevron").data("val");
        var suuntalista = suunnat.split(",");
        var suunta = $(this).find(".chevron").attr("class");
        suunta = suunta.replace("chevron fas fa-chevron-", "");
        var index = suuntalista.indexOf(suunta);
        if (index + 1 < suuntalista.length) {
            $(this).find(".chevron").removeClass("fa-chevron-" + suunta).addClass("fa-chevron-" + suuntalista[(index + 1)]);
        } else {
            $(this).find(".chevron").removeClass("fa-chevron-" + suunta).addClass("fa-chevron-" + suuntalista[0]);
        }
    });

    //---------------------------------------------------------------------
    // Sivun sisäissä linkeissä skrollataan navbarin verran alaspäin, ettei linkattu kohta jää sen taakse piiloon.

    // listen for click events originating from elements with href starting with #
    $('body').on('click.scroll-adjust', '[href^="#"]', function (e) {
        var $nav

        // make sure navigation hasn't already been prevented
        if ( e && e.isDefaultPrevented() ) return

        // get a reference to the offending navbar
        $nav = $('nav')

        // check if the navbar is fixed
        if ( $nav.css('position') !== "fixed" ) return

        // listen for when the browser performs the scroll
        $(window).one('scroll', function () {
            // scroll the window up by the height of the navbar
            window.scrollBy(0, -$nav.height()-10)
        });
    });

    //---------------------------------------------------------------------

});
