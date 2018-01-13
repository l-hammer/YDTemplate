<{extends file='web/layout/event/main.tpl'}>
<{block name=local_css_link}> 
<link rel="stylesheet" href="<{$g_resources_url}>/web/css/normalize.min.css">	
<link href="<{$g_resources_url}>/web/css/perfect-scrollbar.min.css" rel="stylesheet">
<link rel="stylesheet" href="<{$g_resources_url}>/web/css/swiper.min.css">	
<{/block}>
<{block name=local_css_block}>
<style>
*{
	box-sizing: border-box;
}
.clearfix:after,.clearfix:before {
    display: table;
    content: " "
}

.clearfix:after {
    clear: both
}

.clearfix {
    *zoom:1}
::input-placeholder { /* WebKit browsers */ 
	color: #9c8b59 !important;
	line-height: .653333rem; 
}
::-webkit-input-placeholder { /* WebKit browsers */ 
	color: #9c8b59 !important; 
	line-height: .653333rem;
} 
a, a:hover, a:active, a:visited{
	text-decoration: none;
}
p{
	margin: 10px 0;
	user-select: none;
}

html, body{
	/* height: 100%; */
	line-height: 1;
	position: relative;
	/* user-select: none; */
	-webkit-font-smoothing: antialiased;
}

.ft-14{
	font-size: 14px;
}
.ft-15{
	font-size: 15px;
}
.ft-16{
	font-size: 16px;
}
.ft-17{
	font-size: 17px;
}
.primary{
	color: #9c0403 !important;
}

.gold_bag{
	display: inline-block;
	width: 45px;
	height: 40px;
	background: url('https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/icon_bag.png') no-repeat center;
}

.back_index{
	display: block;
    width: 62px;
	height: 62px;
	line-height: 18px;
	padding: 13px 17px;
	border-radius: 50%;
	color: #570003;
    background: #ffe4a8;
    position: fixed;
    top: 26px;
    left: 50%;
    margin-left: 502px;
	z-index: 100;
}

.floor{
	width: 100%;
	position: relative;
}

.floor1{
	height: 616px;
	background: url('https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/4annual_bg1_min.jpg') no-repeat center;
}
.floor2{
	height: 947px;
	background: url('https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/4annual_bg2_unme_min.jpg') no-repeat center;
	padding-top: 196px;
}
.floor2.islogin{
	height: 1173px;
	background: url('https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/4annual_bg2_me_min.jpg') no-repeat center;
	padding-top: 196px;
}
.floor3{
	height: 1009px;
	background: url('https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/4annual_bg3_min.jpg') no-repeat center;
	padding-top: 256px;
}
.floor4{
	height: 943px;
	background: url('https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/4annual_bg4_min.jpg') no-repeat center;
	padding-top: 195px;
}
.floor4.islogin{
	height: 1013px;
	background: url('https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/4annual_bg4_me_min.jpg') no-repeat center;
	padding-top: 195px;
}
.floor5{
	height: 1595px;
	background: url('https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/4annual_bg5_min_min.jpg') no-repeat center;
	padding-top: 256px;
}
.floor p.con{
	width: 1000px;
	margin: 0 auto;
	color: #ffffff;
	font-size: 18px;
	font-weight: 500;
	text-align: center;
}

.floor a.btn{
	display: block;
	width: 335px;
	height: 54px;
	color: #960302;
	background: #ffe9a1;
	border-radius: 8px;
	text-align: center;
	line-height: 54px;
	font-size: 23px;
    font-weight: 500;
	position: absolute;
	top: 572px; left: 50%;
	margin-left: -168px;
	box-shadow: -2px 2px 2px rgba(0, 0, 0, .6); 
}
.floor a.btn:active{
	background: rgba(255, 233, 161, .9);
}
.floor a.btn.primary{
	top: 572px;
	background: #9c0403;
	color: #ffffff !important;
	border: none;
}
.floor a.btn.primary:active{
	background: rgba(156, 4, 3, .9);
}

