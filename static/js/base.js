

//после загрузки страницы
window.onload = function(){
	loader('off');
}

// прелоадер
function loader(param) {
	if (param == 'on') {
		document.querySelector('.backLoad').classList.add('show');
		document.querySelector('.cssload-loader').setAttribute('style', 'display: block;');
	} 
	if (param == 'off') {
		document.querySelector('.backLoad').classList.remove('show');
		document.querySelector('.cssload-loader').removeAttribute('style');
	}
}

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
// end

// Loader
function show_loader(){
	document.querySelector('.cssload-loader').setAttribute('style', 'display: block;');
	document.querySelector('.backLoad').classList.add('show');
	document.querySelector('.modal').setAttribute('style', 'display: none');
}

// Меню
// Подпункты
$(document).on('click','#group-menu', function(){
	if (this.parentElement.querySelector('.submenu').getAttribute('style') == null){
		this.parentElement.querySelector('.submenu').setAttribute('style', 'height: 90px');
	} else {
		this.parentElement.querySelector('.submenu').removeAttribute('style');
	}
});


function change_params_donor() {
    $.ajax({
        url: '/lk/detals_list/change_donor_params/',
        type: 'post',
        data: {
            'csrfmiddlewaretoken': csrftoken
        },
        success: function (data) {
            var right_panel = document.querySelector('.right-panel');
            for (var i_param = 0; i_param < data.params.length; i_param++) {
                var name = Object.keys(data.params[i_param])[0];
                var select_param = right_panel.querySelector('#'+name);
                select_param.removeAttribute('disabled');
                console.log(data.params[i_param][name]);
                for (var i_option = 0; i_option < data.params[i_param][name].length; i_option++) {
                    select_param.options[i_option] = new Option(data.params[i_param][name][i_option].title, data.params[i_param][name][i_option].value);
                    if (data.params[i_param][name][i_option].value == 'noselect') {
                        select_param.options[i_option].setAttribute('selected', '');
                    };
                }
            }
        }
    });
}

function clear_options() {
	var selectModel = document.querySelector('#all_models');
	for (i = 0; i < selectModel.options.length; i++) {
		console.log(selectModel.options[i]);
		selectModel.options[i].remove();
	};
}

function add_new_options(data) {
	var selectModel = document.querySelector('#all_models');
	for (var i = 0; i < data.length; i++) {
		selectModel.options[i] = new Option(data[i].name, data[i].id);
	};
}

$(function() {
	$("#all_marks").change(function() {
		var selectMark = document.querySelector('#all_marks');
		$.ajax({
			url:'/lk/detals_list/', 
			type:'POST', 
			data: {
				'type': 'load_cats',
				'cat': 'getModels',
				'mark':  selectMark.options[selectMark.selectedIndex].value,
				'csrfmiddlewaretoken': csrftoken
			}, 
			success: function(res) {
				console.log(res);
				add_new_options(res);
			}
		});
	});
	$("#all_models").change(function() {
		var selectMark = document.querySelector('#all_marks');
		var selectModel = document.querySelector('#all_models');
		var selectGen = document.querySelector('#all_generations');
		$.ajax({
			url:'/lk/detals_list/', 
			type:'POST', 
			data: {
				'type': 'load_cats',
				'cat': 'getCars',
				'mark':  selectMark.options[selectMark.selectedIndex].value,
				'model':  selectModel.options[selectModel.selectedIndex].value,
				'csrfmiddlewaretoken': csrftoken
			}, 
			success: function(data) {
				console.log(data);
				var k = 0
				for (var i = 0; i < data.length; i++) {
					if (data[i].attributegroup == 'General') {
						selectGen.options[k] = new Option(data[i].name + ' ' + data[i].displayvalue, data[i].id);
						k++
					} else {
						continue
					}
				};
			}
		});
	});
});


function load_generations(selectModel) {
	var panel = selectModel.parentElement.parentElement.parentElement;
	$.ajax({
		url: '/lk/add_auto/select_auto/',
		type: 'post',
		data: {
			'selectedModel': selectModel.options[selectModel.selectedIndex].value,
			'csrfmiddlewaretoken': csrftoken
		},
		success: function (data) {
			console.log('done');
			var selectGen = panel.querySelector('#all_generations');
			selectGen.options[0] = new Option(('noselect', 'Все поколения'))
			for (var i = 0; i < data.generations.length; i++) {
				selectGen.options[i+1] = new Option(data.generations[i].title, data.generations[i].value)
			}
		}
	});
}
function donorTabs(newActiveTab) {
	var changeContent = function() {
		 var paramsBlock = document.querySelector('.donorParmas');
		 var photoBlock = document.querySelector('.donorPhoto');
		 if (newActiveTab.getAttribute('data-content') == 'photo') {
		 	photoBlock.classList.add('show');
		 	paramsBlock.classList.remove('show');
		 } else	{
		 	photoBlock.classList.remove('show');
		 	paramsBlock.classList.add('show');
		 }
	}
	var oldActiveTab = newActiveTab.parentElement.querySelector('.active');
	oldActiveTab.classList.remove('active');
	newActiveTab.classList.add('active');
	changeContent();
}
function change_modal_content(changeButton) {
	var modalContent = document.querySelector('.modalcontent');
	if (changeButton.getAttribute('id') == 'open_add_stock_panel') {
		modalContent.querySelector('.stock-create').classList.add('show');
	} else {
		modalContent.querySelector('.stock-create').classList.remove('show');
	}
}

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