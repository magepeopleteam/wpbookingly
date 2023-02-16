function mp_price_format(price) {
	price = price.toFixed(mp_num_of_decimal);
	let total_part = price.toString().split(".");
	total_part[0] = total_part[0].replace(/\B(?=(\d{3})+(?!\d))/g, mp_currency_thousands_separator);
	price = total_part.join(mp_currency_decimal);
	let price_text = '';
	if (mp_currency_position === 'right') {
		price_text = price + mp_currency_symbol;
	} else if (mp_currency_position === 'right_space') {
		price_text = price + '&nbsp;' + mp_currency_symbol;
	} else if (mp_currency_position === 'left') {
		price_text = mp_currency_symbol + price;
	} else {
		price_text = mp_currency_symbol + '&nbsp;' + price;
	}
	return price_text;
}

//loader
function dLoader(target) {
	if (target.find('div[class*="dLoader"]').length < 1) {
		target.addClass('pRelative').append('<div class="dLoader"><span class="fas fa-spinner fa-pulse"></span></div>');
	}
}

function dLoader_xs(target) {
	if (target.find('div[class*="dLoader"]').length < 1) {
		target.addClass('pRelative').append('<div class="dLoader_xs"><span class="fas fa-spinner fa-pulse"></span></div>');
	}
}

function simpleSpinner(target) {
	if (target.find('div[class*="simpleSpinner"]').length < 1) {
		target.addClass('pRelative').append('<div class="simpleSpinner"><span class="fas fa-spinner fa-pulse"></span></div>');
	}
}

function simpleSpinnerRemove(target = jQuery('body')) {
	target.removeClass('noScroll');
	target.removeClass('pRelative').find('div[class*="simpleSpinner"]').remove();
}

function dLoaderBody() {
	let body = jQuery('body');
	if (body.find('div[class*="dLoader"]').length < 1) {
		body.addClass('noScroll').append('<div class="dLoader pFixed"><span class="fas fa-spinner fa-pulse"></span></div>');
	}
}

function dLoaderBody_xs() {
	let body = jQuery('body');
	if (body.find('div[class*="dLoader"]').length < 1) {
		body.addClass('noScroll').append('<div class="dLoader_xs pFixed"><span class="fas fa-spinner fa-pulse"></span></div>');
	}
}

function dLoader_circle(target) {
	if (target.find('div[class*="dLoader"]').length < 1) {
		target.addClass('pRelative').append('<div class="dLoader border_spin_loader"><span class="circle"></span></div>');
	}
}

function dLoader_xs_circle(target) {
	if (target.find('div[class*="dLoader"]').length < 1) {
		target.addClass('pRelative').append('<div class="dLoader_xs border_spin_loader"><span class="circle"></span></div>');
	}
}

function dLoaderRemove(target = jQuery('body')) {
	target.removeClass('noScroll');
	target.removeClass('pRelative').find('div[class*="dLoader"]').remove();
}

function placeholderLoader(target) {
	target.addClass('placeholderLoader');
}

function placeholderLoaderRemove(target) {
	target.each(function () {
		target.removeClass('placeholderLoader');
	})
}

function pageScrollTo(target) {
	jQuery('html, body').animate({
		scrollTop: target.offset().top -= 100
	}, 1000);
}

function mp_load_date_picker() {
	jQuery(".mpStyle .date_type").datepicker({
		dateFormat: mp_date_format,
		autoSize: true,
		onSelect: function (dateString, data) {
			let date = data.selectedYear + '-' + (parseInt(data.selectedMonth) + 1) + '-' + data.selectedDay;
			jQuery(this).closest('label').find('input[type="hidden"]').val(date).trigger('change');
		}
	});
}

//==========Load initial=================//
(function ($) {
	"use strict";
	$(document).ready(function () {
		mp_load_date_picker();
		$('.mp_select2').select2({});
	});
}(jQuery));

//==========Load Bg Image=================//
function loadBgImage() {
	jQuery('body').find('[data-bg-image]:visible').each(function () {
		let target = jQuery(this);
		let height = target.outerWidth() * 2 / 3;
		if (target.css('background-image') === 'none') {
			target.css({"min-height": height});
			let bg_url = target.data('bg-image');
			if (!bg_url || bg_url.width === 0 || bg_url.width === 'undefined') {
				bg_url = mp_empty_image_url;
			}
			target.css('background-image', 'url("' + bg_url + '")').promise().done(function () {
				dLoaderRemove(jQuery(this));
			});
		}
	});
	return true;
}