.floor .rules{
	width: 1000px;
	margin: 0 auto;
	color: #ffffff;
	margin-top: 476px; 
	padding-left: 315px;
	font-weight: 500;
}
.floor .rules p.txt{
	font-size: 13px;
}
.floor2 .table-container{
	width: 1000px;
	margin: 63px auto 0;
}
.floor2 .table-container .table{
	float: left;
	width: 614px;
	background: #ffe9a1;
	margin-left: 15px;
	border: 3px solid #b41118;
	border-radius: 36px;
	color: #960302;
	overflow: hidden;
	font-size: 17px;
}
.floor2 .table-container .table .row.header{
	font-weight: 900;
	font-size: 20px;
}
.floor2 .table-container .table .row{
    width: 100%;
    width: 608px;
}
.floor2 .table-container .table span{
	float: left;
	width: 50%;
	height: 60px;
	padding: 10px 0;
	line-height: 40px;
	text-align: center;
	border: 3px solid #b41118;
	border-top-width: 0;
	border-left-width: 0;
}
.floor2 .table-container .table .row.last span{
	border-bottom-width: 0;
}
.floor2 .table-container .table span .gold_bag{
	vertical-align: middle;
}
.floor2 .table-container .table span.even{
	border-right-width: 0;
}
.floor2 .table-container .table span.last{
	border-bottom-width: 0;
}
.floor2 .table-container .sequence{
	float: left;
	width: 72px;
	background: #ffe9a1;
	margin-left: 134px;
	margin-top: 58px;
	border-radius: 36px;
	border: 3px solid #b41118;
}
.floor2 .table-container .sequence span{
	display: block;
	color: #960302;
	width: 100%;
	text-align: center;
	height: 60px;
	line-height: 60px;
	font-size: 23px;
}
.floor2 .table-container .sequence span.border{
    height: 63px;
	border: 3px solid #b41118;
	border-left-width: 0;
	border-right-width: 0;
	line-height: 57px;
}
.floor2 .table-container.cash{
	margin-top: 5px;
}
.floor2 .table-container.cash .table{
	margin-left: 220px;
}
.floor2 .table-container.cash .table span{
	width: 33.3333%;
}
.floor2 .cashback{
	width: 800px;
	margin: 0 auto;
	font-size: 20px;
	font-weight: 900;
	color: #ffffff;
	text-indent: 35px;
	margin-top: 52px;
}
.floor.floor2 .rules{
	margin-top: 160px;
}
.floor.floor2.islogin .rules{
	margin-top: 62px;
}
.floor.floor3 .rules{
	margin-top: 409px;
}
.floor.floor3 .rules p.txt{
	color: #9c0403;
}
.floor.floor3 a.btn.gray{
	background: #969696;
	cursor: not-allowed;
    color: #fff;
    box-shadow: -2px 2px 2px rgba(150, 150, 150, .5);
}
.floor.floor4 a.btn{
	top: 520px;
}
.floor.floor4 .rules{
	margin-top: 419px;
}
.floor4.islogin .rules{
	margin-top: 60px;
}
.floor4.islogin .loanmoney{
	width: 800px;
	margin: 309px auto 0;
	text-align: center;
	color: #ffeb9c;
}
.floor4.islogin .loanmoney .value{
	font-size: 78px;
}
.floor4.islogin .loanmoney .key{
	font-size: 32px;
}
.floor.floor5 .con{
	padding: 0 112px 0 134px;
	text-align: left;
	line-height: 30px;
}
.floor.floor5 .btn_tabs{
	width: 1000px;
	margin: 52px auto 0;
	padding-left: 52px;
}
.floor.floor5 .btn_tabs .btn_tab{
	display: inline-block;
	width: 116px;
	height: 56px;
	color: #ffffff;
	text-align: center;
	line-height: 56px;
	background: #a10604;
	border-radius: 8px;
	margin-right: 13px;
	font-size: 22px;
}
.floor.floor5 .btn_tabs .btn_tab.last{
	margin-right: 0;
}
.floor.floor5 .btn_tabs .btn_tab:active, .floor.floor5 .btn_tabs .btn_tab.active{
	background: #9e4847;
}
.floor.floor5 .shop-block{
	width: 888px;
	margin: 48px auto 0;
	padding-left: 23px;
}
.floor.floor5 .shop-block .shop{
	display: inline-block;
	width: 272px;
	height: 442px;
	background: #ffffff;
	margin-right: 23px;
}
.floor.floor5 .rules{
	margin-top: 52px;
}

