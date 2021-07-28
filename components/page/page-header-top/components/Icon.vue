<template functional>
  <svg :class="{ [`icon-${props.name}`]:true }" class="icon" >
    <use :xlink:href="`#icon-${props.name}`"></use>
  </svg>
</template>
<script>
export default {
  name : 'Icon',
  props: [ 'name' ]
}
</script>