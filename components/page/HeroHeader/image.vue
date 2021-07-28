<template >
  <header >
    <section class="hero-article p-0 bg-dark position-relative overflow-hidden">
      <img v-if="primaryImageOfPage" :src="primaryImageOfPage.url" alt="props.name" class="bg-image position-md-absolute opacity-80">
      <span class="image-source" />
      <div class="container py-4 height-md-60">
        <div class="row">
          <div class="col-sm-12 col-lg-6 offset-lg-3 padding-55">
            <h1 class="display-4 text-uppercase text-white">
              {{ name }}
            </h1>
          </div>
        </div>
      </div>
    </section>
  </header>
</template>

<script>

export default {
  name    : 'ImageHeroHeader',
  computed: { name, primaryImageOfPage, isMorphMap }
}

function primaryImageOfPage (){
  if (!this.$store.state.page || !this.$store.state.page.current) return ''
  const { primaryImageOfPage } = this.$store.state.page.current

  return primaryImageOfPage
}

function name (){
  if (!this.$store.state.page || !this.$store.state.page.current) return ''
  const { name } = this.$store.state.page.current || { name: '' }

  return name
}

function isMorphMap (){
  if (!this.$store.state.page || !this.$store.state.page.current || !this.$store.state.page.current.primaryImageOfPage) return false
  const { name } = this.$store.state.page.current.primaryImageOfPage

  if (name.includes('morph-map')) return true
  return false
}
</script>
