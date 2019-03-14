window.onscroll = function() {
    // var tr = document.querySelector('.tableDetals ').querySelector('tbody').querySelectorAll('tr');
    // var first_tr_top = tr[0].getBoundingClientRect().top;
    // var last_tr_pos_bottom = tr[tr.length-1].getBoundingClientRect().bottom;
    // var pag_panel = document.querySelector('.pag-panel');
    // var active_page = parseInt(pag_panel.querySelector('.active').querySelector('a').innerHTML);
    // var html = document.querySelector('html')
    // console.log(last_tr_pos_bottom, html_height);
    
    // if (html_height == last_tr_pos_bottom-1) {
    //     console.log(active_page);
    //     $.ajax({
    //         url: '/lk/detals_list/',
    //         type: 'get',
    //         data: {
    //             'page': active_page+1
    //         },
    //         success: function (data) {
    //             console.log()
    //             var active_page_button = pag_panel.querySelector('.active');
    //             active_page_button.classList.remove('active');
    //             active_page_button.nextSibling.nextElementSibling.classList.add('active');
    //         }
    //     });
    // } else {
    //     console.log();
    // }
}

// Отправка формы при изменении малого фильтра


// Открыть панель выгрузки
$("#upload-ads").click(function() {
    $(".export-panel").addClass('show');
});

// Закрыть панель выгрузки
$("#close-panel").click(function() {
    $('.one-panel-setting').removeClass('show');
    $('.full-info-panel').removeClass('show');
    $(".export-panel").removeClass('show');
});

//Открыть панель ввода логина и пароля для площадки
$(".logo").click(function() {
    $('.one-panel-setting').removeClass('show');
    $($(this).parent()[0]).addClass('show');
});

// Закрыть панель ввода логина и пароля для площадки
$(".hide-button").click(function() {
    $block_site = $(this).parent()[0];
    console.log($block_site.classList[1]);
    $($block_site).removeClass('show');
});

// Открыть панель доп информации
$(".upload-ads-table  > tbody > tr").click(function() {
    $('.full-info-panel').addClass('show');
    $(this).addClass('active');
});

// Закрыть панель доп информации
$(".hide-button").click(function() {
    $('.full-info-panel').removeClass('show');
    $('.upload-ads-table  > tbody > tr').removeClass('active');
});

// Выделение всех деталей
$("input#check-box-all").change(function() {
    if ($(this)[0].checked == true) {
        $("input#check-box-detal").prop('checked', true);
        $(".control-panel").addClass('show');
        var total_checked_price = 0;
        for (var i = 0; i <= $("input#check-box-detal:checked").length-1; i++) {
            total_checked_price = total_checked_price + parseInt(($("input#check-box-detal:checked"))[i].parentElement.parentElement.querySelector('.detal-price').innerHTML.replace("₽", ""));
            $("span.total-select-price")[0].innerHTML = total_checked_price;
            $(".total-select-count")[0].innerHTML = $("input#check-box-detal:checked").length;
            $("#button_add_upload_detals")[0].querySelector('span').innerHTML = $("#check-box-detal:checked").length;
            $("#button_add_upload_detals")[0].removeAttribute('disabled');
        };
    } else {
        $("input#check-box-detal").prop('checked', false);
        $(".control-panel").removeClass('show');
        $("#button_add_upload_detals")[0].querySelector('span').innerHTML = $("#check-box-detal:checked").length;
        $("#button_add_upload_detals")[0].setAttribute('disabled', true);
    }
}); 

// Выделение детали по одной
$("input#check-box-detal").change(function() {
    if ($("#check-box-detal:checked").length > 0) {
        $(".control-panel").addClass('show');
        $("#button_add_upload_detals")[0].removeAttribute('disabled');
        var total_checked_price = 0;
        for (var i = 0; i <= $("#check-box-detal:checked").length-1; i++) {
            total_checked_price = total_checked_price + parseInt(($("input#check-box-detal:checked"))[i].parentElement.parentElement.querySelector('.detal-price').innerHTML.replace("₽", ""));
            $("span.total-select-price")[0].innerHTML = total_checked_price;
            $(".total-select-count")[0].innerHTML = $("input#check-box-detal:checked").length;
            $("#button_add_upload_detals")[0].querySelector('span').innerHTML = $("#check-box-detal:checked").length;
            $("#button_add_upload_detals")[0].removeAttribute('disabled');
        };
    } else {
        $(".control-panel").removeClass('show');
        $("#button_add_upload_detals")[0].querySelector('span').innerHTML = $("#check-box-detal:checked").length;
        $("#button_add_upload_detals")[0].setAttribute('disabled', true);
    }
}); 

// Нажатие на кнопку Выгрузка ... на панели управления
$("#upload-button").click(function() {
    $(".export-panel").addClass('show');
});

// Добавление деталей на выгрузку
$("#button_add_upload_detals").click(function() {
    var all_checked_detals = $("#check-box-detal:checked");
    var all_id_detals = []
    for (var i = 0; i <= all_checked_detals.length-1; i++) {
        all_id_detals.push(all_checked_detals[i].parentElement.parentElement.getAttribute('data-content'));
    }
    console.log(all_id_detals);
    $.ajax({
        url: '/lk/detals_list/',
        type: 'post',
        data: {
            'csrfmiddlewaretoken': csrftoken,
            'type': 'add_to_upload',
            'add_ids': all_id_detals,
        },
        success: function (data) {
            location.reload()
        }
    });
});

// Изменение цены двойным кликом
function edit_price(td) {
    var old_value = td.getElementsByTagName('span')[0].innerHTML;
    td.innerHTML = '<input type="text" id="Edit" class="edit" onchange="save_price(this)" onblur="save_price(this)" value="'+old_value+'">';
    td.getElementsByTagName('input')[0].select();
}
// Сохранение изменений цены
function save_price(input) {
    var tr_vin = input.parentElement;
    console.log(tr_vin);
    tr_vin.innerHTML = '<span>'+input.value+'</span> ₽';
}
// Показать фото детали
function view_detal_photo(img_mini) {
    var full_img = img_mini.parentElement.parentElement.querySelector('.fulImg');
    full_img.classList.add('show');
}
// Скрыть фото
function closePhoto(fulImg) { fulImg.classList.remove('show');}
// Развернуть фильтры
function show_filter(block) {
    var status = document.querySelector('.showfilter');
    var buttonFilter = document.querySelector('.showFilterButton');
    var filter_panel = document.querySelector('.filterBack');

    if (status == null) {
        buttonFilter.classList.add('showfilter');
        filter_panel.classList.add('showfilter');
        block.getElementsByTagName('label')[0].innerHTML = 'Свернуть';
        block.getElementsByTagName('i')[0].setAttribute('class', 'fas fa-angle-double-up fa-lg');
    } else {
        buttonFilter.classList.remove('showfilter');
        filter_panel.classList.remove('showfilter');
        block.getElementsByTagName('label')[0].innerHTML = 'Фильтры';
        block.getElementsByTagName('i')[0].setAttribute('class', 'fas fa-angle-double-down fa-lg');
    }
}
// Добавление имени при выделении
function add_name(input){
    if (input.checked){
        input.setAttribute('name', input.getAttribute('id').split('_')[1])
    } else {
        input.removeAttribute('name')
    }
}
