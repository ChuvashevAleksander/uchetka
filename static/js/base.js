// No edit, this for POST
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
}
function csrfSafeMethod(method) { return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)); }
var csrftoken = getCookie('csrftoken');
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
//////////  END ////////////




//после загрузки страницы
window.onload = function(){
	loader('off');
}

// прелоадер
function loader(param) {
	if (param == 'on') {
		$('.backLoad').addClass('show');
		$('.cssload-loader').addClass('show');
	} 
	if (param == 'off') {
		$('.backLoad').removeClass('show');
		$('.cssload-loader').removeClass('show');
	}
}


//////// Меню ////////


// Подпункты
$(document).on('click','#group-menu', function(){
	if (this.parentElement.querySelector('.submenu').getAttribute('style') == null){
		this.parentElement.querySelector('.submenu').setAttribute('style', 'height: 90px');
	} else {
		this.parentElement.querySelector('.submenu').removeAttribute('style');
	}
});

$(function() {
	$("select#all_marks").change(function() {
		var select_mark = $(this);
		var select_model = select_mark[0].parentElement.nextElementSibling.querySelector('#all_models');
		var select_gen = select_model.parentElement.nextElementSibling.querySelector('#all_generations');
		$(select_model).empty();
		$(select_model).append( $('<option value="noselect">Все модели</option>'));
		$(select_model).attr('disabled','disabled');
		$(select_gen).empty();
		$(select_gen).append( $('<option value="noselect">Все поколения</option>'));
		$(select_gen).attr('disabled','disabled');
		$.ajax({
			url:'/lk/load_cat/', 
			type:'POST', 
			data: {
				'cat': 'getModels',
				'mark': $(select_mark, ':selected').val(),
				'csrfmiddlewaretoken': csrftoken
			}, 
			success: function(data) {
				$(select_gen).append( $('<option value="noselect">Все поколения</option>'));
				if ($(select_mark, ':selected').val() != 'noselect') {
					for (var i = 0; i < data.length; i++) {
						$(select_model).append( $('<option value="'+data[i].id+'">'+data[i].name+'</option>'));
					}
					$(select_model).removeAttr('disabled');
				}
			}
		});
	});
});

$(function() {
	$("select#all_models").change(function() {
		var select_model = $(this);
		var select_mark = select_model[0].parentElement.previousElementSibling.querySelector('#all_marks');
		var select_gen = select_model[0].parentElement.nextElementSibling.querySelector('#all_generations');
		$(select_gen).empty();
		$(select_gen).append( $('<option value="noselect">Все поколения</option>'));
		$(select_gen).attr('disabled','disabled');
		$.ajax({
			url:'/lk/load_cat/', 
			type:'POST', 
			data: {
				'cat': 'getCars',
				'mark':  $(select_mark, ':selected').val(),
				'model':  $(select_model, ':selected').val(),
				'csrfmiddlewaretoken': csrftoken
			}, 
			success: function(data) {
				if ($(select_model, ':selected').val() != 'noselect') {
					for (var i = 0; i < data.length; i++) {
						if (data[i].attributegroup == 'General') {
							$(select_gen).append( $('<option value="'+data[i].id+'">'+data[i].name+'</option>'));
						} else {
							continue
						}
					};
					$(select_gen).removeAttr('disabled');
				} 				
			}
		});
	});
});




function not_permissions() {
	document.querySelector('.alert-message').innerHTML = 'Недостаточно прав!';
	document.querySelector('.alert-window').classList.add('error');
	document.querySelector('.alert-window').classList.add('show');
}

function close_alert(i) { i.parentElement.parentElement.classList.remove('show'); }
function auto_close_alert() {
	setTimeout(
		function(){
			document.querySelector('.alert-window').classList.add('transparent');
		}, 3500
	);  
	setTimeout(
		function(){
			document.querySelector('.alert-window').classList.remove('show');
		}, 5500
	);
	document.querySelector('.alert-window').classList.remove('transparent');	
}
