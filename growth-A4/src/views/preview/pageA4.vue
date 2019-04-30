<template>
    <div class="preview-box">
        <input type="hidden" id="loading" value="" />
        <!--:style="{'width':A4.width+'px','height':A4.height+'px'}"-->
        <div style="position: relative; background-color: gray; overflow: hidden" :style="{'height':document.width/ratioA4+'px'}">



            <!--封面-->
            <div class="design-dimensions c" :class="'cover-id'+allData.coverId"  v-if="type=='cover'" :style="{'transform':'scale('+document.width/designDimensions+')','-webkit-transform':'scale('+document.width/designDimensions+')','-moz-transform':'scale('+document.width/designDimensions+')'}">
                <div class="cover" v-if="cover[allData.coverId]">
                    <div class="title"><h1><span>{{allData.title}}</span></h1><h5>{{allData.kidName}}的成长故事<span>The story of growing up</span>
                    </h5>
                        <div class="remarks" v-html="cover[allData.coverId].remarks"></div>
                    </div>
                    <div class="img" :style="{'background-image':'url('+cover[allData.coverId].icon+')'}"></div>
                </div>
            </div>

            <!--内页-->
            <div v-if="type=='inPage'" class="design-dimensions" :style="{'transform':'scale('+document.width/designDimensions+')','-webkit-transform':'scale('+document.width/designDimensions+')','-moz-transform':'scale('+document.width/designDimensions+')'}">
                <div class="page-title" v-if="(dataBase.id %2)!=0"><font>{{dataBase.data[0].createAt | formatDate('YYYY-MM')}}</font><span>{{dataBase.id}}</span></div>
                <div class="page-title" v-if="(dataBase.id % 2)==0"><font>{{dataBase.id}}</font><span>{{dataBase.data[0].createAt | formatDate('YYYY-MM')}}</span></div>
                <div class="content">
                    <div class="record-list" v-for="(item,index) in dataBase.data" v-if="item.text||item.files.length>0">
                        <div class="time">
                            {{item.createAt | formatDate('DD')}}<span>{{item.createAt | formatDate('HH:ss')}}</span>
                            <div class="qrcode" v-if="setQrCode(item,index)">
                                <div class="code"></div>
                            </div>
                        </div>
                        <div class="text" v-if="item.text">{{item.text}}</div>
                        <div class="img-list">
                            <dl>
                                <dd v-for="item2 in item.files" :style="{'width':item2.picWidth+'px','height':item2.picHeight+'px',
                                'background-image':'url('+(item2.type=='v'?(item2.url+'/i'):item2.url)+')'}" :class="{'oneHeight':item2.class=='oneHeight'}">
                                    <img src="images/video.png" width="60" v-if="item2.type=='v'"/>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>


            <!--封底-->
            <div class="design-dimensions c" :class="'cover-id'+allData.coverId"  v-if="type=='backCover'" :style="{'transform':'scale('+document.width/designDimensions+')','-webkit-transform':'scale('+document.width/designDimensions+')','-moz-transform':'scale('+document.width/designDimensions+')'}">
                <div class="back-cover" v-if="cover[allData.coverId]">
                    <div class="b-img"><img :src="'images/back-cover'+allData.coverId+'.png'"></div>
                    <div class="b-text"><h1><span>{{allData.title}}</span></h1><h5>{{allData.userName}} 著</h5>
                        <p>内文字做&nbsp;&nbsp;&nbsp;{{allData.userName}}<br>插&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图&nbsp;&nbsp;&nbsp;{{allData.userName}}<br>字&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数&nbsp;&nbsp;&nbsp;很多<br>定&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价&nbsp;&nbsp;&nbsp;无价
                        </p></div>
                </div>

            </div>



        </div>
    </div>
</template>

