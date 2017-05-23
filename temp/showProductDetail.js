function showproductdetails() {
	$.ajax({
		type: "GET",
		url: "http://www.adidas.com.cn/specific/product/ajaxview/",
		data: "id=" + 346736,
		success: function(msg) {
			msg = msg.replace("已售罄", '<h1 class="pdpTit">已售罄</h1>');
			$('#show_product_details').html(msg);
			try {
				$(".copySelectSize").copySelect({
					title: "尺码:",
					defaultText: "选择尺码",
					isDefault: true,
					optionClick: function(dom, index) {}
				});
			} catch(e) {} //select模拟
			try {
				$(".copySelect").copySelect({
					isDefault: true,
					optionClick: function(dom, index) {}
				});
			} catch(e) {} //select模拟
			$(".addCart").click(function() {
				$common.addCart.click($(this));
				return false;
			});
			try {
				$(".time").countDown({
					mode: 'day',
					showClass: true,
					show: false,
					callback: function(data, obj) {
						$common.countDown(data, obj, "progress")
					},
					endCallBack: function(data, obj) {
						$common.countDown(data, obj, "complete");
					}
				});
			} catch(e) {} //初始化倒计时-小时
		}
	});
}
showproductdetails();
$("#sort_type a").click(function() {
	var $ele = $(this);
	var psort = $(this).data('sort');
	var qData = "id=346736&psort=" + psort + "&ratings=" + $("#filterBoxUl").data('r');
	$.ajax({
		url: "http://www.adidas.com.cn/specific/product/ajaxreview/",
		data: qData,
		dataType: 'html',
		success: function(html) {
			$(".pdpCommentsList").html(html);
			$ele.siblings().removeClass("cur");
			$ele.addClass("cur");
		}
	});
});
$(".filterBox ul li").click(function() {
	var ratings = 5 - $(this).index();
	var qData = "id=346736&ratings=" + ratings + "&psort=" + $("#sort_type a.cur").data('sort');
	$.ajax({
		url: "http://www.adidas.com.cn/specific/product/ajaxreview/",
		data: qData,
		dataType: 'html',
		success: function(html) {
			$(".pdpCommentsList").html(html);
			$("#filterBoxUl").data('r', ratings);
		}
	});
});

function setCountDown(data, obj, status) {
	if(status == 'complete') {
		if(obj.key == 'presaleEnd' || obj.key == 'hardlaunch' || obj.key == 'presale') {
			showproductdetails();
		}
	}
};

$('.pdpCommentsList').on('click', '#load_more', function() {
	var $ele = $(this);
	if($ele.hasClass('process')) {
		return false;
	}
	$ele.addClass('process');
	var p = $("#load_more").data('page');
	var qData = "id=346736&ratings=" + $("#filterBoxUl").data('r') + "&psort=" + $("#sort_type a.cur").data('sort') + "&p=" + p;
	$.ajax({
		url: "http://www.adidas.com.cn/specific/product/ajaxreview/",
		data: qData,
		dataType: 'html',
		success: function(html) {
			$(".pdpCommentsList .commentsLoad").remove();
			$(".pdpCommentsList").append(html);
			$ele.removeClass('process');
		}
	});
});