(function ($) {
	let bg_image_load = false;
	$(document).ready(function () {
		$('body').find('[data-bg-image]').each(function () {
			dLoader($(this));
		});
		$(window).on('load', function () {
			load_initial();
		});
		if (!bg_image_load) {
			load_initial();
			$(document).scroll(function () {
				load_initial();
			});
		}
	});
	$(document).on('click', '[data-href]', function () {
		let href = $(this).data('href');
		if (href) {
			window.location.href = href;
		}
	});
	$(window).on('load , resize', function () {
		$('body').find('[data-bg-image]:visible').each(function () {
			let target = $(this);
			let height = target.outerWidth() * 2 / 3;
			target.css({"min-height": height, "height": height});
		});
	});

	function load_initial() {
		if (!bg_image_load) {
			if (loadBgImage()) {
				bg_image_load = true;
				placeholderLoaderRemove($('.mpStyle.placeholderLoader'))
			}
		}
	}
}(jQuery));

//==========Change icon and text=================//
function content_icon_change(currentTarget) {
	let openIcon = currentTarget.data('open-icon');
	let closeIcon = currentTarget.data('close-icon');
	if (openIcon || closeIcon) {
		currentTarget.find('[data-icon]').toggleClass(closeIcon).toggleClass(openIcon);
	}
}

function content_text_change(currentTarget) {
	let openText = currentTarget.data('open-text');
	let closeText = currentTarget.data('close-text');
	if (openText || closeText) {
		let text = currentTarget.find('[data-text]').html();
		if (openText !== text) {
			currentTarget.find('[data-text]').html(openText);
		} else {
			currentTarget.find('[data-text]').html(closeText);
		}
	}
}

function content_class_change(currentTarget) {
	let clsName = currentTarget.data('add-class');
	if (clsName) {
		currentTarget.toggleClass(clsName);
	}
}

function content_input_value_change(currentTarget) {
	currentTarget.find('[data-value]').each(function () {
		let value = jQuery(this).val();
		if (value) {
			jQuery(this).val('');
		} else {
			jQuery(this).val(jQuery(this).data('value'));
		}
	});
}

function mp_all_content_change($this) {
	loadBgImage();
	content_class_change($this);
	content_icon_change($this);
	content_text_change($this);
	content_input_value_change($this);
}

