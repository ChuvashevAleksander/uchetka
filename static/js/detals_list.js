$('.body-table').scroll(function(){
    var active_page = $('li.active')[0].innerHTML;
    var active = $('li.active')[0]
    var next_elem = $('li.active')[0].nextElementSibling
    var old_elem = $('li.active')[0].previousElementSibling

    // переменые фильтров
    var number = $('.small #id_number').val();
    var detal = $('.small #id_detal :selected').text();
    var mark = $('.small #all_marks :selected').text();
    var model = $('.small #all_models :selected').text();
    if (model == null) { var model = 'Все модели'; }
    var gen = $('.small #all_generations :selected').text();
    if (gen == null) { var gen = 'Все поколения'; }
    var stock = $('.small #id_stock').val();
    var stock_param = $('.small #id_stock_param').val();
    var price_min = $('.small #id_price_min').val();
    var price_max = $('.small #id_price_max').val();
    
    if (this.scrollTop==this.scrollHeight-this.clientHeight) {
        // loader('on');
        $.ajax({
            url: '/lk/detals_list/',
            type: 'POST',
            data: {
                'csrfmiddlewaretoken': csrftoken,
                'type': 'load_ajax_page',
                'active_page': active_page,
                'number': number,
                'detal': detal,
                'mark': mark,
                'model': model,
                'generation': gen,
                'stock': stock,
                'stock_param': stock_param,
                'price_min': price_min,
                'price_max': price_max
            },
            success: function (data) {
                for (var i = 0; i <= data.new_detals.length-1; i++) {
                    $("#table-list-detals").append("<tr data-content="+(data.new_detals[i].id)+" id='detal-in-list'><td class='global '><i class='fas fa-globe'></i></td><td class='checkbox'><input id='check-box-detal' type='checkbox'></td><td class='count-num'>"+(active_page*25+i)+"</td><td class='detal-number'>645GH2TD2</td><td class='detal-title'>"+data.new_detals[i].title+"</td><td class='detal-donor'>"+data.new_detals[i].donor.mark+" "+data.new_detals[i].donor.model+" "+data.new_detals[i].donor.generation+"</td><td class='detal-desc'>Описание</td><td class='detal-stock'>"+data.new_detals[i].stockroom+"</td><td class='detal-stock-param'>Ячейка</td><td class='detal-photo'><div class='mini-photo'><img src='/static/img/image_mini.png'></div></td><td class='detal-price'>"+data.new_detals[i].price+"₽</td></tr>");
                };
                active.innerHTML = "<a href='?page="+active_page+"'>"+active_page+"</a>"
                active.classList.remove('active')
                next_elem.innerHTML = parseInt(active_page)+1
                next_elem.classList.add('active')
                // loader('off');
                $(next_elem).after("<li class='not-active'><a href='?page="+(parseInt(next_elem.innerHTML)+1)+"'>"+(parseInt(next_elem.innerHTML)+1)+"</a></li>");
                if (active_page > 1) {
                    old_elem.remove();
                }
            }
        });      
    }
})


////////// Фильтрация ///////////
// Select
$(function() {
    $('.small select').change(function() {
        filter_detals()
    });
});
// input
$(function() {
    $('.small input').change(function() {
        filter_detals()
    });
});