.floor.floor5 .swiper-container {
	width: 100%;
}
.floor.floor5 .shop-block .shop .top{
	width: 100%;
	height: 282px;
	padding-top: 49px;
}
.floor.floor5 .shop-block .shop .mid{
	width: 100%;
	height: 106px;
	padding: 16px;
	font-size: 12px;
	color: #969696;
}
.floor.floor5 .shop-block .shop .bot{
	width: 100%;
	height: 56px;
	padding-top: 3px;
}
.floor.floor5 .shop-block .shop .top img{
	width: 100%;
}
.floor.floor5 .shop-block .shop .bot a.shop_btn{
	display: block;
	width: 236px;
	height: 42px;
	line-height: 42px;
	color: #ffffff;
	background: #a10604;
	border-radius: 2px;
	text-align: center;
	font-size: 22px;
    font-weight: 500;
	margin: 0 auto;
}
.floor.floor5 .shop-block .shop .bot a.shop_btn:active{
	background: rgba(161, 6, 4, .8);
}
.floor.floor5 .shop-block .shop .bot a.shop_btn.gray{
	background: #969696;
	cursor: not-allowed;
}
.floor.floor5 .shop-block .shop .bot a.shop_btn.gray .time{
	font-size: 13px;
	vertical-align: bottom;
}
.floor.floor5 .shop-block .shop .mid .tit{
	width: 100%;
	overflow: hidden; 
	white-space: nowrap; 
	text-overflow: ellipsis; 
	font-size: 15px;
	color: #444444;
	font-weight: 900;
}
.shop .mid p{
	margin-bottom: 0;
	margin-top: 6px;
}
.shop .mid .shop_score{
	margin-top: 16px;
}
.shop .mid .shop_score .n_score{
	color: #a10604;
	font-size: 16px;
	font-weight: 900;
}
.shop .mid .discount{
	text-decoration: line-through;
}
.shop .mid .repe{
	float: right;
}
.float_menu{
	position: fixed;
	top: 300px;
	top: calc(50vh - 143px);
	left: 50%;
	margin-left: 425px;
	padding-top: 86px;
	padding-left: 78px; 
	width: 289px;
	height: 287px;
    font-size: 20px;
    font-weight: 500;
	z-index: 100;
	background: url('https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/float_menu.png') no-repeat center;
}
.float_menu .menu_item{
	display: inline-block;
	width: 143px;
	line-height: 39px;
	text-align: center;
	color: #ffffff;

}
.float_menu .menu_item:hover, .float_menu .menu_item.active{
	color: #f38635;
}
.floor2 .table-container.cash .recordTbody{width:100%; height: 177px;overflow-x: hidden;overflow-y: auto;
    -webkit-border-bottom-left-radius: 8px; 
    -webkit-border-bottom-right-radius: 8px;
    -moz-border-bottom-left-radius: 8px; 
    -moz-border-bottom-right-radius: 8px; 
    -ms-border-bottom-left-radius: 8px; 
    -ms-border-bottom-right-radius: 8px; 
    border-bottom-left-radius: 8px; 
    border-bottom-right-radius: 8px;
	position: relative; }
	
