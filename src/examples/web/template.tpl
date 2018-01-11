<{extends file='web/layout/event/main.tpl'}>

<{block name=local_css_link}> 
<link rel="stylesheet" href="<{$g_resources_url}>/web/css/normalize.min.css">	
<link href="<{$g_resources_url}>/web/css/perfect-scrollbar.min.css" rel="stylesheet">
<link rel="stylesheet" href="<{$g_resources_url}>/web/css/swiper.min.css">	
<{/block}>

<{block name=content}>
    {{htmlCode}}
<{/block}>

<{block name=local_js_block}>
<script src="<{$g_resources_url}>/web/js/perfect-scrollbar.jquery.min.js"></script>
<script type="text/javascript" src="<{$g_resources_url}>/web/js/swiper.min.js"></script>
<script type="text/javascript">
{{jsCode}}
</script>
<{/block}>

<{block name=local_css_block}>
<style>
{{cssCode}}
</style>
<{/block}>
