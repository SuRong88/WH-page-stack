import axios from 'axios';

function copyToClip(content, message) {
    var aux = document.createElement('input');
    aux.setAttribute('value', content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    let result = '';
    if (message == null) {
        result = 'success';
    } else {
        alert(message);
        result = message;
    }
    return result;
}

async function getQiNiuYunToken() {
    const app = window.vm;
    const res = await app.$get('https://scf.myliweihao.com/release/qiniuyun_token');
    return res.data;
}

async function getImgName(file) {
    return {
        data: file,
        key: `${new Date().getTime()}_${Number.parseInt(Math.random() * 999)}.${file.type.split('/')[1]}`,
        token: await getQiNiuYunToken()
    };
}

/**
 * 上传图片返回url
 * @param {Object} file
 * @returns {String} imgurl
 */
function sigleFile2url(file) {
    return new Promise(async function(resolve, reject) {
        let { key, token } = await getImgName(file);
        let upAjax = axios.create({
            withCredentials: false
        });
        let data = new FormData();
        data.append('token', token); //七牛需要的token，叫后台给，是七牛账号密码等组成的hash
        data.append('file', file);
        data.append('key', key);
        upAjax({
            method: 'POST',
            url: 'https://upload.qiniup.com/',
            data: data,
            timeout: 30000 //超时时间
        })
            .then(function(res) {
                try {
                    let img = 'https://img.bazhuay.com/' + res.data.key;
                    resolve(img);
                } catch (err) {
                    console.error('[上传错误]  ', err);
                    reject(err);
                }
            })
            .catch(function(err) {
                console.error('[上传失败]  ', err);
                reject(err);
            });
    });
}

export default {
    copyToClip,
    getQiNiuYunToken,
    getImgName,
    sigleFile2url
};
