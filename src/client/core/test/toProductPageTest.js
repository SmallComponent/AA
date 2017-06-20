const should = require('should');
const toProductPage = require('../toProductPage');

const regularProductPage = `
    function showproductdetails(){
        $.ajax({
            type: "GET",
            url: "http://www.adidas.com.cn/specific/product/ajaxview/",
            data:"id="+346736,
            success:function(msg){
                msg=msg.replace("已售罄", '<h1 class="pdpTit">已售罄</h1>');
                $('#show_product_details').html(msg);
                try{$(".copySelectSize").copySelect({title:"尺码:",defaultText:"选择尺码",isDefault:true,optionClick:function(dom,index){}});}catch(e){} //select模拟
                try{$(".copySelect").copySelect({isDefault:true,optionClick:function(dom,index){}});}catch(e){} //select模拟
                $(".addCart").click(function(){$common.addCart.click($(this));return false;});
                try{$(".time").countDown({mode:'day',showClass:true,show:false,callback:function(data,obj){$common.countDown(data,obj,"progress")},endCallBack:function(data,obj){$common.countDown(data,obj,"complete");}});}catch(e){}//初始化倒计时-小时
            }
        });
`;

const illformedProductPage = `
        showproductdetails();
        $("#sort_type a").click(function(){
        var $ele = $(this);
        var psort = $(this).data('sort');
        var qData = "id=346736&psort="+psort+"&ratings="+$("#filterBoxUl").data('r');
        $.ajax({
            url:"http://www.adidas.com.cn/specific/product/ajaxreview/",
            data:qData,
            dataType:'html',
            success:function(html){
                $(".pdpCommentsList").html(html);
                $ele.siblings().removeClass("cur");
                $ele.addClass("cur");
            }
        });
    });
`;


describe('parserProductId test',function(){
    it('should successd parse productId from regular product page body',function(){
        let productId = toProductPage.parseProductId(regularProductPage);
        productId.should.be.exactly('346736');
    });

    it('should return null if input not has avaliable productId',function(){
        let productId = toProductPage.parseProductId(illformedProductPage);
        (! productId).should.be.exactly(true);
    });

});