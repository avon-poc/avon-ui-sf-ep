<template>
  <div>
    <h3>{{ heading }}</h3>
    <p class="Paragraph" v-html="richText"></p>
  </div>
</template>

<script>
export default {
  name: "Paragraph",
  props: ["richText", "heading"],
};
</script>