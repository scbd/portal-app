<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>E-Learning</h2>
      </div>
      <div class="col-12">
        <h3>Course Categories</h3>
      </div>
      <div class="col-12">

      <Accordion :length="categories.length">
        <template v-for="({ name }, index) in categories"  v-slot:[`header-${index}`]="" >
          <span v-bind:key="index"> {{ name }}</span>
        </template>

        <template v-for="({ courses }, index) in categories"  v-slot:[`body-${index}`]="" >
          <ul v-bind:key="index">
            <li v-for="({ name, url }, i) in courses" :key="i">
              <a :href="url">
                {{name}}
              </a>
            </li>
          </ul>
        </template>
      </Accordion >

      </div>
    </div>
  </div>
</template>
<script>
import Accordion from '~/components/accordion'

export default {
  name      : 'ELearningWidget',
  components: { Accordion },
  data
}

function data(){
  return {
    categories: [
      {
        name   : 'Access to Genetic Resources and Benefit-sharing',
        courses: [
          { name: 'Introduction to Access and Benefit-sharing', url: 'https://scbd.unssc.org/course/view.php?id=135' },
          { name: 'Establishing Measures to Implement the Nagoya Protocol', url: 'https://scbd.unssc.org/course/view.php?id=14' },
          { name: 'Introduction to the Abs Clearing-house', url: 'https://scbd.unssc.org/course/view.php?id=95' }
        ]
      },
      {
        name   : 'Biosafety',
        courses: [
          { name: 'Mainstreaming Biosafety', url: 'https://scbd.unssc.org/course/index.php?categoryid=14' },
          { name: 'Nagoya - Kuala Lumpur Supplementary Protocol on Liability and Redress', url: 'https://scbd.unssc.org/course/index.php?categoryid=41' },
          { name: 'Public Awareness, Education and Participation', url: 'https://scbd.unssc.org/course/index.php?categoryid=9' },
          { name: 'Handling, Transport, Packaging, and Identification of LMOs', url: 'https://scbd.unssc.org/course/index.php?categoryid=39' }
        ]
      },
      {
        name   : 'Economics, Trade and Biodiversity',
        courses: [
          { name: 'Biodiversity Valuation', url: 'https://scbd.unssc.org/course/index.php?categoryid=7' },
          { name: 'Sustainable Consumption and Production', url: 'https://scbd.unssc.org/course/view.php?id=114' }
        ]
      }
    ]
  }
}
</script>

<style scoped>
  li > a{
      font-size: 16px;
    letter-spacing: .025em;
    line-height: 20px;
    color: #00483a;
    font-weight: 400;
  }
  .accord-button{
    box-sizing: border-box;
    float: right;
    width: 50px;
    height: 50px;
    background: #009b48 url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNS4yNiIgaGVpZ2h0PSI5LjE2Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTUuMjYgMS41M0wxMy43NCAwIDcuNjMgNi4xMSAxLjUzIDAgMCAxLjUzbDcuNjMgNy42MyA3LjYzLTcuNjN6Ii8+PC9zdmc+) no-repeat center;
  }
</style>
