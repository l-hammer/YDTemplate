<!-- 
    web端开发.tpl模板
 -->
<{extends file='web/layout/event/main.tpl'}>    

<{block name=content}>
<{% htmlCode %}>
<{/block}>

<{block name=local_js_link}>
<script src="<{$g_resources_url}>/web/js/perfect-scrollbar.min.js"></script>
<{/block}>

<{block name=local_js_block}>
<script type="text/javascript">
<{% jsCode %}>
</script>
<{/block}>

<{block name=local_css_block}>
<style>
<{% cssCode %}>
</style>
<{/block}>
