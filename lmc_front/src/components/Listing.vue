<template>
    <div class="col-sm-6 col-md-4 col-lg-3">
        
            <div class="my-card">
                <div class="my-img-cont" ref="imgcont" v-bind:style="{ 'background-image': 'url(' + listing.image + ')' }">
<!--                <img class="my-img" :src="listing.image" ref="img">-->
                </div>
                
                <div class="my-card-body">
                    <h5 class="card-title">{{listing.title}}</h5>
                    <p class="card-text" ref="text">{{listing.description}}</p>
                </div>
                
                <div class="my-card-timestamp">
                    {{listing.createdAt}}
                </div>
            </div>
        
    </div>
</template>

<script>
    export default {
        name: 'Listing',
        props: ['listing'],
        created: function() {
            console.log(this.listing);
        }
    }
    //window.addEventListener('resize', this.handleImages)
    //this.handleImages();
    /*
        handleImages: function() {
            let myimg = this.$refs.img;
            let myimgcont = this.$refs.imgcont;
            let ratio = myimgcont.offsetWidth / myimgcont.offsetHeight;

            if (myimg.width / myimg.height > ratio) {
                myimg.style.height = "100%";
                let diff = (myimg.wifth - myimgcont.offsetWidth) / 2;
                myimg.style.transform = "translateX(-" + diff + "px)";
            } else {
                myimg.style.width = "100%";
                let diff = (myimg.height - myimgcont.offsetHeight) / 2;
                myimg.style.transform = "translateY(-" + diff + "px)";
            }
        }
    }
    */

</script>

<style>
    .my-card {
        margin-bottom: 20px;
    }

    .my-card-body {
        padding: 1.25rem;
        height: 6.7rem;
        overflow: hidden;

    }

    .my-img-cont {

        height: 10rem;
        width: auto;
        overflow: hidden;

        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        /*        overflow: hidden;*/
        border-top-left-radius: calc(0.25rem - 1px);
        border-top-right-radius: calc(0.25rem - 1px);
    }

    .my-img {}

    .my-card-timestamp {
        padding: 0.75rem 1.25rem;
        background-color: rgba(0, 0, 0, 0.03);
        border-top: 1px solid rgba(0, 0, 0, 0.125);

    }

</style>
