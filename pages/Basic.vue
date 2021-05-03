<template>
<div>
    <h3>VSVF</h3>
     <EditableArea :content="main" />
</div>
</template>
<script>

export default {    
    props: [ 'title', 'main', 'content'],
    created() {
        console.log("mounted")
        console.log(this.content)
    }
}
</script>