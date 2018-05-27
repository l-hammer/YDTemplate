<!-- build中间模板 -->

{{#if_eq type "h5"}}
<{extends file='h5/layout/main.tpl'}>
{{/if_eq}}

{{#if_eq type "wx"}}
<{extends file='wx/layout/events/main.tpl'}>
{{/if_eq}}

<{block name=common_js_link}><{/block}>
<{block name=common_css_link}><{/block}>

<{block name=content}>
<{% htmlCode %}>
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

