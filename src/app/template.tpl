<!-- 
    app端开发.tpl模板
 -->
<{extends file='h5/layout/main.tpl'}>

<{block name=local_css_link}> 
    <link rel="stylesheet" href="<{$g_resources_url}>/web/css/normalize.min.css">
<{/block}>

<{block name=content}>
{{htmlCode}}
<{/block}>

<{block name=local_js_link}>
    <script src="<{$g_resources_url}>/weixin/js/zepto-1.2.0.min.js"></script>
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

