import request from '@/utils/request'

/**
 * @description 获得验证码图片
 * @author laozhu
 * @date 26/10/2020
 * @export
 * @return {*}  
 */
export function handleChangeCheckCode(){
    var currdatetime = new Date().getTime();
    return request({
        url: `/sys/randomImage/${currdatetime}`,
        method: 'get',
        data:""
    }) 

  }
