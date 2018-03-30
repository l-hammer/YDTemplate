<!-- 
    app端开发.tpl模板
 -->
<{extends file='h5/layout/main.tpl'}>

<{block name=common_js_link}><{/block}>
<{block name=common_css_link}><{/block}>

<{block name=content}>
{{htmlCode}}
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

