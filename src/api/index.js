import request from '@/utils/request';

export const getPicture = ()=>{
    return request.get('/random_picture',{},{loading:true}).then(res=>{})
}

export function getSentence(data = { type: 'iciba' }) {
    return request.get('/sentence', data,{loading:true})
}