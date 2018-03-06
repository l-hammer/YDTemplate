<!-- 
    web端开发.tpl模板示例
 -->
<{extends file='web/layout/event/main.tpl'}>

<{block name=local_css_link}>
<link rel="stylesheet" href="<{$g_resources_url}>/web/css/swiper.min.css">
<{/block}>

<{block name=content}>
{{htmlCode}}
<{/block}>

<{block name=local_js_link}>
<script src="<{$g_resources_url}>/web/js/perfect-scrollbar.min.js"></script>
<script type="text/javascript" src="<{$g_resources_url}>/web/js/swiper.min.js"></script>
<{/block}>

<{block name=local_js_block}>
<script type="text/javascript">
{{jsCode}}
</script>
<{/block}>

<{block name=local_css_block}>
<style>
{{cssCode}}
</style>
<{/block}>


<!-- 线上代码 http://118.190.126.206:8888/back-end/yindou_02/blob/master/application/views/web/events/2018/01/fourth_annual.tpl -->