// POST запрос на фильтрацию
function filter_detals() {
    loader('on');
    var number = $('.small #id_number').val();
    var detal = $('.small #id_detal :selected').text();
    var mark = $('.small #all_marks :selected').text();
    var model = $('.small #all_models :selected').text();
    if (model == null) { var model = 'Все модели'; }
    var gen = $('.small #all_generations :selected').text();
    if (gen == null) { var gen = 'Все поколения'; }
    var stock = $('.small #id_stock').val();
    var stock_param = $('.small #id_stock_param').val();
    var price_min = $('.small #id_price_min').val();
    var price_max = $('.small #id_price_max').val();
    $.ajax({
        url:'/lk/detals_list/', 
        type:'POST', 
        data: {
            'type': 'filter_ajax',
            'number': number,
            'detal': detal,
            'mark': mark,
            'model': model,
            'generation': gen,
            'stock': stock,
            'stock_param': stock_param,
            'price_min': price_min,
            'price_max': price_max
        }, 
        success: function(data) {
            if (data.new_detals.length == 0) {
                alert('Нет деталей по заданым фильтрам');
            } else {
                $("#table-list-detals").empty();
                for (var i = 0; i <= data.new_detals.length-1; i++) {
                    $("#table-list-detals").append("<tr data-content="+(data.new_detals[i].id)+" id='detal-in-list'><td class='global '><i class='fas fa-globe'></i></td><td class='checkbox'><input id='check-box-detal' type='checkbox'></td><td class='count-num'></td><td class='detal-number'>645GH2TD2</td><td class='detal-title'>"+data.new_detals[i].title+"</td><td class='detal-donor'>"+data.new_detals[i].donor.mark+" "+data.new_detals[i].donor.model+" "+data.new_detals[i].donor.generation+"</td><td class='detal-desc'>Описание</td><td class='detal-stock'>"+data.new_detals[i].stockroom+"</td><td class='detal-stock-param'>Ячейка</td><td class='detal-photo'><div class='mini-photo'><img src='/static/img/image_mini.png'></div></td><td class='detal-price'>"+data.new_detals[i].price+"₽</td></tr>");
                };           
            }
            loader('off');
        }
    });
}

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
$(".upload-ads-table  > tbody > tr").click(function(e) {
    if (!$(e.target).is('i')) { // игнорировать если кликнули чекбокс
        $('.full-info-panel').addClass('show');
        $(this).addClass('active');
    }
});

// Закрыть панель доп информации
$(".hide-button").click(function() {
    $('.full-info-panel').removeClass('show');
    $('.upload-ads-table  > tbody > tr').removeClass('active');
});

// Показать фото детали
$(".mini-photo").click(function() {
    $('.backLoad').addClass('show');
    $('.full-photo').addClass('show');
});

// Скрыть фото детали
$(".close-button").click(function() {
    $($(this).parent()[0]).removeClass('show');
    $('.backLoad').removeClass('show');
});

// Нажатие на кнопку Выгрузка ... на панели управления
$("#upload-button").click(function() {
    $(".export-panel").addClass('show');
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



// Добавление деталей на выгрузку
$("#button_add_upload_detals").click(function() {
    loader('on');
    var all_checked_detals = $("#check-box-detal:checked");
    var all_id_detals = []
    for (var i = 0; i <= all_checked_detals.length-1; i++) {
        all_id_detals.push(all_checked_detals[i].parentElement.parentElement.getAttribute('data-content'));
    }
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

// Удалить деталь из списка выгрузки
$("td.delete").click(function() {
    loader('on');
    var tr_delete = $($(this).parent()[0])
    var id_delete = $($(this).parent()[0])[0].getAttribute('data-content');
    $.ajax({
        url: '/lk/detals_list/',
        type: 'post',
        data: {
            'csrfmiddlewaretoken': csrftoken,
            'type': 'delete_in_upload',
            'delete_id': id_delete,
        },
        success: function (data) {
            tr_delete[0].remove();
            loader('off');
            $('[data-content = '+id_delete+']')[0].querySelector('.global').classList.remove('on');
        }
    });
});

// Очистить список выгрузки
$("#clear_list_upload").click(function() {
    loader('on');
    var all_tr = $('.upload-tr')
    var all_delete_id = []
    for (var i = 0; i <= all_tr.length-1; i++) {
        all_delete_id.push(all_tr[i].getAttribute('data-content'));
    }
    $.ajax({
        url: '/lk/detals_list/',
        type: 'post',
        data: {
            'csrfmiddlewaretoken': csrftoken,
            'type': 'clear_upload_list',
            'all_delete_id': all_delete_id,
        },
        success: function (data) {
            for (var i = 0; i <= all_tr.length-1; i++) {
                try {
                    all_tr[i].remove();
                    $('[data-content = '+all_delete_id[i]+']')[0].querySelector('.global').classList.remove('on');
                } catch (err) {
                    continue
                }
            }
            loader('off');
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
