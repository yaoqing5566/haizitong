<template>
    <div class="preview-box" :style="{'min-height':$store.state.windowHeight+'px'}" style="overflow: hidden">
        <!--<div class="none-data" style="display: none">没有符合的数据</div>-->
        <div class="swiper-container">
            <div class="swiper-wrapper">

            </div>
        </div>

        <div class="text-mould"></div>
        <div class="text-cover"></div>
    </div>
</template>

<script>
    import {Popup, Toast, Indicator} from 'mint-ui';


    export default {
        components: {
            Popup,
            Toast,
            Indicator
        },
        data() {
            return {
                dates:[],
                cover:{
                    coverId:'1',
                    kidName:'',
                    userName:'',
                    shopIcon:'',
                    title:'成长故事标题',
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
                isOneInt:true,
                dataBase: {},
                newDataBase: [],
                designDimensions: 690,//设计稿的宽
                designContentWidth: 498,//设计稿内容宽
                ratioA4: 210 / 297,
                documentRatio: this.$store.state.windowWidth / this.$store.state.windowHeight,
                temporary:'',
                mySwiper:''
            }
        },
        filters: {
            formatDate(date, str) {
                return moment(date).format(str);
            },

        },
        computed: {
            setObjA4() {
                let width = this.$store.state.windowWidth - 20;
                let height = width / this.ratioA4;
                if (this.documentRatio > this.ratioA4) {
                    height = this.$store.state.windowHeight - 20;
                    width = this.ratioA4 * height;
                }
                return {
                    w: width,
                    h: height
                }
            }
        },
        methods: {
            formatDate(date, str) {
                return moment(date).format(str);
            },
            isTimeFrame(createAt,times){
                for(let i in times){
                    let t=times[i];
                    let statTime= moment(new Date(t)).startOf('month').format('YYYY/MM/DD')+" 00:00:00";
                    let endTime= moment(new Date(t)).endOf('month').format('YYYY/MM/DD')+" 23:59:59";
                    statTime=new Date(statTime).getTime();
                    endTime=new Date(endTime).getTime();
                    if(createAt>=statTime&&createAt<=endTime){
                        return true;
                    }
                }
                return false;
            },
            filtersTime(data,times){
                let datas=[];
                for (let i in data){
                    let createAt=data[i].createAt;
                    if(this.isTimeFrame(createAt,times)){
                        datas.push(data[i])
                    }
                }
                return datas;
            },
            restData(times,indexDate) {
                this.newDataBase=[];
                let records = this.dataBase;
                if(times){
                    records=this.filtersTime(records,times);
                    console.log(records)
                }
                records=records.sort(function (a,b) {
                    return a.createAt-b.createAt;
                })
                for (let i in records) {
                    let da = records[i];
                    if(!da.deleted){
                        this.computedHeight(da)
                    }

                }
                this.addSwiper(indexDate);
                callNative("pageCount",1,this.newDataBase.length,'')

            },
            computedHeight(data) {
                let lisPaddingTop = 48;
                let lastArrChild=this.newDataBase[this.newDataBase.length-1];
                let page=1;
                let pushDate={
                    id:page,
                    date:moment(data.createAt).format('YYYY-MM'),
                    height:lisPaddingTop,
                    data:[]
                }
                if(lastArrChild){
                    let dateStr=moment(lastArrChild.data[0].createAt).format('YYYY-MM');
                    let dqDateStr=moment(data.createAt).format('YYYY-MM');
                    if(dateStr==dqDateStr){
                        pushDate=lastArrChild;
                        pushDate.height=pushDate.height+lisPaddingTop;
                    }else {
                        pushDate.id=lastArrChild.id+1
                        this.newDataBase.push(pushDate);
                    }

                }else {
                    this.newDataBase.push(pushDate);
                }

                //以下是高度计算
                $(".text-mould").text(data.text);

                let textHeight = 0;//文字高度
                let dqData=JSON.parse(JSON.stringify(data));

                if (dqData.text) {
                    textHeight = $(".text-mould").height();
                }
                console.log('textHeight:'+textHeight)
                if(dqData.text||dqData.files.length>0){
                    if((pushDate.height+textHeight>850)&&textHeight<800){  //注意下 这里文字超过800是会被隐藏的
                        pushDate={
                            id:this.newDataBase[this.newDataBase.length-1].id+1,
                            height:textHeight+lisPaddingTop,
                            date:moment(data.createAt).format('YYYY-MM'),
                            data:[]
                        }
                        dqData=JSON.parse(JSON.stringify(data));
                        dqData.files=[];
                        this.newDataBase.push(pushDate);
                    }else {
                        pushDate.height += textHeight<57?57:textHeight;
                    }

                    pushDate.data.push(dqData)
                }

                dqData.files=[];
                //图片
                let imgs = data.files?data.files:[];
                let i = 0;

                for (i; i < imgs.length; i++) {
                    var files=[];
                    let rowImgs1 = JSON.parse(JSON.stringify(imgs[i]));
                    rowImgs1.class = "left";
                    let imgHeight = 0;  //图片高度
                    if (imgs[i + 1]) {
                        let rowImgs2 = JSON.parse(JSON.stringify(imgs[i + 1]));
                        rowImgs2.class = "right";
                        let imgObj = this.resetSize(rowImgs1, rowImgs2);
                        rowImgs1.picHeight = imgObj.height;
                        rowImgs2.picHeight = imgObj.height;
                        rowImgs1.picWidth = imgObj.width1;
                        rowImgs2.picWidth = imgObj.width2;
                        imgHeight = imgObj.height+10;
                        files.push(rowImgs1)
                        files.push(rowImgs2)
                        i++;
                    } else {
                        rowImgs1.class = "one";
                        let rowRadtio = 1;
                        if (rowImgs1.picHeight) {
                            rowRadtio = imgs[i].picWidth / rowImgs1.picHeight
                        }
                        rowImgs1.picWidth = this.designContentWidth;
                        rowImgs1.picHeight = rowImgs1.picWidth / rowRadtio;
                        rowImgs1.picHeight=rowImgs1.picHeight;
                        if(rowImgs1.picHeight>800){
                            rowImgs1.picHeight=800;
                            rowImgs1.class="oneHeight"
                        }
                        imgHeight = rowImgs1.picHeight+10;
                        files.push(rowImgs1)
                    }

                    pushDate.height=pushDate.height+imgHeight;

                    if (pushDate.height> 900) {
                        pushDate={
                            id:this.newDataBase[this.newDataBase.length-1].id+1,
                            height:lisPaddingTop,
                            date:moment(data.createAt).format('YYYY-MM'),
                            data:[]
                        }
                        this.newDataBase.push(pushDate);
                        dqData=JSON.parse(JSON.stringify(data));
                        dqData.files=[];
                        dqData.text='';
                        pushDate.height=pushDate.height+imgHeight;
                        dqData.files=dqData.files.concat(files);
                        pushDate.data.push(dqData)

                    }else {
                        dqData.files=dqData.files.concat(files);
                    }

                }

                //console.log(this.newDataBase, textHeight)
            },
            resetSize(img1, img2) {
                let newObj = {
                    width1: '',
                    width2: '',
                    height: '',
                }
                let img1Ratio = 1;
                if (img1.picWidth) {
                    img1Ratio = img1.picHeight / img1.picWidth
                }
                let img2Ratio = 1;
                if (img2.picWidth) {
                    img2Ratio = img2.picHeight / img2.picWidth;
                }
                let allWidth = this.designContentWidth - 10;//设计稿图片容器宽度
                newObj.width2 = allWidth / (img2Ratio / img1Ratio + 1);
                if(newObj.width2<97){
                    newObj.width2=97;
                }
                if(newObj.width2>390){
                    newObj.width2=390;
                }
                newObj.width1 = allWidth - newObj.width2;
                newObj.height = newObj.width1 * img1Ratio;
                return newObj;
            },
            getData(date){
                let that = this;
                httpHzt.get("/2/s/gb/info", function (data) {
                    let coverId=data.data.coverId;
                    that.cover.coverId=coverId;
                    that.cover.shopIcon=data.data.shopIcon;  ///
                    if(data.data.icon&&!that.cover[coverId].fixedImg){
                        that.cover[coverId].icon=data.data.icon;
                    }
                    that.cover.title=data.data.title;
                    //that.cover.title='测试测试测试测试测试测试测试测试测试测试测1';
                    that.cover.kidName=data.data.kidName;
                    that.cover.userName=data.data.userName;
                    that.dataBase=data.data.pages;
                    let indexDate='';
                    if(date){
                        indexDate=date;
                    }
                    let times='';

                    if(that.dates&&that.dates.length>0){
                        Toast(JSON.stringify(that.dates))
                        times=that.dates;
                    }
                    that.restData(times,indexDate);
                    if(that.isOneInt){
                        that.mySwiper=new Swiper('.swiper-container', {
                            virtual: true,
                            init: false
                        })
                    }
                    that.isOneInt=false;

                });
            },
            getTitleScale(html){
                $(".text-cover").html(html);
                let coverHtml='';
                let textWidth=$(".text-cover .title h1 span").width();
                let boxWidht=$(".text-cover .title h1").width();
                if(textWidth>boxWidht){
                    $(".text-cover .title h1 span").css({"transform":"scale("+boxWidht/textWidth+")","-webkit-transform":"scale("+boxWidht/textWidth+")","-moz-transform":"scale("+boxWidht/textWidth+")"})
                    coverHtml=$(".text-cover").html()
                }
                return coverHtml;

            },
            addSwiper(indexDate){
                let that = this;
                that.$nextTick(() => {
                    setTimeout(() => {
                        let data=that.newDataBase;
                        //$(".none-data").hide();
                        // console.log(data.length)
                        // if(data.length==0){
                        //     $(".none-data").show();
                        // }
                        console.log(that.newDataBase)
                        let slides = [];
                        let coverId=that.cover.coverId;
                        let cover=that.pageBox(
                            '<div class="cover">' +
                            '<div class="title"><h1><span>'+that.cover.title+'</span></h1><h5>'+that.cover.kidName+'的成长故事<span>The story of growing up</span></h5><div class="remarks">'+that.cover[coverId].remarks+'</div></div>' +
                            '<div class="img" style="background-image: url('+that.cover[coverId].icon+')"></div>'+
                            '<div class="fixed-edit"><a>修改封面</a></div></div>',-1);
                        let cHtml=that.getTitleScale(cover);
                        if(cHtml){
                            cover=cHtml;
                        }

                        slides.push(cover);//封面页
                        for (let i in data) {
                            let contentHtml='';
                            let da=data[i];
                            for(let j in da.data){
                                let da2=da.data[j];
                                let imgsHtml='';
                                for(let k in da2.files){
                                    let da3=da2.files[k];
                                    imgsHtml+='<dd class="'+(da3.class=='oneHeight'?'oneHeight':'')+'" style="width: '+da3.picWidth+'px;height: '+da3.picHeight+'px;background-image: url('+
                                        (da3.type=='v'?(da3.url+'/i'):(da3.url+'/m'))
                                        +')"><img src="images/video.png" width="60" style="display: '+(da3.type=='v'?'block':'none')+'"/></dd>';
                                }
                                if(da2.text||da2.files.length>0){
                                    contentHtml+='<div class="record-list">' +
                                        '<div class="time">'+that.formatDate(da2.createAt,'DD')+'<span>'+that.formatDate(da2.createAt,'HH:mm')+'</span></div>' +
                                        (da2.text?('<div class="text">'+da2.text.split('\n').join('<br />')+'</div>'):'') +
                                        '<div class="img-list"><dl>'+imgsHtml+'</dl></div>'+
                                        '</div>'
                                }
                            }

                            let _html='<div class="swiper-slide" style="min-height:'+that.$store.state.windowHeight+'px">' +
                                '<div class="ratio-a4" style="width:'+that.setObjA4.w+'px;height: '+that.setObjA4.h+'px " data-time="'+da.data[0].createAt+'" >' +
                                ' <div class="design-dimensions" style="transform: scale('+that.setObjA4.w/that.designDimensions+');-moz-transform: scale('+that.setObjA4.w/that.designDimensions+');-webkit-transform: scale('+that.setObjA4.w/that.designDimensions+')">' +
                                '<div class="page-title""><font>'+that.formatDate(da.data[0].createAt,'YYYY-MM')+'</font><span>'+da.id+'</span></div>' +
                                '<div class="content">'+contentHtml+'</div>'+
                                '</div>' +
                                '</div>' +
                                '</div>'
                            slides.push(_html);
                        }

                        let backCover=that.pageBox('<div class="back-cover">' +
                            '<div class="b-img"><img src="images/back-cover'+that.cover.coverId+'.png"></div>' +
                            '<div class="b-text"><h1><span>'+that.cover.title+'</span></h1><h5>'+that.cover.userName+' 著</h5>' +
                            '<p>内文字做&nbsp;&nbsp;&nbsp;'+that.cover.userName+'<br />插&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图&nbsp;&nbsp;&nbsp;'+that.cover.userName+'<br />字&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数&nbsp;&nbsp;&nbsp;很多<br />定&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价&nbsp;&nbsp;&nbsp;无价</p></div>' +
                            '</div>',-2);
                        slides.push(backCover);//封底
                        that.mySwiper.virtual.removeAllSlides();
                        that.mySwiper.virtual.slides=slides;
                        that.mySwiper.init();
                        that.mySwiper.virtual.update();
                        if(indexDate){
                            that.showPage(indexDate)
                        }
                    }, 500)

                })
            },
            pageBox(strHtml,dataTime){
                let that = this;
                let pageContent='<div class="swiper-slide" style="min-height:'+that.$store.state.windowHeight+'px">' +
                    '<div class="ratio-a4" data-time="'+dataTime+'" style="width:'+that.setObjA4.w+'px;height: '+that.setObjA4.h+'px ">' +
                    '<div class="design-dimensions c cover-id'+this.cover.coverId+'" style="transform: scale('+that.setObjA4.w/that.designDimensions+');-moz-transform: scale('+that.setObjA4.w/that.designDimensions+');-webkit-transform: scale('+that.setObjA4.w/that.designDimensions+')">'+
                    strHtml
                    +'</div></div></div>';
                return pageContent;
            },
            showPage(time){
                if(time==-1){
                    this.mySwiper.slideTo(0, 20);
                    return ;
                }
                if(time==-2){
                    this.mySwiper.slideTo(this.newDataBase.length+1, 20);
                    return ;
                }
                let pageTime=moment(new Date(parseInt(time))).format('YYYY-MM');
                console.log(pageTime)
                this.temporary=time+":"+pageTime;
                for(let i in this.newDataBase){
                    let da=this.newDataBase[i];
                    for(let j in da.data){
                        let t=moment(da.data[j].createAt).format('YYYY-MM');
                        console.log(t)
                        if(t==pageTime){
                            this.mySwiper.slideTo(da.id, 20);
                            return false;
                        }
                    }
                }

            },
            currentMonth() {
                let time=$(".swiper-slide-active .ratio-a4").attr("data-time");

                callNative("updateCurrentMonth",1,time,'')
            },
            filterDate(dates){
                this.dates=dates;
                console.log(dates)
                this.restData(dates)
            },
            saveOrder(){
                console.log('start')
                let data={
                    months:[],
                    data:{},
                    pageCount:this.newDataBase.length
                }
                let dataNew=JSON.parse(JSON.stringify(this.newDataBase));
                for(let i in dataNew){
                    let da=dataNew[i];
                    delete da.height;
                    let timeStamp=new  Date(da.date.split('-').join('/')+"/01 00:00:00").getTime();
                    if(data.months.lastIndexOf(timeStamp)==-1) {
                        data.months.push(timeStamp);
                    }
                }
                data.data=JSON.stringify(dataNew)
                data.shopIcon=this.cover.shopIcon;
                //console.log(data)
               // Toast(JSON.stringify(data.months))

                httpHzt.post("/2/s/gb/book/data/print",data, {
                    success: function (res) {
                        console.log('success')
                        let d=res.data;
                        d.pageCount=data.pageCount;
                        console.log(d)
                        callNative("orderResult",1,JSON.stringify(d),'')
                    },
                    error: function (e) {
                        callNative("orderResult", 1, e.status, '')
                    }
                })
            }
        },
        created() {
            let that=this;
            this.getData();
            // $("body").click(function () {
            //     saveOrder();
            //     //that.filterDate(['2018-10'])
            //     // refreshData(-1)
            // })
            // setTimeout(function () {
            //     console.log(JSON.stringify(that.newDataBase[1]))
            // },5000)

            $(document).on("click",'.fixed-edit',function (ev) {
                ev.stopPropagation();
                $(this).hide();
            })
            $(document).on("click",'.design-dimensions.c',function () {

                $(this).find(".fixed-edit").css("display","flex");
            })

            $(document).on("click",'.fixed-edit a',function (ev) {
                // ev.stopPropagation();
                $(".fixed-edit").hide();
                console.log("edit cover")
                callNative("editCover",1, JSON.stringify({}),function (res) {
                    let coverObj=res;
                    console.log(res)
                    if(typeof res=='string'){
                        coverObj=JSON.parse(res);
                    }
                    let coverId=coverObj.coverId;
                    that.cover.coverId=coverId;
                    that.cover.shopIcon=coverObj.shopIcon;
                    if(!that.cover[coverId].fixedImg){
                        that.cover[coverId].icon=coverObj.icon;
                    }
                    that.cover.title=coverObj.title;
                    that.addSwiper();
                })

            })

            window.refreshData=this.getData;
            window.saveOrder=this.saveOrder;
            window.filterDate=this.filterDate;
            window.global={
                showPage:this.showPage,
                currentMonth:this.currentMonth
            }
        }
    }
</script>
<style lang="scss">
    .none-data{
        position: absolute; width: 100%;height: 100%; top: 0px; left: 0px; display: flex; justify-content: center; align-items: center; z-index: 999; background-color: #fff;
    }
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
    .text-mould {
        width: 498px;
        font-size: 18px;
        line-height: 30px;
        padding: 48px 0 0 0px;

        word-break: break-all;
        display: none;
    }
    .text-cover{position: absolute; left: 1000000px;top: 10000px}
</style>