<script>
    import {Popup, Toast, Indicator} from 'mint-ui';

    export default {
        components: {

        },
        data() {
            return {
                allData:{
                    coverId:0
                },
                type:'cover',
                cover:{
                    1:{
                        icon:'images/default1.png',
                        remarks:'童年是风，吹来朵朵天云；童年是云，化作新春的雨；童年是雨，滋润初生的花；童年是花，伴我暮看晚霞。<br />身处童年，我们每天都在编织着美丽的故事。一只昆虫，一个玩具，一次发现，一场争执……看起来微不足道，却包含着我们的快乐，梦想和追求。童年的有趣故事，是生命中一个个动人的音符，请和我一起拨动记忆的齿轮，奏响成长的乐章……  ',
                    },
                    2:{
                        icon:'images/default2.png',
                        remarks:'',
                    },
                    3:{
                        icon:'images/default3.png',
                        remarks:'童年的趣事如同颗颗闪闪发亮的星星，使我的童年更加美好难忘<br />每当我劳作的时候，或者掩卷沉思，或者在甜美的梦境中，眼前总会浮现出童<br />年的情景，一阵阵欢笑声萦绕在耳边。<br /> 时间在流淌，万物在变换，不变的是那童年时的阵阵欢声笑语……',
                    },
                    4:{
                        icon:'images/default4.png',
                        remarks:'童年是一首赞美诗，天真活泼无忧无虑；童年是一首幻想曲，遥想未来充满希望。',
                    },
                    5:{
                        icon:'images/default5.png',
                        remarks:'',
                    },
                    6:{
                        icon:'images/zz.png',
                        fixedImg:true,
                        remarks:'童年是风，吹来朵朵天云；童年是云，化作新春的雨；童年是雨，滋润初生的花；童年是花，伴我暮看晚霞。身处童年，我们每天都在编织着美丽的故事。一只昆虫，一个玩具，一次发现，一场争执……看起来微不足道，却包含着我们的快乐，梦想和追求。童年的有趣故事，是生命中一个个动人的音符，请和我一起拨动记忆的齿轮，奏响成长的乐章……  ',
                    },
                    7:{
                        icon:'images/default7.png',
                        fixedImg:true,
                        remarks:'童年是风，吹来朵朵天云；童年是云，化作新春的雨；童年是雨，滋润初生的花；童年是花，伴我暮看晚霞。身处童年，我们每天都在编织着美丽的故事。一只昆虫，一个玩具，一次发现，一场争执……看起来微不足道，却包含着我们的快乐，梦想和追求。童年的有趣故事，是生命中一个个动人的音符，请和我一起拨动记忆的齿轮，奏响成长的乐章……  ',
                    },
                    8:{
                        icon:'images/default8.png',
                        fixedImg:true,
                        remarks:'童年是风，吹来朵朵天云；童年是云，化作新春的雨；童年是雨，滋润初生的花；童年是花，伴我暮看晚霞。身处童年，我们每天都在编织着美丽的故事。一只昆虫，一个玩具，一次发现，一场争执……看起来微不足道，却包含着我们的快乐，梦想和追求。童年的有趣故事，是生命中一个个动人的音符，请和我一起拨动记忆的齿轮，奏响成长的乐章……  ',
                    },
                },
                dataBase: {
                    "id": 3,
                    "data": [{
                        "pageId": "",
                        "createAt":'' ,
                        "creator": "",
                        "files": [],
                        "text": "",
                        "app": "jia"
                    }]
                },
                pageIndex:null,
                A4:{
                    width:2480,
                    height:3508
                },
                designDimensions: 690,//设计稿的宽
                ratioA4: 210 / 297,
                document:{
                    width:this.$store.state.windowWidth
                },
                documentRatio: this.$store.state.windowWidth / this.$store.state.windowHeight,
            }
        },
        filters: {
            formatDate(date, str) {
                return moment(date).format(str);
            }
        },
        computed: {

        },
        methods: {
            setQrCode(arr,index){
                if(arr){
                    let bool=false;
                    if(this.isVideo(arr.files)){
                        bool=true;
                        $(".record-list:eq("+index+") .code").html('')
                        console.log(window.location.host)
                        var url = "http://"+window.location.host+"/v.html?id="+this.$route.query.dataId+'&p='+this.$route.query.page+'&i='+index;
                        this.$nextTick(() => {
                            new QRCode($(".record-list:eq("+index+") .code").get(0), {
                                text: url,
                                width: 220,
                                height: 220,
                                colorDark : '#000000',
                                colorLight : '#ffffff',
                                correctLevel: QRCode.CorrectLevel.L
                            });
                        })

                    }
                    return bool
                }

            },
            isVideo(arr){
                let bo=false;
                for(let i in arr){
                    if(arr[i].type=='v'){
                        bo=true;
                        break;
                    }
                }
                return bo;
            },

            imgLoad(){

                let imgCount=0;
                let loadingComplete=0;
                for(let i in this.dataBase.data){
                    let da=this.dataBase.data[i];
                    for(let j in da.files){
                        imgCount++;
                        let da2=da.files[j];
                        let img=new Image();
                        let url=da2.type=='v'?(da2.url+'/i'):da2.url;
                        img.src=url;
                        img.onload=function () {
                            loadingComplete++;
                            if(imgCount==loadingComplete){
                                console.log(imgCount,loadingComplete)
                                $("#loading").val("complete")
                            }
                        }
                        img.onerror=function () {
                            loadingComplete++;
                            if(imgCount==loadingComplete){
                                console.log(imgCount,loadingComplete)
                            }
                        }
                    }
                }
                if(imgCount==0){
                    $("#loading").val("complete")
                }
                console.log(imgCount)

            },
            imgLoadComplut(url){
                let img=new Image();
                img.src=url;
                img.onload=function () {
                    $("#loading").val("complete")
                }
                img.error=function () {
                    $("#loading").val("complete")
                }
            },
            getData(index){
                let that = this;
                let dataId=this.$route.query.dataId;
                $_get("/2/system/gb/order/data?dataId="+dataId).then(function (res) {
                    that.allData=res;
                    res.data=JSON.parse(res.data);
                    console.log(res.data)
                    let coverId=res.coverId;
                    if(res.icon&&!that.cover[coverId].fixedImg){
                        that.cover[coverId].icon=res.icon;
                    }
                    that.dataBase= res.data[index-1];
                    that.$nextTick(() => {

                        if(that.type=='cover'){
                            that.imgLoadComplut(that.allData.cover);
                        }
                        if(that.type=='backCover'){
                            that.imgLoadComplut('images/back-cover'+coverId+'.png');
                        }
                        if(that.type=='inPage'){
                            that.imgLoad()
                        }
                    })




                }).catch((error)=>{
                    console.log(error)
                    Toast(error.msg)
                })

            }
        },
        mounted(){

        },
        watch:{
            $route(){
                this.pageIndex=this.$route.query.page?this.$route.query.page:1;
                this.type=this.$route.query.type;
                console.log(this.pageIndex)
                this.getData(this.pageIndex);
            },
        },
        created() {
            this.pageIndex=this.$route.query.page?this.$route.query.page:1;
            this.type=this.$route.query.type;
            this.getData(this.pageIndex);

        }
    }
