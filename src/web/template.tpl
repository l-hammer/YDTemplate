<!-- 
    web端开发.tpl模板
 -->
<{extends file='web/layout/event/main.tpl'}>    

<{block name=local_css_link}>  
    <link rel="stylesheet" href="<{$g_resources_url}>/web/css/normalize.min.css">
    <link href="<{$g_resources_url}>/web/css/perfect-scrollbar.min.css" rel="stylesheet">
<{/block}>

<{block name=local_css_block}>
<style>
    {{cssCode}}
</style>
<{/block}>

<{block name=content}>
    {{htmlCode}}
<{/block}>

<{block name=local_js_link}>
    <script src="<{$g_resources_url}>/web/js/perfect-scrollbar.jquery.min.js"></script>
<{/block}>

<{block name=local_js_block}>
<script type="text/javascript">
    {{jsCode}}
</script>
<{/block}>