(function ($) {
	"use strict";
	$(document).on('click', '[data-all-change]', function () {
		mp_all_content_change($(this));
	});
	$(document).on('click', '[data-icon-change]', function () {
		content_icon_change($(this));
	});
	$(document).on('click', '[data-text-change]', function () {
		content_text_change($(this));
	});
	$(document).on('click', '[data-class-change]', function () {
		content_class_change($(this));
	});
	$(document).on('click', '[data-value-change]', function () {
		content_input_value_change($(this));
	});
	$(document).on('keyup change', '.mpStyle [data-input-text]', function () {
		let input_value = $(this).val();
		let input_id = $(this).data('input-text');
		$("[data-input-change='" + input_id + "']").each(function () {
			$(this).html(input_value);
		});
	});
	$(document).on('keyup change', '.mpStyle [data-target-same-input]', function () {
		let input_value = $(this).val();
		let input_id = $(this).data('target-same-input');
		$("[data-same-input='" + input_id + "']").each(function () {
			$(this).val(input_value);
		});
	});
}(jQuery));
//===========Tabs================//
(function ($) {
	"use strict";
	$(document).ready(function () {
		$('.mpStyle .mpTabs').each(function () {
			let tabLists = $(this).find('.tabLists:first');
			let activeTab = tabLists.find('[data-tabs-target].active');
			let targetTab = activeTab.length > 0 ? activeTab : tabLists.find('[data-tabs-target]').first();
			targetTab.trigger('click');
		});
	});
	$(document).on('click', '.mpStyle [data-tabs-target]', function () {
		if (!$(this).hasClass('active')) {
			let tabsTarget = $(this).data('tabs-target');
			let parent = $(this).closest('.mpTabs');
			parent.height(parent.height());
			let tabLists = $(this).closest('.tabLists');
			let tabsContent = parent.find('.tabsContent:first');
			tabLists.find('[data-tabs-target].active').each(function () {
				$(this).removeClass('active').promise().done(function () {
					mp_all_content_change($(this))
				});
			});
			$(this).addClass('active').promise().done(function () {
				mp_all_content_change($(this))
			});
			tabsContent.children('[data-tabs="' + tabsTarget + '"]').slideDown(350);
			tabsContent.children('[data-tabs].active').slideUp(350).removeClass('active').promise().done(function () {
				tabsContent.children('[data-tabs="' + tabsTarget + '"]').addClass('active').promise().done(function () {
					//dLoaderRemove(tabsContent);
					loadBgImage();
					parent.height('auto');
				});
			});
		}
	});
}(jQuery));
//==========Collapse=================//
(function ($) {
	"use strict";
	$(document).on('click', '[data-collapse-target]', function () {
		let currentTarget = $(this);
		let target_id = currentTarget.data('collapse-target');
		let close_id = currentTarget.data('close-target');
		let target = $('[data-collapse="' + target_id + '"]');
		if (target_close(close_id, target_id) && collapse_close_inside(currentTarget) && target_collapse(target, currentTarget)) {
			mp_all_content_change(currentTarget);
		}
		loadBgImage();
	});
	$(document).on('change', 'select[data-collapse-target]', function () {
		let currentTarget = $(this);
		let value = currentTarget.val();
		currentTarget.find('option').each(function () {
			let current_value = $(this).val();
			let target_id = $(this).data('option-target');
			let target = $('[data-collapse="' + target_id + '"]');
			if (current_value === value) {
				target.slideDown(250).removeClass('mActive');
			} else {
				target.slideUp(250).removeClass('mActive');
			}
		});
	});

	function target_close(close_id, target_id) {
		$('body').find('[data-close="' + close_id + '"]:not([data-collapse="' + target_id + '"])').slideUp(250);
		return true;
	}

	function target_collapse(target, $this) {
		if ($this.is('[type="radio"]')) {
			target.slideDown(250);
		} else {
			target.each(function () {
				$(this).slideToggle(250).toggleClass('mActive');
			});
		}
		return true;
	}

	function collapse_close_inside(currentTarget) {
		let parent_target_close = currentTarget.data('collapse-close-inside');
		if (parent_target_close) {
			$(parent_target_close).find('[data-collapse]').each(function () {
				if ($(this).hasClass('mActive')) {
					let collapse_id = $(this).data('collapse');
					let target_collapse = $('[data-collapse-target="' + collapse_id + '"]');
					if (collapse_id !== currentTarget.data('collapse-target')) {
						$(this).slideUp(250).removeClass('mActive');
						let clsName = target_collapse.data('add-class');
						if (clsName) {
							target_collapse.removeClass(clsName);
						}
						content_text_change(target_collapse);
						content_icon_change(target_collapse);
					}
				}
			})
		}
		return true;
	}
}(jQuery));
//==========Group Check box==========//
(function ($) {
	"use strict";
	$(document).on('click', '.groupCheckBox .customCheckboxLabel', function () {
		let parent = $(this).closest('.groupCheckBox');
		let value = '';
		let separator = ',';
		parent.find(' input[type="checkbox"]').each(function () {
			if ($(this).is(":checked")) {
				let currentValue = $(this).attr('data-checked');
				value = value + (value ? separator : '') + currentValue;
			}
		}).promise().done(function () {
			parent.find('input[type="hidden"]').val(value);
		});
	});
	// radio
	$(document).on('click', '[data-radio]', function () {
		let target = $(this).closest('label');
		let value = $(this).attr('data-radio');
		target.find('.customRadio').removeClass('active');
		$(this).addClass('active');
		target.find('input').val(value).trigger('change');
	});
	$(document).on('click', '.groupRadioBox [data-group-radio]', function () {
		let parent = $(this).closest('.groupRadioBox');
		let $this = $(this);
		let value = $this.data('group-radio');
		parent.find('[data-group-radio]').each(function () {
			$(this).removeClass('active');
		}).promise().done(function () {
			$this.addClass('active');
			parent.find('input[type="text"]').val(value);
		});
	});
	//Group radio like checkbox
	$(document).on('click', '.groupRadioCheck [data-radio-check]', function (e) {
		//e.stopPropagation();
		let parent = $(this).closest('.groupRadioCheck');
		let $this = $(this);
		if (!$this.hasClass('mpActive')) {
			let value = $this.data('radio-check');
			parent.find('.mpActive[data-radio-check]').each(function () {
				$(this).removeClass('mpActive');
				mp_all_content_change($(this));
			}).promise().done(function () {
				$this.addClass('mpActive');
				mp_all_content_change($this);
				parent.find('input[type="hidden"]').val(value).trigger('change');
			});
		}
	});
}(jQuery));
//=========validation ==============//
(function ($) {
	"use strict";
	$(document).on('keyup change', '.mpStyle .mp_number_validation', function () {
		let n = $(this).val();
		$(this).val(n.replace(/\D/g, ''));
		return true;
	});
	$(document).on('keyup change', '.mpStyle .mp_price_validation', function () {
		let n = $(this).val();
		$(this).val(n.replace(/[^\d.]/g, ''));
		return true;
	});
	$(document).on('keyup change', '.mpStyle .mp_name_validation', function () {
		let n = $(this).val();
		$(this).val(n.replace(/[@%'":;&_]/g, ''));
		return true;
	});
}(jQuery));

//==========pagination==========//
function mp_pagination_page_management(parent, pagination_page, total_item) {
	let per_page_item = parseInt(parent.find('input[name="pagination_per_page"]').val());
	let total_active_page = Math.floor(total_item / per_page_item) + ((total_item % per_page_item) > 0 ? 1 : 0);
	let page_limit_start = (pagination_page > 2) ? (pagination_page - 2) : 0;
	let page_limit_end = (pagination_page > 2) ? (pagination_page + 2) : 4;
	let limit_dif = total_active_page - pagination_page;
	if (total_active_page > 5 && limit_dif < 3) {
		page_limit_start = page_limit_start - ((limit_dif > 1) ? 1 : 2);
	}
	let total_page = parent.find('[data-pagination]').length;
	for (let i = 0; i < total_page; i++) {
		if (i < total_active_page && i >= page_limit_start && i <= page_limit_end) {
			parent.find('[data-pagination="' + i + '"]').slideDown(200);
		} else {
			parent.find('[data-pagination="' + i + '"]').slideUp(200);
		}
	}
	if (pagination_page > 0) {
		parent.find('.page_prev').removeAttr('disabled');
	} else {
		parent.find('.page_prev').prop('disabled', true);
	}
	if (pagination_page > 2 && total_active_page > 5) {
		parent.find('.ellipse_left').slideDown(200);
	} else {
		parent.find('.ellipse_left').slideUp(200);
	}
	if (pagination_page < total_active_page - 3 && total_active_page > 5) {
		parent.find('.ellipse_right').slideDown(200);
	} else {
		parent.find('.ellipse_right').slideUp(200);
	}
	if (pagination_page < total_active_page - 1) {
		parent.find('.page_next').removeAttr('disabled');
	} else {
		parent.find('.page_next').prop('disabled', true);
	}
	return true;
}

(function ($) {
	"use strict";
	$(document).on('click', '.pagination_area .page_prev', function (e) {
		e.preventDefault();
		let parent = $(this).closest('.pagination_area');
		let page_no = parseInt(parent.find('.active_pagination').data('pagination')) - 1;
		parent.find('[data-pagination="' + page_no + '"]').trigger('click');
	});
	$(document).on('click', '.pagination_area .page_next', function (e) {
		e.preventDefault();
		let parent = $(this).closest('.pagination_area');
		let page_no = parseInt(parent.find('.active_pagination').data('pagination')) + 1;
		parent.find('[data-pagination="' + page_no + '"]').trigger('click');
	});
}(jQuery));
//==========Modal / Popup==========//
(function ($) {
	"use strict";
	$(document).on('click', '.mpStyle [data-target-popup]', function () {
		let target = $(this).data('target-popup');
		$('body').addClass('noScroll').find('[data-popup="' + target + '"]').addClass('in').promise().done(function () {
			loadBgImage();
			return true;
		});
		return false;
	});
	$(document).on('click', '.mpStyle .mpPopup  .popupClose', function () {
		$(this).closest('[data-popup]').removeClass('in');
		$('body').removeClass('noScroll');
		return true;
	});
	$(document).click(function (e) {
		let target = $(e.target);
		let popup = target.closest('[data-popup]');
		if (popup.length > 0) {
			let hLength = target.closest('.popupHeader').length;
			let bLength = target.closest('.popupBody').length;
			let fLength = target.closest('.popupFooter').length;
			if (hLength === 0 && bLength === 0 && fLength === 0) {
				popup.find('.popupClose').trigger('click');
			}
		}
	});
}(jQuery));
//==========Slider=================//
(function ($) {
	"use strict";
	//=================initial call============//
	$('.superSlider').each(function () {
		sliderItemActive($(this), 1);
	});
	//==============Slider===================//
	$(document).on('click', '.superSlider [data-slide-target]', function () {
		if (!$(this).hasClass('activeSlide')) {
			let activeItem = $(this).data('slide-target');
			let parent = $(this).closest('.superSlider');
			sliderItemActive(parent, activeItem);
			parent.find('[data-slide-target]').removeClass('activeSlide');
			$(this).addClass('activeSlide');
		}
	});
	$(document).on('click', '.superSlider .iconIndicator', function () {
		let parent = $(this).closest('.superSlider');
		let activeItem = parseInt(parent.find('.sliderAllItem').first().find('.sliderItem.activeSlide').data('slide-index'));
		if ($(this).hasClass('nextItem')) {
			++activeItem;
		} else {
			--activeItem;
		}
		sliderItemActive(parent, activeItem);
	});

	function sliderItemActive(parent, activeItem) {
		let itemLength = parent.find('.sliderAllItem').first().find('[data-slide-index]').length;
		let currentItem = getSliderItem(parent, activeItem);
		let activeCurrent = parseInt(parent.find('.sliderAllItem').first().find('.sliderItem.activeSlide').data('slide-index'));
		let i = 1;
		for (i; i <= itemLength; i++) {
			let target = parent.find('.sliderAllItem').first().find('[data-slide-index="' + i + '"]').first();
			if (i < currentItem && currentItem !== 1) {
				sliderClassControl(target, currentItem, activeCurrent, 'prevSlider', 'nextSlider');
			}
			if (i === currentItem) {
				parent.find('.sliderAllItem').first().find('[data-slide-index="' + currentItem + '"]').removeClass('prevSlider nextSlider').addClass('activeSlide');
			}
			if (i > currentItem && currentItem !== itemLength) {
				sliderClassControl(target, currentItem, activeCurrent, 'nextSlider', 'prevSlider');
			}
			if (i === itemLength && itemLength > 1) {
				if (currentItem === 1) {
					target = parent.find('.sliderAllItem').first().find('[data-slide-index="' + itemLength + '"]');
					sliderClassControl(target, currentItem, activeCurrent, 'prevSlider', 'nextSlider');
				}
				if (currentItem === itemLength) {
					target = parent.find('.sliderAllItem').first().find('[data-slide-index="1"]');
					sliderClassControl(target, currentItem, activeCurrent, 'nextSlider', 'prevSlider');
				}
			}
		}
	}

	function sliderClassControl(target, currentItem, activeCurrent, add_class, remove_class) {
		if (target.hasClass('activeSlide')) {
			if (currentItem > activeCurrent) {
				target.removeClass('activeSlide').addClass(add_class);
			} else {
				target.removeClass('activeSlide').removeClass(remove_class).addClass(add_class);
			}
		} else if (target.hasClass(remove_class)) {
			target.removeClass(remove_class).delay(600).addClass(add_class);
		} else {
			if (!target.hasClass(add_class)) {
				target.addClass(add_class);
			}
		}
	}

	function getSliderItem(parent, activeItem) {
		let itemLength = parent.find('.sliderAllItem').first().find('[data-slide-index]').length;
		activeItem = activeItem < 1 ? itemLength : activeItem;
		activeItem = activeItem > itemLength ? 1 : activeItem;
		return activeItem;
	}

	//popup
	$(document).on('click', '.superSlider [data-target-popup]', function () {
		let target = $(this).data('target-popup');
		let activeItem = $(this).data('slide-index');
		$('body').addClass('noScroll').find('[data-popup="' + target + '"]').addClass('in').promise().done(function () {
			sliderItemActive($(this), activeItem);
			loadBgImage();
		});
	});
	$(document).on('click', '.superSlider .popupClose', function () {
		$(this).closest('[data-popup]').removeClass('in');
		$('body').removeClass('noScroll');
	});
}(jQuery));