</script>
<style lang="scss">
    .qrcode{ width: 60px; height: 60px; background-color: #d4d4d4; margin-top: 16px; transform: scale(0.272727);transform-origin: 0 0;}
    .qrcode .code{ transform-origin: 0 0;}
    .preview-box {
        position: relative;
        height: 100%;
        text-align: left;
    }

    .ratio-a4 {
        overflow: hidden; box-shadow:0 2px 6px rgba(0, 0, 0, 0.06) ;
    }

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center
    }

    .design-dimensions {
        width: 690px;
        height: 976px;
        background: #fff;
        position: relative;
        padding: 4px 56px;
        transform-origin: 0 0;
        .page-title {
            line-height: 50px;
            font-size: 16px;
            border-bottom: 2px solid rgba(0, 0, 0, 0.12);
            overflow: hidden;
            span {
                float: right
            }
        }
        .content {
            height: 900px;
            position: relative;
            .record-list {
                position: relative;
                padding-top: 48px; min-height: 105px;
                .text {
                    font-size: 18px;
                    line-height: 30px;
                    padding: 0px 0 0 80px;
                    word-break: break-all;
                }
            }
            .time {
                width: 60px;
                font-size: 22px;
                color: rgba(251, 169, 32, 1);
                text-align: center;
                position: absolute;
                top: 48px;
                left: 0px;
                span {
                    display: block;
                    line-height: 26px;
                    font-size: 16px;
                    color: #fff;
                    background: rgba(251, 169, 32, 1);
                    text-align: center;
                    border-radius: 20px;
                }
            }
            .img-list {
                dl {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    padding-left: 80px
                }
                dd {
                    position: relative;
                    background: rgba(236, 236, 236, 1) no-repeat center 0;
                    min-height: 20px;
                    width: 50%;
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-size: cover; max-height: 820px;
                    &.oneHeight{
                        background-size: auto 100%; background-color: transparent;
                    }
                }
            }
        }
        .cover{ position: relative; height: 100%}
        &.cover-id1{
            background-color:#fff; font-size: 10px; color: #68A127FF;
            padding:0 ;
            .cover{
                background: url("../../../public/images/cover1-tag.png") no-repeat 54px 278*2px; background-size: 12px auto;
            }
            .title{
                padding:547px 56px 0 87*2px;
                h1{
                    font-size:36px ;color: rgba(0, 0, 0, 0.87); text-align: left;white-space: nowrap;
                    span{display: inline-block; transform-origin: 0 0}
                }
                h5{
                    font-size:14px ;color: rgba(0, 0, 0, 0.87);padding-top: 12px; text-align: left;
                    span{
                        margin-left: 10px;display: inline-block;
                    }
                }
                .remarks{ font-size: 10px;color: rgba(0, 0, 0, 0.67);padding-top: 54px; line-height: 21px; text-align: left}
            }
            .img{
                width: 291*2px; height:218*2px; background: no-repeat center center; background-size: cover; position: absolute; left: 54px; top: 54px;
            }
            .b-img{
                text-align: center; padding-top: 200px;
                img{width: 584px}
            }
            .b-text{
                position: absolute; bottom:48px ; left: 56px; right: 56px;
                h1{
                    font-size:32px ;color: rgba(0, 0, 0, 0.87);
                }
                h5 {
                    font-size: 18px;
                    color: rgba(0, 0, 0, 0.87);
                    padding-top: 12px;
                }
                p{
                    color: rgba(0, 0, 0, 0.87);font-size: 16px; padding-top: 28px; line-height: 22px;
                }
            }
        }
        &.cover-id2{
            background-color:#fff; font-size: 10px; color: #68A127FF;
            padding:0 ;
            .cover{
                background: url("../../../public/images/cover2.png") no-repeat 0 0; background-size: 690px auto;
            }
            .title{
                padding:417*2px 56px 0 56px;
                h1{
                    font-size:36px ;color: rgba(0, 0, 0, 0.87); text-align: center;white-space: nowrap;
                    span{display: inline-block; transform-origin: 0 0}
                }
                h5{
                    font-size:14px ;color: rgba(0, 0, 0, 0.87);padding-top: 12px; text-align: center;
                    span{
                        margin-left: 10px;display: inline-block;
                    }
                }
                .remarks{ font-size: 10px;color: rgba(0, 0, 0, 0.67);padding-top: 54px; line-height: 21px; text-align: center}
            }
            .img{
                width: 289*2px; height:385*2px; background: no-repeat center center; background-size: cover; position: absolute; left: 62px; top: 40px;
            }
            .b-img{
                text-align: center; padding-top: 200px;
                img{width: 584px}
            }
            .b-text{
                position: absolute; bottom:48px ; left: 56px; right: 56px;
                h1{
                    font-size:32px ;color: rgba(0, 0, 0, 0.87);
                }
                h5 {
                    font-size: 18px;
                    color: rgba(0, 0, 0, 0.87);
                    padding-top: 12px;
                }
                p{
                    color: rgba(0, 0, 0, 0.87);font-size: 16px; padding-top: 28px; line-height: 22px;
                }
            }
        }
        &.cover-id3{
            background-color:#fff; font-size: 10px; color: #68A127FF;
            padding:0 ;
            .title{
                padding: 322*2px 76px 0 76px;
                h1{
                    font-size:40px ;color: rgba(0, 0, 0, 0.87); text-align: center;white-space: nowrap;
                    span{display: inline-block; transform-origin: 0 0}
                }
                h5{
                    font-size:14px ;color: rgba(0, 0, 0, 0.87);padding-top: 12px; text-align: center;
                    span{
                        margin-left: 10px;display: inline-block;
                    }
                }
                .remarks{ font-size: 10px;color: rgba(0, 0, 0, 0.67);padding-top: 54px; line-height: 21px; text-align: center}
            }
            .img{
                width: 269*2px; height:  269*2px; background: no-repeat center center; background-size: cover; position: absolute; left: 76px; top: 74px;
            }
            .b-img{
                text-align: center; padding-top: 200px;
                img{width: 584px}
            }
            .b-text{
                position: absolute; bottom:48px ; left: 56px; right: 56px;
                h1{
                    font-size:32px ;color: rgba(0, 0, 0, 0.87);
                }
                h5 {
                    font-size: 18px;
                    color: rgba(0, 0, 0, 0.87);
                    padding-top: 12px;
                }
                p{
                    color: rgba(0, 0, 0, 0.87);font-size: 16px; padding-top: 28px; line-height: 22px;
                }
            }
        }
        &.cover-id4{
            background-color:#fff; font-size: 10px; color: #68A127FF;
            padding:0 ;
            .cover{
                background: url("../../../public/images/cover4.png") no-repeat 0px 0px; background-size: 100% auto;
            }
            .title{
                padding:31*2px 52px 0 26*2px; text-align: center;
                h1{
                    font-size:36px ;color: rgba(0, 0, 0, 0.87); text-align: center;white-space: nowrap;
                    span{display: inline-block; transform-origin: 0 0}
                }
                h5{
                    font-size:14px ;color: rgba(114, 110, 83, 1); text-align: center; margin-top: 321*2px; display: inline-block; line-height: 50px; padding: 0 15px;
                    border: 2px solid rgba(114, 110, 83, 1);
                    span{
                        margin-left: 10px;display: inline-block;
                    }
                }
                .remarks{ font-size: 10px;color: rgba(0, 0, 0, 0.67);padding-top: 24px; line-height: 21px; text-align: center}
            }
            .img{
                width: 293*2px; height:293*2px; background: no-repeat center center; background-size: cover; position: absolute; left: 52px; top: 66*2px;
            }
            .b-img{
                text-align: center; padding-top: 200px;
                img{width: 584px}
            }
            .b-text{
                position: absolute; bottom:48px ; left: 56px; right: 56px;
                h1{
                    font-size:32px ;color: rgba(0, 0, 0, 0.87);
                }
                h5 {
                    font-size: 18px;
                    color: rgba(0, 0, 0, 0.87);
                    padding-top: 12px;
                }
                p{
                    color: rgba(0, 0, 0, 0.87);font-size: 16px; padding-top: 28px; line-height: 22px;
                }
            }
        }
        &.cover-id5{
            background-color:#fff; font-size: 10px; color: #68A127FF;
            padding:0 ;
            .cover{
                background: url("../../../public/images/cover5.png") no-repeat 0px 0px; background-size: 100% auto;
            }
            .title{
                padding:70*2px 39*2px 0 39*2px; text-align: center;
                h1{
                    font-size:48px ;color: rgba(0, 0, 0, 0.87); text-align: center;white-space: nowrap;
                    span{display: inline-block; transform-origin: 0 0}
                }
                h5{
                    font-size:14px ;color: rgba(0, 0, 0, 0.87);padding-top: 2px; text-align: center;
                    span{
                        margin-left: 10px;display: inline-block;
                    }
                }
                .remarks{ font-size: 10px;color: rgba(0, 0, 0, 0.67);padding-top: 24px; line-height: 21px; text-align: center}
            }
            .img{
                width: 268*2px; height:268*2px; background: no-repeat center center; background-size: cover; position: absolute; left: 39*2px; top: 123*2px;
            }
            .b-img{
                text-align: center; padding-top: 200px;
                img{width: 584px}
            }
            .b-text{
                position: absolute; bottom:48px ; left: 56px; right: 56px;
                h1{
                    font-size:32px ;color: rgba(0, 0, 0, 0.87);
                }
                h5 {
                    font-size: 18px;
                    color: rgba(0, 0, 0, 0.87);
                    padding-top: 12px;
                }
                p{
                    color: rgba(0, 0, 0, 0.87);font-size: 16px; padding-top: 28px; line-height: 22px;
                }
            }
        }
        &.cover-id6{
            background-color: rgba(249, 250, 215, 1); font-size: 10px; color: #68A127FF;
            padding:0 ;
            .title{
                padding: 114px 82px 0 82px; color: #68A127FF;
                h1{
                    font-size:40px ;color: #68A127FF;  white-space: nowrap;
                    span{display: inline-block; transform-origin: 0 0}
                }
                h5{
                    font-size:20px ;color: #68A127FF;padding-top: 12px;
                    span{
                        display: none;
                    }
                }
                .remarks{ font-size: 10px;color: #68A127FF;padding-top: 36px; line-height: 20px}
            }
            .img{
                margin:90px 0 0 82px;width: 558px; height: 492px; background: no-repeat center center; background-size: cover;
            }
            .b-img{
                text-align: center; padding-top: 200px;
                img{width: 584px}
            }
            .b-text{
                position: absolute; bottom:48px ; left: 56px; right: 56px;
                h1{
                    font-size:32px ;color: #68A127FF;
                }
                h5 {
                    font-size: 18px;
                    color: #68A127FF;
                    padding-top: 12px;
                }
                p{
                    color: #68A127FF;font-size: 16px; padding-top: 28px; line-height: 22px;
                }
            }

        }
        &.cover-id7{
            background-color: rgba(255, 233, 212, 1); font-size: 10px; color: #68A127FF;
            padding:0 ;
            .title{
                padding: 53*2px 34*2px 0 48*2px; color: rgba(174, 107, 51, 1); text-align: right;
                h1{
                    font-size:40px ;color: rgba(174, 107, 51, 1);  white-space: nowrap;
                    span{display: inline-block; transform-origin: 0 0}
                }
                h5{
                    font-size:20px ;color: rgba(174, 107, 51, 1);padding-top: 12px;
                    span{
                        display: none;
                    }
                }
                .remarks{ font-size: 10px;color: rgba(174, 107, 51, 1);padding-top: 36px; line-height: 20px}
            }
            .img{
                margin:90px 0 0 22px;width: 595px; height: 525px; background: no-repeat center center; background-size: cover;
            }
            .b-img{
                text-align: center; padding-top: 200px;
                img{width: 584px}
            }
            .b-text{
                position: absolute; bottom:48px ; left: 56px; right: 56px;
                h1{
                    font-size:32px ;color: rgba(174, 107, 51, 1);
                }
                h5 {
                    font-size: 18px;
                    color: rgba(174, 107, 51, 1);
                    padding-top: 12px;
                }
                p{
                    color: rgba(174, 107, 51, 1);font-size: 16px; padding-top: 28px; line-height: 22px;
                }
            }

        }
        &.cover-id8{
            background-color: rgba(255, 227, 239, 1); font-size: 10px; color: rgba(209, 90, 116, 1);
            padding:0 ;
            .title{
                padding: 53*2px 34*2px 0 48*2px; color: rgba(209, 90, 116, 1); text-align: right;
                h1{
                    font-size:40px ;color: rgba(209, 90, 116, 1);  white-space: nowrap;
                    span{display: inline-block; transform-origin: 0 0}
                }
                h5{
                    font-size:20px ;color: rgba(209, 90, 116, 1);padding-top: 12px;
                    span{
                        display: none;
                    }
                }
                .remarks{ font-size: 10px;color: rgba(209, 90, 116, 1);padding-top: 36px; line-height: 20px}
            }
            .img{
                margin:10px 0 0 38px;width: 518px; height: 664px; background: no-repeat center center; background-size: cover;
            }
            .b-img{
                text-align: center; padding-top: 200px;
                img{width: 584px}
            }
            .b-text{
                position: absolute; bottom:48px ; left: 56px; right: 56px;
                h1{
                    font-size:32px ;color: rgba(209, 90, 116, 1);
                }
                h5 {
                    font-size: 18px;
                    color: rgba(209, 90, 116, 1);
                    padding-top: 12px;
                }
                p{
                    color: rgba(209, 90, 116, 1);font-size: 16px; padding-top: 28px; line-height: 22px;
                }
            }

        }
    }
    .fixed-edit{
        background-color: rgba(0, 0, 0, 0.5); position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 99; display: flex; justify-content: center; align-items: center;
        a{
            color: #fff; width: 178*2px; height: 46*2px; line-height:87px ; font-size: 28px; text-align: center; border: 2px solid #fff; display: block; border-radius: 55px;
            background: url("../../../public/images/eidt-cover.png") no-repeat 90px center; padding-left: 40px;
        }
    }

</style>