.ps-container>.ps-scrollbar-y-rail{ width: 12px; }
.ps-container>.ps-scrollbar-y-rail>.ps-scrollbar-y{ width: 4px; background-color: #b41118; }
.ps-container:hover>.ps-scrollbar-y-rail:hover>.ps-scrollbar-y{ width: 8px; background-color: #b41118; }

.floor2 .table-container.cash .norecord{
	text-align: center;
	line-height: 176px;
}
.dg-modal.yd-modal{
	width: 500px;
	border-radius: 8px;
}
.dg-modal.yd-modal p.desp{
	padding: 29px;
	text-align: center;
}
.dg-modal.yd-modal a.coupon{
    color: #ff8809;
}
</style>
<{/block}>

<{block name=content}>
<div id="app">
	<a href="/" class="back_index ft-14">返回首页</a>
	<div class="floor floor1" id="floor1"></div>
	<{if !$is_login}>
	<div class="floor floor2" id="floor2">
		<p class="con">活动期间，用户出借直投项目（新手标除外）单笔出借金额达到指定金额，即可按照比例获得返现。</p>
		<div class="table-container clearfix">
			<div class="sequence">
				<span class="first">1</span>
				<span class="border">2</span>
				<span>3</span>
			</div>
			<div class="table">
				<div class="row header">
					<span>单笔出借金额（元）</span>
					<span class="even">返现比例</span>
				</div>
				<div class="row">
					<span><i class="icon gold_bag"></i> 达到1万元</span>
					<span class="even">0.3%</span>
				</div>
				<div class="row">
					<span><i class="icon gold_bag"></i> 达到5万元</span>
					<span class="even">0.4%</span>
				</div>
				<div class="row">
					<span class="last"><i class="icon gold_bag"></i> 达到10万元</span>
					<span class="even last">0.5%</span>
				</div>
			</div>
		</div>
		<a href="javascript:void(0)" class="btn unLogin">请登录查看我的返现</a>
		<div class="rules">
			<p class="txt">1、活动时间： 2018年1月8日00:00-2018年2月8日23:59；</p>
			<p class="txt">2、自动投标、手动投标均可参与本活动；</p>
			<p class="txt">3、返现金额=出借金额*返现比例</p>
			<p class="txt">4、返现奖金预计将于出借成功后24小时内发放至账户；</p>
			<p class="txt">5、本次活动最终解释权归银豆网所有。</p>
		</div>
	</div>
	<{else}>
	<div class="floor floor2 islogin" id="floor2">
		<p class="con">活动期间，用户出借直投项目（新手标除外）单笔出借金额达到指定金额，即可按照比例获得返现。</p>
		<div class="table-container clearfix">
			<div class="sequence">
				<span class="first">1</span>
				<span class="border">2</span>
				<span>3</span>
			</div>
			<div class="table">
				<div class="row header">
					<span>单笔出借金额（元）</span>
					<span class="even">返现比例</span>
				</div>
				<div class="row">
					<span><i class="icon gold_bag"></i> 达到1万元</span>
					<span class="even">0.3%</span>
				</div>
				<div class="row">
					<span><i class="icon gold_bag"></i> 达到5万元</span>
					<span class="even">0.4%</span>
				</div>
				<div class="row">
					<span class="last"><i class="icon gold_bag"></i> 达到10万元</span>
					<span class="even last">0.5%</span>
				</div>
			</div>
		</div>
		<p class="cashback">我的返现</p>
		<div class="table-container cash clearfix">
			<div class="table">
				<div class="row header">
					<span>出借时间</span>
					<span>出借金额（元）</span>
					<span class="even">返现金额（元）</span>
				</div>
				<div id="recordTbody" class="recordTbody clearfix">
					<{if !empty($cash_list)}>
						<{foreach from=$cash_list item=item name=foo}>
						<div class="row <{if $smarty.foreach.foo.iteration gt 3 && $smarty.foreach.foo.last}>last<{/if}>">
							<span><{$item.dt}></span>
							<span><i class="icon gold_bag"></i> <{$item.hold_money}></span>
							<span class="even"><{$item.return_money}></span>
						</div>
						<{/foreach}>
					<{else}>
					<div class="norecord">
						暂无返现记录
					</div>
					<{/if}>
				</div>
			</div>
		</div>
		<div class="rules">
			<p class="txt">1、活动时间： 2018年1月8日00:00-2018年2月8日23:59；</p>
			<p class="txt">2、自动投标、手动投标均可参与本活动；</p>
			<p class="txt">3、返现金额=出借金额*返现比例</p>
			<p class="txt">4、返现奖金预计将于出借成功后24小时内发放至账户；</p>
			<p class="txt">5、本次活动最终解释权归银豆网所有。</p>
		</div>
	</div>
	<{/if}>
	<div class="floor floor3" id="floor3">
		<p class="con primary">活动期间，用户每天均可领取4周年狂欢礼包1次。</p>
        <{if $is_get == 0}>
		<a href="javascript:void(0)" class="btn primary" id="getCouponBtn">立即领取</a>
        <{else}>
		<a href="javascript:void(0)" class="btn gray">已领取</a>
        <{/if}>
		<div class="rules">
			<p class="txt">1、活动时间： 2018年1月8日00:00-2018年2月8日23:59；</p>
			<p class="txt">2、现金卡、加息券可用于出借直投项目（新手标不可用），有效期均为7天；</p>
			<p class="txt">3、每笔出借仅可使用一张优惠券；</p>
			<p class="txt">4、本次活动最终解释权归银豆网所有。</p>
		</div>
	</div>
	<{if !$is_login}>
	<div class="floor floor4" id="floor4">
		<p class="con">活动期间用户出借直投项目（新手标除外）累计出借金额达到指定金额，还可获得实物奖励1台。</p>
		<a href="javascript:void(0)" class="btn unLogin">请登录查看我的累计出借金额</a>
		<div class="rules">
			<p class="txt">1、活动时间： 2018年1月8日00:00-2018年2月8日23:59；</p>
			<p class="txt">2、自动投标、手动投标均可参与本活动；</p>
			<p class="txt">3、新手标、债权转让项目不计入累计出借金额；</p>
			<p class="txt">4、若用户发起债权转让，计算累计出借金额时将扣除债转的金额；</p>
			<p class="txt">5、实物奖励以用户可获得的最高奖励为准，每人仅可获得一件；</p>
			<p class="txt">6、实物奖励将于活动后10个工作日内发货，请豆粉及时更新默认收货地址，发奖时间节假日顺延；</p>
			<p class="txt">7、本次活动最终解释权归银豆网所有。</p>
		</div>
	</div>
	<{else}>
	<div class="floor floor4 islogin" id="floor4">
		<p class="con">活动期间用户出借直投项目（新手标除外）累计出借金额达到指定金额，还可获得实物奖励1台。</p>
		<div class="loanmoney">
			<p class="value"><{$result|thousands}></p>
			<p class="key">我的累计出借金额（元）</p>
		</div>
		<div class="rules">
			<p class="txt">1、活动时间： 2018年1月8日00:00-2018年2月8日23:59；</p>
			<p class="txt">2、自动投标、手动投标均可参与本活动；</p>
			<p class="txt">3、新手标、债权转让项目不计入累计出借金额；</p>
			<p class="txt">4、若用户发起债权转让，计算累计出借金额时将扣除债转的金额；</p>
			<p class="txt">5、实物奖励以用户可获得的最高奖励为准，每人仅可获得一件；</p>
			<p class="txt">6、实物奖励将于活动后10个工作日内发货，请豆粉及时更新默认收货地址，发奖时间节假日顺延；</p>
			<p class="txt">7、本次活动最终解释权归银豆网所有。</p>
		</div>
	</div>
	<{/if}>
	<div class="floor floor5" id="floor5">
		<p class="con primary">每天10：30、14：30、17：30，三场5折限时秒杀，每场一款商品，数量有限，抢完为止。每个用户每款商品限兑一件。</p>
		<div class="btn_tabs" id="tabBtns">
			<a href="javascript:void(0);" data-id='0' class="btn_tab <{if date('Y-m-d') == '2018-01-08'}>active<{/if}>">1月8日</a>
			<a href="javascript:void(0);" data-id="1" class="btn_tab <{if date('Y-m-d') == '2018-01-09'}>active<{/if}>">1月9日</a>
			<a href="javascript:void(0);" data-id="2" class="btn_tab <{if date('Y-m-d') == '2018-01-10'}>active<{/if}>">1月10日</a>
			<a href="javascript:void(0);" data-id="3" class="btn_tab <{if date('Y-m-d') == '2018-01-11'}>active<{/if}>">1月11日</a>
			<a href="javascript:void(0);" data-id="4" class="btn_tab <{if date('Y-m-d') == '2018-01-12'}>active<{/if}>">1月12日</a>
			<a href="javascript:void(0);" data-id="5" class="btn_tab <{if date('Y-m-d') == '2018-01-13'}>active<{/if}>">1月13日</a>
			<a href="javascript:void(0);" data-id="6" class="btn_tab last <{if date('Y-m-d') == '2018-01-14'}>active<{/if}>">1月14日</a>
		</div>
		<div class="shop-block">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<{foreach from=$goods_list key="myId" item=childs name=parent}>
						<{foreach from=$childs item=item name=child}>
						<div class="swiper-slide shop">
							<div class="top">
								<img src="<{$item.goods_image_path}>" alt="">
							</div>
							<div class="mid">
								<p class="tit"><{$item.goods_name}></p>
								<p class="shop_score">现积分：<span class="n_score"><{$item.discount_score}></span></p>                                                                            			  <p class="full_score clearfix"><span class="discount">原积分：<{$item.goods_score}></span><span class="repe">库存量：<{$item.goods_count}>件</span></p>
							</div>
							<div class="bot btn_wrapper">
                                <{if $myId == date('Y-m-d')}>
                                    <{if $item.goods_count<=0}>
                                        <a href="javascript:;" class="shop_btn gray">已兑完</a>
                                    <{elseif $item.start_dt le date('Y-m-d H:i:s')}>
                                        <a href="/shop_detail?goods_id=<{$item.id}>" target="_blank" class="shop_btn">立即兑换</a>
                                    <{else}>
                                        <a href="javascript:;" class="shop_btn gray">距兑换 <span class="time count_down_time" data-start-date="<{$item.start_dt}>"></span></a>
                                    <{/if}>
                                <{elseif $myId > date('Y-m-d')}>
                                    <{* 今天以后 *}>
                                    <a href="javascript:;" class="shop_btn gray">尚未开始</a>
                                <{else}>
                                    <a href="javascript:;" class="shop_btn gray">己结束</a>
                                <{/if}>
							</div>
						</div>
						<{/foreach}>
					<{/foreach}>
				</div>
			</div>
		</div>
		<div class="rules primary">
			<p class="txt">1、活动时间：2018年1月8日10:00-2018年1月14日23:59；</p>
			<p class="txt">2、每款商品限量3个，抢完即止，次日恢复正常积分兑换；</p>
			<p class="txt">3、活动期间，每个用户，每款商品限兑一件；</p>
			<p class="txt">4、实物商品在兑换后5个工作日发货，兑换前请及时更新默认收货地址，发奖时间节假日顺延；</p>
			<p class="txt">5、兑换订单一旦生效无质量问题不予退换，请在签收时当面验收，如有质量问题立即联系银豆网客服或者商家客服；</p>
			<p class="txt">6、本次活动最终解释权归银豆网所有。</p>
		</div>
	</div>
	<div class="float_menu">
		<a href="#floor2" class="menu_item active">返现肆意狂欢</a>
		<a href="#floor3" class="menu_item">红包肆无忌惮</a>
		<a href="#floor4" class="menu_item">福利放肆到底</a>
		<a href="#floor5" class="menu_item">商城大肆放价</a>
		<a href="javascript: void(0);" id="scrollTop" class="menu_item">返回顶部</a>
	</div>
</div>
<input id="isEnd" type="hidden" value="<{$activity_tag}>"/>  
<input id="isLogin" type="hidden" value="<{$is_login}>"/> 
<{/block}>
<{block name=local_js_block}>
<script src="<{$g_resources_url}>/web/js/perfect-scrollbar.jquery.min.js"></script>
<script type="text/javascript" src="<{$g_resources_url}>/web/js/swiper.min.js"></script>
<script type="text/javascript">
var YD = YD || {};
YD.FouthAnnual = function(){

	this.$unLoginBtn = $('.unLogin');
	this.$tabBtnEles = $('#tabBtns');
    this.$start_date = "2018-01-08 10:30:00";
    this.$start_date2 = "2018-01-08 14:30:00";
    this.$start_date3 = "2018-01-08 17:30:00";
    this.$end_date = "2018-01-14 23:59:59";
    this.$cur_date = "<{date('Y/m/d H:i:s')}>";
    this.$time = ['10:30:00', '14:30:00', '17:30:00'];
	this.$timer = null;
	this.$swiper = null;
	this.$exchangeBtnEles = $('.shop_btn:not(.gray)');
	this.$isEnd = $('#isEnd').val() == 0 ? false : true;
	this.$isLogin = $('#isLogin').val();
	this.$getCouponBtn = $('#getCouponBtn');
	this.$scrollTop = $('#scrollTop');
	this.$recordTbody = $('#recordTbody');
    this.$btnTabs = $('.btn_tab');
    this.$btnTabActive = $('.btn_tab.active');


    this.init = function(){
		this.events();
    }
	this.YDModal = function(con){
		var modal_template="\
			<div class='dg-modal yd-modal'>\
				<p class='desp'>"+con+"</p>\
			</div>";                               
		$(modal_template).appendTo('body').dg_modal({
			fadeDuration: 250,
		});
		return false;
	}
    this.events = function(){
		var self = this;
		self.$unLoginBtn.on('click', function(){
			YD.showLogin(); return;
		});
		self.$getCouponBtn.on('click', function(){
			if(self.$isLogin){
				$.ajax({
					url: '/webapi/send_user_bonus',                                                                                                  
					type: 'POST',
					success: function(res){
						if(res && res.code === 0){
							self.YDModal('恭喜亲领取成功，请在“我的账户”-“<a href="/uc/index#/coupon/plus" target="_blank" class="coupon">优惠券</a>”查看');	
						}else{
							self.YDModal(res.message);	
						}
					},
					error: function(res){
						alert(res)
					}
				})
			}else{
				YD.showLogin(); return;
			}
		});
        self.$btnTabs.on('click', function(){
            self.$btnTabs.removeClass('active');
            $(this).addClass('active');
        })
		self.$swiper = new Swiper('.swiper-container', {
			slidesPerView: 3,
			spaceBetween: 28,
			slidesPerGroup: 3,
			loop: false,
            allowTouchMove: false
		});
		self.$tabBtnEles.on('click', function($evt){
			var $ele = $($evt.target);
			var id = $ele.attr('data-id');
			if($evt.target.tagName === "A"){
				self.$swiper.slideTo(id*3, 800, false);
			}
		});
        self.$btnTabActive.length > 0 ? self.$swiper.slideTo(self.$btnTabActive.data('id')*3, 10, false) : null;
		// 滚动条
		self.$recordTbody.perfectScrollbar(); 
		// 滚动侧边栏
		self.$scrollTop.on('click', function(){
			$(window).scrollTop() === 0 ? false : ($('html, body').stop(true).animate({ scrollTop: 0 },600));
		});
		$(window).scroll(function(){                                                                                                                                          
			var wst = $(window).scrollTop() + $(window).height()/2;
			for (var i=2; i<6; i++){            
				if($("#floor"+i).offset().top<=wst){ 
					$(".menu_item").removeClass("active");
					$('a[href=#floor'+i+']').addClass("active");
				}
			} 
		});
        self._GetDateDiff = function(startTime, endTime, diffType) {
            var time_array = [];
            var time_end = endTime.getTime();
            var time_now = startTime; // 获取当前时间
            time_now = time_now.getTime();
            var time_distance = time_end - time_now; // 时间差：活动结束时间减去当前时间  
            var int_day, int_hour, int_minute, int_second;
            if (time_distance >= 0) {
                // 相减的差数换算成天数  
                int_day = Math.floor(time_distance / 86400000)
                time_distance -= int_day * 86400000;
                // 相减的差数换算成小时
                int_hour = Math.floor(time_distance / 3600000)
                time_distance -= int_hour * 3600000;
                // 相减的差数换算成分钟  
                int_minute = Math.floor(time_distance / 60000)
                time_distance -= int_minute * 60000;
                // 相减的差数换算成秒数 
                int_second = Math.floor(time_distance / 1000)
                // 判断小时小于10时，前面加0进行占位
                if (int_hour < 10) int_hour = "0" + int_hour;
                // 判断分钟小于10时，前面加0进行占位     
                if (int_minute < 10) int_minute = "0" + int_minute;
                // 判断秒数小于10时，前面加0进行占位
                if (int_second < 10) int_second = "0" + int_second;
                // 显示倒计时效果      
                time_array.push(int_day);
                time_array.push(int_hour);
                time_array.push(int_minute);
                time_array.push(int_second);
            }
            return time_array;
        };
        self._addDate = function(date, dadd) {
            var a = date;
            a = a.valueOf()
            a = a + dadd * 24 * 60 * 60 * 1000
            a = new Date(a)
            return a;
        };
        self.start_count_down_time = function() {
            var Time1 = new Date();
            var Time2 = new Date();
            var Time3 = new Date();
            var start_date = self._convertDate(self.$start_date);
            var end_date = self._convertDate(self.$end_date);
            var cur_date = new Date(self.$cur_date);

            var d1 = self._convertDate(self._date2str(cur_date, "yyyy-MM-dd 10:30:00"));
            var d2 = self._convertDate(self._date2str(cur_date, "yyyy-MM-dd 14:30:00"));
            var d3 = self._convertDate(self._date2str(cur_date, "yyyy-MM-dd 17:30:00"));
            if (cur_date < start_date) {
                //10:30
                Time1 = start_date;
                //14:30
                Time2 = self._convertDate(self.$start_date2);
                //17:30
                Time3 = self._convertDate(self.$start_date3);
            } else {
                if (cur_date < d3) {
                    //10:30
                    Time1 = d1;
                    //14:30
                    Time2 = d2;
                    //17:30
                    Time3 = d3;
                } else {
                    //10:30
                    if (cur_date >= self._convertDate(self._date2str(end_date, "yyyy-MM-dd 17:30:00"))) {
                        if (self.$timer) {
                            clearInterval(self.$timer);
                            self.$timer = null;
                        }
                        $('.count_down_time').html("00小时00分00秒");   //活动结束
                        return;
                    } else {
                        var nextDate = self._addDate(cur_date, 1);
                        Time1 = self._convertDate(self._date2str(nextDate, "yyyy-MM-dd 10:30:00"));
                        Time2 = self._convertDate(self._date2str(nextDate, "yyyy-MM-dd 14:30:00"));
                        Time3 = self._convertDate(self._date2str(nextDate, "yyyy-MM-dd 17:30:00"));
                    }
                }
            }
            var arr1 = self._GetDateDiff(cur_date, Time1);
            var arr2 = self._GetDateDiff(cur_date, Time2);
            var arr3 = self._GetDateDiff(cur_date, Time3);
    
            if (arr1[0] == 0 && arr1[1] == "00" && arr1[2] == "00" && arr1[3] == "00") {
                window.location.reload();
            } else if (arr2[0] == 0 && arr2[1] == "00" && arr2[2] == "00" && arr2[3] == "00") {
                window.location.reload();
            } else if (arr3[0] == 0 && arr3[1] == "00" && arr3[2] == "00" && arr3[3] == "00") {
                if (self.$timer) {
                    clearInterval(self.$timer);
                    self.$timer = null;
					window.location.reload();
                }
            } else {
                if (!self.$timer) {
                    self.$timer = setInterval(function () {
                        self.$cur_date = new Date(self.$cur_date).getTime() + 1000;
                        self.start_count_down_time();
                    }, 1000);
                }
            }
            if (arr1[0] > 0) {
                $('span[data-start-date*="10:30:00"]').html(arr1[0] + "天" + arr1[1] + "小时" + arr1[2] + "分" + arr1[3] + "秒");
            }else{
                if(arr1){
                    $('span[data-start-date*="10:30:00"]').html(arr1[1] + "小时" + arr1[2] + "分" + arr1[3] + "秒");
                }else{
                    $('span[data-start-date*="10:30:00"]').html("00小时00分00秒");
                }
            }
            if (arr2[0] > 0) {
                $('span[data-start-date*="14:30:00"]').html(arr2[0] + "天" + arr2[1] + "小时" + arr2[2] + "分" + arr2[3] + "秒");
            }else{
                if(arr2){
                    $('span[data-start-date*="14:30:00"]').html(arr2[1] + "小时" + arr2[2] + "分" + arr2[3] + "秒");
                }else{
                    $('span[data-start-date*="14:30:00"]').html("00小时00分00秒");
                }
            }
            if (arr3[0] > 0) {
                $('span[data-start-date*="17:30:00"]').html(arr3[0] + "天" + arr3[1] + "小时" + arr3[2] + "分" + arr3[3] + "秒");
            } else {
                if(arr3){
                    $('span[data-start-date*="17:30:00"]').html(arr3[1] + "小时" + arr3[2] + "分" + arr3[3] + "秒");
                }else{
                    $('span[data-start-date*="17:30:00"]').html("00小时00分00秒");
                }
            }
        };
        self._convertDate = function(date) {
            return new Date(date.replace(/-/g, "/"));
        };
        self._date2str = function(x, y) {
            var z = {
                y: x.getFullYear(),
                M: x.getMonth() + 1,
                d: x.getDate(),
                h: x.getHours(),
                m: x.getMinutes(),
                s: x.getSeconds()
            };
            return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
                return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
            });
		};
		self.start_count_down_time();
    }
}
   
var fouthAnnual = new YD.FouthAnnual();
fouthAnnual.init();

</script>
<{/block}>
