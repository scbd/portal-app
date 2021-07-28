<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6">
        <BiocapsWidget />
      </div>
      <div class="col-sm-6 mb-3 mb-lg-0">
        <ELearningWidget  />
      </div>
      <div class="col-sm-12 mb-3">
        <UpdatesWidget />
      </div>
    </div>
  </div>
</template>
<script>

import ELearningWidget from '~/components/widgets/cb/e-learning/index'
import BiocapsWidget from '~/components/widgets/cb/biocaps/index'

export default {
  name      : 'CbHomeGrid',
  components: {
    BiocapsWidget, ELearningWidget,
    UpdatesWidget: () => import('~/components/widgets/updates/index')
  }
}
</script>