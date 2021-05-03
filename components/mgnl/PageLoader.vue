<template>
    <EditablePage
      v-if="content"
      v-bind:content="content"
      v-bind:config="config"
      v-bind:templateDefinitions="templateDefinitions"
    />
</template>

<script>
import config from "../../magnolia.config";
import { helper, EditableMixin } from "@magnolia-services/vue-editor";

function getLanguages() {
  return process.env.VUE_APP_LANGUAGES.split(" ");
}

export function getCurrentLanguage(path) {
  const languages = getLanguages();

  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];

    if (new RegExp("/" + language + "($|/)").test(path)) {
      return language;
    }
  }

  return languages[0];
}
export function getVersion(path) {
  return new URLSearchParams(path).get("mgnlVersion");
}
const getContentUrl = (mgnlpath) => {
  const languages = getLanguages();
  const nodeName = process.env.VUE_APP_SITE_BASENAME;
  const currentLanguage = getCurrentLanguage(mgnlpath);
  let path =
    nodeName +
    mgnlpath.replace(new RegExp("(.*" + nodeName + "|.html)", "g"), "");

  if (currentLanguage !== languages[0]) {
    path = removeCurrentLanguage(path, currentLanguage);
    path += "?lang=" + currentLanguage;
  }

  const version = getVersion(mgnlpath);
  if (version) {
    path +=
      path.indexOf("?") > -1 ? "&version=" + version : "?version=" + version;
  }

  return `${
    version
      ? process.env.VUE_APP_REST_PAGES_PREVIEW
      : process.env.VUE_APP_REST_PAGES
  }${path}`;
};
export default {
  name: "PageLoader",
  mixins: [EditableMixin],
  comments: true,
  data: function () {
    return {
      content: undefined,
      templateDefinitions: {},
      contentUrl: "undefined",
    };
  },
  created() {
    this.config = config;
  },
  methods: {
    async loadPage() {
      try {
        console.log("path");
        this.contentUrl = getContentUrl(this.$route.params.pathMatch);

        console.log('content URL>>>', this.contentUrl);
        
        const contentResponse = await fetch(this.contentUrl);
        const content = await contentResponse.json();        
        if (helper.isEditMode(this.$route.fullPath)) {
          console.log("isch in editor edit mode");
          const templateDefinitionsResponse = await fetch(
            process.env.VUE_APP_REST_TEMPLATE_DEFINITION +
              content["mgnl:template"]
          );
          console.log({templateDefinitionsResponse});
          const templateDefinitions = await templateDefinitionsResponse.json();
          
          this.templateDefinitions = templateDefinitions;
        } else {
          console.log("not in editor eedi tmode schit");
        }
        this.contentUrl = "nbanana";
        
        this.content = content;
      } catch (e) {
        console.log(e)
        console.log("error fechin fpafe");
      }
    },
  },
  async mounted() {
    await this.loadPage();
  },
  async fetch() {
    await this.loadPage();
  },
};
</script>