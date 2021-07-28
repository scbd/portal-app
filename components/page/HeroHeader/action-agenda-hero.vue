<template >
  <header class="container-fluid">
    <div  class="row m-0 p-0" >
      <div class="col-md-6 left px-0" style="min-height: 450px;">
        <div class="absolute-center">
          
          <div class="box">
            <h1 style="color:#009b48">{{$t('COP15: Join the Action Agenda')}}</h1>
            <div >
              {{$t('Reversing biodiversity loss requires action from all segments of society!')}}

              {{$t('It’s in everyone’s best interest to take action and put biodiversity on a path to recovery by 2030!Take leadership and inspire others to safeguard, restore and invest in biodiversity.')}}
            </div>
            <div>
              
              <a href="https://www.cbd.int/action-agenda/contribute" class="summit-button mt-4 button js-form-submit form-submit btn btn-primary form-control but-size pt-2" >
                {{$t('Make your commitment!')}}
              </a>
              <a href="https://www.cbd.int/action-agenda/faq.shtml" class="summit-button mt-4 button js-form-submit form-submit btn btn-primary form-control but-size pt-2" >
                {{$t('Frequently asked questions')}}
              </a>
            </div>
          </div>

        </div>
      </div>
      <div class="col-md-6" style="background-color: #134059;">
        <a href="https://www.cbd.int/action-agenda/contributions">
          <img class="img-fluid"  src="~/assets/map.png"/>
        </a>

      </div>
    </div>
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

<style scoped>
  .but-size{
    font-size: 1.3rem;
  }
  header {
    min-height: 350px;
    font-size: 1.5rem;
  }
  h1 {
    font-size: 2rem !important;
  }
  .left{
    background-color: #01463A;
    height: 350px;
    position: relative;
  }
  .right{
    background-color: #BBDEFB;
    height: 350px;
    position: relative;
  }
  .absolute-center {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 350px;
  }
  .box{
    max-width: 80%;
    font-size: 1.257rem;
    text-align: left;
    color:aliceblue;
  }
  @media (min-width: 768px) {
    img{ max-height: 545px; }
    h1{ font-size: 2.5 rem;}
  }
  
  @media (min-width: 992px) {
    img{ max-height: 545px; }
    h1{ font-size: 2.5 rem;}
  }

  @media (min-width: 1200px) {
    h1{ font-size: 2.5 rem;}
    .box{
      max-width: 40%;
    }
    .absolute-center {
      height: 550px;
    }
    .left{
      height: 550px;
    }
    .right{
      height: 550px;
    }
  }
</style>