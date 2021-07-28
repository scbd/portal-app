<template>
  <nav v-if="canEdit()" class="tabs" role="navigation" aria-label="Tabs">
    <ul class="nav nav-tabs primary">
      <li class="active nav-item">
        <nuxt-link :to="routePath" class="nav-link active">
          View
        </nuxt-link>
      </li>
      <li class="nav-item">
        <a :href="`https://www.cbd.int/node/${drupalNodeId}/edit`" target="_blank" class="nav-link">Edit</a>
      </li>
      <li class="nav-item">
        <a :href="`https://www.cbd.int/node/${drupalNodeId}/delete`" target="_blank" class="nav-link">Delete</a>
      </li>
      <li class="nav-item">
        <a :href="`https://www.cbd.int/node/${drupalNodeId}/revisions`" target="_blank" class="nav-link">Revisions</a>
      </li>
      <li class="nav-item">
        <a :href="`https://www.cbd.int/node/${drupalNodeId}/translations`" target="_blank" class="nav-link">Translate</a>
      </li>
    </ul>
  </nav>
</template>
<script>
import { ADMIN_ROLE } from '~/components/process-env'

export default {
  name    : 'EditorControls',
  computed: {  drupalNodeId, routePath },
  methods : { canEdit }
}


function canEdit (){ return this.$me.hasRole(ADMIN_ROLE) }

function drupalNodeId (){ return this.$store.getters['page/getNodeId'] }

function routePath (){ return this.$route.path }

</script>
