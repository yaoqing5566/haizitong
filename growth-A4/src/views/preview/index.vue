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

                setTimeout(()=>{
                    let data={"code":0,"msg":"ok","data":{"userId":"5ba1ff3d3cffa617f1a4024b","kidUserId":"5ba1ff3c3cffa617f1a40247","pages":[{"pageId":"5cc7ee993a98ba21b7b40183","createAt":1556606617399,"creator":"5ba1ff3c3cffa617f1a40249","come":2,"files":[{"picHeight":878,"picWidth":878,"url":"http://min.haizitong.com/2/ali/i/9effd43fe1a44aa3bcc0d4dd239b8015","type":"i"},{"picHeight":878,"picWidth":878,"url":"http://min.haizitong.com/2/ali/i/a7c528b91f83456c8ad5ee5eba8fa3b3","type":"i"},{"picHeight":878,"picWidth":878,"url":"http://min.haizitong.com/2/ali/i/5382712ede46438d973b396f5523673f","type":"i"},{"picHeight":878,"picWidth":878,"url":"http://min.haizitong.com/2/ali/i/b54526388f734e97a4d5108fc8ff41a9","type":"i"}],"text":"这么大问题、这个是我们最喜欢😘！这些是你给我们家孩子带来什么的呢、在一起了、不过也没有办法的通知、不能够接受任何地方政府采购制度建设项目可行性和工程规划建设的基本任务完成的事情莫过于解决不接我要你给我们打电话给我一个人去的路上的风景！不过这个时候也可以很不错了、我们的生活方式是什么时候回来呀，我们","app":"jia"},{"pageId":"5cc7e9373a98ba21b7b40179","createAt":1556605239237,"creator":"5ba1ff3c3cffa617f1a40249","come":2,"files":[{"picHeight":918,"picWidth":500,"url":"http://min.haizitong.com/2/ali/i/b993720c5342489d8b0e90eeca0b8b54","type":"i"},{"picHeight":895,"picWidth":500,"url":"http://min.haizitong.com/2/ali/i/69549e7e4cbe4c9e9821901a8b85d500","type":"i"}],"text":null,"app":"jia"},{"pageId":"5c8b0127be8ded0cd7e22d9e","createAt":1552613671845,"creator":"5b74dbeabf77fd52ac795889","come":2,"files":[],"text":"测试评论","app":"yuan"},{"pageId":"5c8a19a8be8ded0cd7e22d82","createAt":1552554408227,"creator":"5ba1ff473cffa617f1a40250","come":2,"files":[],"text":"to be or not to be,this is a question\n","app":"jia"},{"pageId":"5c78a019e73f2e37f669b5b0","createAt":1551409177697,"creator":"5b74dbeabf77fd52ac795889","come":2,"files":[],"text":"啦啦啦德玛西亚","app":"yuan"},{"pageId":"5c6bc0eb0d634d3b4d25d16d","createAt":1550565611740,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[],"text":"Be","app":"yuan"},{"pageId":"5c6bc0e10d634d3b4d25d16c","createAt":1550565601743,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":1440,"picWidth":1080,"url":"http://upload.haizitong.com/2/ali/i/c68a834418ad4454853316ee42b8da2f","type":"i"}],"text":null,"app":"yuan"},{"pageId":"5c6bc0bd0d634d3b4d25d16a","createAt":1550565565708,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":1920,"picWidth":1080,"len":1000,"url":"http://upload.haizitong.com/2/ali/v/5a06d520463f4bbca7e553527431e453","type":"v"}],"text":null,"app":"yuan"},{"pageId":"5c6bc0af0d634d3b4d25d168","createAt":1550565551567,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":1920,"picWidth":1080,"len":1000,"url":"http://upload.haizitong.com/2/ali/v/cdd9b594b588420193e470f2840e5696","type":"v"}],"text":null,"app":"yuan"},{"pageId":"5c6bc0a10d634d3b4d25d166","createAt":1550565537749,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":1920,"picWidth":1080,"len":1000,"url":"http://upload.haizitong.com/2/ali/v/dc26224febbb4a359463cdd4035a271f","type":"v"}],"text":null,"app":"yuan"},{"pageId":"5c6bbd20cd698a3ad45ed5de","createAt":1550564640831,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":1920,"picWidth":1080,"len":1000,"url":"http://upload.haizitong.com/2/ali/v/2cdc7785f1c043048e408e9aee2caa0c","type":"v"}],"text":null,"app":"yuan"},{"pageId":"5c6bbce4cd698a3ad45ed5d9","createAt":1550564580421,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":1440,"picWidth":1080,"url":"http://upload.haizitong.com/2/ali/i/5e51ab5483354f8c9509d1676d57260d","type":"i"}],"text":null,"app":"yuan"},{"pageId":"5c455f78579323036d49c85d","createAt":1548050296339,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":960,"picWidth":544,"len":44000,"url":"http://upload.haizitong.com/2/ali/v/774ba9c734b94bf2bc69e58c80bcee08","type":"v"},{"picHeight":540,"picWidth":960,"len":134000,"url":"http://upload.haizitong.com/2/ali/v/d70138b2b0aa42639f511824eb0fe02a","type":"v"},{"picHeight":1920,"picWidth":1080,"len":7000,"url":"http://upload.haizitong.com/2/ali/v/d6be7185ce7c453ba5008bc90ca88716","type":"v"}],"text":"1","app":"yuan"},{"pageId":"5c455f5b579323036d49c856","createAt":1548050267088,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":960,"picWidth":544,"len":44000,"url":"http://upload.haizitong.com/2/ali/v/58e8884d2e41411f94709511d4f35432","type":"v"},{"picHeight":1920,"picWidth":1080,"len":7000,"url":"http://upload.haizitong.com/2/ali/v/cd7c08d28b6743e8be6fe0a47ce1d0a0","type":"v"},{"picHeight":540,"picWidth":960,"len":134000,"url":"http://upload.haizitong.com/2/ali/v/c1c608dc12354db7bb105ed7644ba6b1","type":"v"},{"picHeight":540,"picWidth":960,"len":134000,"url":"http://upload.haizitong.com/2/ali/v/62815ee16b7849c8be75185bc68dc384","type":"v"},{"picHeight":960,"picWidth":544,"len":44000,"url":"http://upload.haizitong.com/2/ali/v/73fc17f467714c829ab31f4968297373","type":"v"},{"picHeight":1920,"picWidth":1080,"len":7000,"url":"http://upload.haizitong.com/2/ali/v/aac5f2d3d97b4621bd85171e9a96838f","type":"v"}],"text":"2","app":"yuan"},{"pageId":"5c455d53579323036d49c852","createAt":1548049747250,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":960,"picWidth":544,"len":44000,"url":"http://upload.haizitong.com/2/ali/v/bc3e562f51564b97bd636a8ef6ff69c5","type":"v"},{"picHeight":540,"picWidth":960,"len":134000,"url":"http://upload.haizitong.com/2/ali/v/1be2b597c2944809a2d3e180cdd0fc56","type":"v"},{"picHeight":1920,"picWidth":1080,"len":7000,"url":"http://upload.haizitong.com/2/ali/v/945503a1354b4775aeb63ad3236d00e9","type":"v"}],"text":null,"app":"yuan"},{"pageId":"5c453db495b6397aee15cb28","createAt":1548041652805,"creator":"5ba1f7e63cffa617f1a40226","come":2,"files":[{"picHeight":960,"picWidth":544,"len":44000,"url":"http://upload.haizitong.com/2/ali/v/1e9588af4bbc4deda3f9d0ddf015563a","type":"v"},{"picHeight":540,"picWidth":960,"len":134000,"url":"http://upload.haizitong.com/2/ali/v/846cc6c90629496bb56087a0a82e109d","type":"v"},{"picHeight":1920,"picWidth":1080,"len":7000,"url":"http://upload.haizitong.com/2/ali/v/19cf083971ab4c558a7eef9b4760dff3","type":"v"}],"text":"？？","app":"jia"},{"pageId":"5c453d0495b6397aee15cb24","createAt":1548041476035,"creator":"5ba1f7e63cffa617f1a40226","come":2,"files":[],"text":"我不知道","app":"jia"},{"pageId":"5c1da938ed1bf27bb7d3f6d6","createAt":1545447736333,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"len":0,"picHeight":4608,"picWidth":2304,"type":"i","url":"http://upload.haizitong.com/2/ali/i/ebe2c93aca504d31a46a61ac8000e9b6"},{"len":0,"picHeight":2304,"picWidth":4608,"type":"i","url":"http://upload.haizitong.com/2/ali/i/5f46b4d272f2477ebb6908ee357e4dab"}],"text":"knowledge","app":"yuan"},{"pageId":"5c1da82fed1bf27bb7d3f6d4","createAt":1545447471520,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"len":0,"picHeight":2304,"picWidth":4608,"type":"i","url":"http://upload.haizitong.com/2/ali/i/0b1f29a257624b53b7bbbc9f4ea18063"}],"text":null,"app":"yuan"},{"pageId":"5c1da669ed1bf27bb7d3f6d1","createAt":1545447017061,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[],"text":"啦啦啦","app":"yuan"},{"pageId":"5c1cc61aed1bf27bb7d3f6cc","createAt":1545389594848,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[],"text":"哦哦哦","app":"yuan"},{"pageId":"5c1cb300ed1bf27bb7d3f68a","createAt":1545384704458,"creator":"5ba1f7cb3cffa617f1a40219","come":2,"files":[],"text":"反馈反馈看","app":"jia"},{"pageId":"5c1cb286ed1bf27bb7d3f688","createAt":1545384582657,"creator":"5c1ca9d4ef481c06727c303f","come":2,"files":[{"len":0,"picHeight":2304,"picWidth":4608,"type":"i","url":"http://upload.haizitong.com/2/ali/i/442f1e56ab9147bb97dbcd0891c013b6"}],"text":"今年","app":"jia"},{"pageId":"5c1cb24aed1bf27bb7d3f686","createAt":1545384522347,"creator":"5ba1ff5b3cffa617f1a4025e","come":2,"files":[{"len":0,"picHeight":212,"picWidth":320,"type":"i","url":"http://upload.haizitong.com/2/ali/i/888b278f36b1494bb5931110023b32ec"}],"text":null,"app":"jia"},{"pageId":"5c1cab8aed1bf27bb7d3f67d","createAt":1545382794458,"creator":"5c1ca9d4ef481c06727c303f","come":2,"files":[{"len":15600,"picHeight":960,"picWidth":720,"type":"v","url":"http://upload.haizitong.com/2/ali/v/965700dc2f6e472daa773a619b742c9d"}],"text":null,"app":"jia"},{"pageId":"5c1b368d5cce1e4e74dff7e2","createAt":1545287309170,"creator":"5b74dbeabf77fd52ac795889","come":2,"files":[],"text":"通知","app":"yuan"},{"pageId":"5c1b366b5cce1e4e74dff7df","createAt":1545287275235,"creator":"5b74dbeabf77fd52ac795889","come":2,"files":[],"text":"学院通知","app":"yuan"},{"pageId":"5c1a2f6d47f233234adaec76","createAt":1545219949458,"creator":"5ba1f7cb3cffa617f1a40219","come":2,"files":[{"picHeight":1920,"picWidth":1080,"len":7000,"url":"http://upload.haizitong.com/2/ali/v/9036b105fe4c4107b179e5b73d7bcee1","type":"v"}],"text":null,"app":"jia"},{"pageId":"5c19f77647f233234adaec52","createAt":1545205622404,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":466,"picWidth":828,"url":"http://upload.haizitong.com/2/ali/i/9b04deec0f294206ae68a9b3ae6a831c","type":"i"}],"text":"啦啦啦","app":"yuan"},{"pageId":"5c19f71147f233234adaec51","createAt":1545205521105,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":466,"picWidth":828,"url":"http://upload.haizitong.com/2/ali/i/03e5ab3993ef4d9abd720794104228e1","type":"i"},{"picHeight":466,"picWidth":828,"url":"http://upload.haizitong.com/2/ali/i/713f1813a7824cf2b93a545431c9d865","type":"i"},{"picHeight":466,"picWidth":828,"url":"http://upload.haizitong.com/2/ali/i/f54e70de214e4331b094ec9cca45f418","type":"i"},{"picHeight":987,"picWidth":828,"url":"http://upload.haizitong.com/2/ali/i/7ea4bf7a15494e38bcaf417ba853bcef","type":"i"},{"picHeight":466,"picWidth":828,"url":"http://upload.haizitong.com/2/ali/i/0cd221c666a64bf98160c60081b084b1","type":"i"},{"picHeight":466,"picWidth":828,"url":"http://upload.haizitong.com/2/ali/i/8dc1331b147140139f62d749ad1e1e06","type":"i"},{"picHeight":466,"picWidth":828,"url":"http://upload.haizitong.com/2/ali/i/4d71c0e9ad5c4a43b0f2803048cca8d6","type":"i"}],"text":"反反复复","app":"yuan"},{"pageId":"5c19bb33d8b5141c7a52168b","createAt":1545190195437,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"picHeight":466,"picWidth":828,"url":"http://upload.haizitong.com/2/ali/i/9897a3dee28948e1b24c6e67295bbaaa","type":"i"}],"text":"放假放假放假","app":"yuan"},{"pageId":"5bf4bc9d5f63b422e878caa8","createAt":1542765725341,"creator":"5ba1ff3d3cffa617f1a4024b","come":2,"files":[],"text":"楼建立","app":"jia"},{"pageId":"5bf25bd63fe7244f7d0b3268","createAt":1542609878346,"creator":"5ba1f7f93cffa617f1a4022f","come":2,"files":[],"text":"bjngg","app":"jia"},{"pageId":"5bf25a1ce4a711083d5e094e","createAt":1542609436922,"creator":"5ba1ff5b3cffa617f1a40260","come":2,"files":[],"text":"gnjg","app":"jia"},{"pageId":"5bf220efa7ab093ed1bdb3ae","createAt":1542594799358,"creator":"5bab2264106a6860190b5c41","come":2,"files":[],"text":"体检卡","app":"jia"},{"pageId":"5bf21eb3a7ab093ed1bdb3ab","createAt":1542594227327,"creator":"5ba1f7f93cffa617f1a4022f","come":2,"files":[],"text":"咯无聊","app":"jia"},{"pageId":"5bf21e57a7ab093ed1bdb3a7","createAt":1542594135357,"creator":"5ba1f7e63cffa617f1a40226","come":2,"files":[],"text":"感觉很","app":"jia"},{"pageId":"5bce95d024e2e6683a59ed28","createAt":1540265424569,"creator":"5ba1f7d63cffa617f1a4021f","come":2,"files":[{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/88c59f67f12b4e8c9ff47d15ee48bd98"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/255f3c663d6443b288383f89f8c6346f"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/f53d896577e14cbd99665bb2a09bc19b"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/2f500b45e344427da615c53d2813a846"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/46bacd237430415b80398dd90b12f938"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/02588c7cc6704f7c83aeba4b18a59e4e"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/329ca71cefdd487dbc6da934f6d13917"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/19d57a0050824679b6cd6e559905ea97"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/a1e166bf7ed347eb9cf766ed2db6237e"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/c5d90bf2bdbc41c182cb0f00cfe05a48"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/f8d0be845a504b5c9ad6d8ebab04c1dc"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/3031178eb8114f30a2b84b23660d095f"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/0fdd6a15a39a48fc90acd9485e660c9c"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/ed6a1ac0da444073a9887058899f58dd"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/f65969490daf435eb171815c7639ba44"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/5c22ba18b1514bff8c3b6e11a0fc56e6"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/fa59675267224ef78386c6518dce34f3"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/aee0a887167346d5a6277e4683024cba"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/7d38bf9a4f0a4368a0c45649d6b39038"},{"len":0,"picHeight":2592,"picWidth":1296,"type":"i","url":"http://min.haizitong.com/2/ali/i/fc35b4a5efc048b9be072f3f2d16fd70"}],"text":"8名","app":"jia"},{"pageId":"5bc937d6775f2d6306d7e214","createAt":1539913686333,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"len":299600,"picHeight":864,"picWidth":480,"type":"v","url":"http://min.haizitong.com/2/ali/v/5101e11876514e7b925cd905e91479c0"}],"text":null,"app":"yuan"},{"pageId":"5bc6dd28e0a29115d6048fdc","createAt":1539759400127,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[],"text":"垃圾","app":"yuan"},{"pageId":"5bc5a78f46bdb546123a2d05","createAt":1539680143763,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[],"text":"空间","app":"yuan"},{"pageId":"5bc5a08e7d41d966fcef78b4","createAt":1539678350661,"creator":"5ba1f7d63cffa617f1a4021f","come":2,"files":[],"text":"啦啦啦","app":"jia"},{"pageId":"5bc59ece7d41d966fcef78b2","createAt":1539677902212,"creator":"5ba1f7d63cffa617f1a4021f","come":2,"files":[],"text":"啃气","app":"jia"},{"pageId":"5bc58b5aeec8e201fbd0968b","createAt":1539672922104,"creator":"5ba1f7d63cffa617f1a4021f","come":2,"files":[],"text":"11","app":"jia"},{"pageId":"5baedcb7511369494939131d","createAt":1538186423246,"creator":"5ba1ff5b3cffa617f1a4025e","come":2,"files":[{"len":299600,"picHeight":800,"picWidth":600,"type":"v","url":"http://min.haizitong.com/2/ali/v/6ac294d31ba34b42a9d7fa103302665d"}],"text":null,"app":"jia"},{"pageId":"5baed92f0acc1338cd1bc3a4","createAt":1538185519299,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[{"len":89400,"picHeight":864,"picWidth":480,"type":"v","url":"http://min.haizitong.com/2/ali/v/fec9e7ff43a34bae8b9b515517ff635d"}],"text":null,"app":"yuan"},{"pageId":"5bac38791c6a5819f3e222a9","createAt":1538013305405,"creator":"5ba1f7f93cffa617f1a4022d","come":2,"files":[{"picHeight":1104,"picWidth":828,"url":"http://min.haizitong.com/2/ali/i/8eba5cc10855456b91ee530edc17fe9c","type":"i"},{"picHeight":1104,"picWidth":828,"url":"http://min.haizitong.com/2/ali/i/789d5595d7f145d6b2862ee97c078bf5","type":"i"},{"picHeight":1104,"picWidth":828,"url":"http://min.haizitong.com/2/ali/i/259453e374424c688e6722832423c64c","type":"i"},{"picHeight":1104,"picWidth":828,"url":"http://min.haizitong.com/2/ali/i/b490d9c777034bf5b2bb7783b92a3248","type":"i"},{"picHeight":1104,"picWidth":828,"url":"http://min.haizitong.com/2/ali/i/2a6efc9567c64eda8b9baafd216f6af9","type":"i"}],"text":null,"app":"jia"},{"pageId":"5bac33381c6a5819f3e222a5","createAt":1538011960720,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[],"text":"上课","app":"yuan"},{"pageId":"5bab65cb1c6a5819f3e222a4","createAt":1537959371315,"creator":"5ba1f7f93cffa617f1a4022d","come":2,"files":[],"text":"个哥哥","app":"jia"},{"pageId":"5bab65294f16d77817b49665","createAt":1537959209244,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[],"text":"xjdjdj\n","app":"yuan"},{"pageId":"5bab5d9c4f16d77817b49664","createAt":1537957276719,"creator":"5b95e2996c56a8039f3d5f1c","come":2,"files":[],"text":"bfhdhf","app":"yuan"},{"pageId":"5bab44521c6a5819f3e22291","createAt":1537950802975,"creator":"5ba1ff473cffa617f1a40250","come":2,"files":[],"text":"团体特","app":"jia"}],"bookId":"5cb84241d76d91476cac3dd0","makerMonthTimes":[],"coverId":1,"cover":"http://static-res.haizitong.com/app/archive/no1.png","shopIcon":"http://static-res.haizitong.com/app/archive/no1.png","title":"记录我的童年时光","kidName":"小金","userName":"小金的妈妈"}};
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
                    },500)



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