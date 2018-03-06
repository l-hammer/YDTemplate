<!--
    app端开发.tpl模板
-->
<{extends file='h5/layout/main.tpl'}>

<{block name=content}>
{{htmlCode}}
<{/block}>

<{block name=local_js_link}>
<script src="<{$g_resources_url}>/weixin/js/vue-router-3.0.1.js"></script>
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

<!-- http://118.190.126.206:8888/back-end/yindou_02/blob/master/application/views/wx/events/2017/12/year_sign.tpl -->