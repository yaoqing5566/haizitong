import { Toast } from 'mint-ui';
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
//import {Message} from 'element-ui';


function ajaxError(msg) {
    Toast({
        message: msg.responseJSON.msg,
        position: 'top'
    });
    console.log(msg)
}

function strTransformationJson(data) {
    let result;
    try {
        result=JSON.parse(data);
    }catch (e) {
        result=data;
    }
    return result;
}


export function post(url,data){
    return new Promise((resolve,reject) => {
        $.ajax({
            url:url,
            type:'POST', //GET
            async:true,    //或false,是否异步
            data:data,
            timeout:3000,    //超时时间
            dataType:'text',    //返回的数据格式：json/xml/html/script/jsonp/text
            beforeSend:function(xhr){
                //console.log('发送前')
            },
            success:function(data,textStatus,jqXHR){
                resolve(strTransformationJson(data));
            },
            error:function(xhr,textStatus){
                let error=JSON.parse(xhr.responseText);
                reject(error);
            },
            complete:function(){
                //console.log('结束')
            }
        })
    })
}



/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
    return new Promise((resolve,reject) => {
        $.ajax({
            type: "GET",
            url: url,
            data: params,
            dataType: "json",
            success: function(data){
                resolve(strTransformationJson(data));
            },
            error:function(xhr){
                let error=JSON.parse(xhr.responseText);
                reject(error);
            }
        });

    })
}
