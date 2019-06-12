// Copyright 2018 FOCUS Inc.All Rights Reserved.

import {NetInfo, Platform} from "react-native";

/*uuId 生成的唯一标识*/
export const uuIdFun = () => {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
};

/*用正则表达式实现html转码*/
export const htmlEncodeByRegExp = (str) => {
    let s = "";
    if(str.length == 0) return "";
    s = str.replace(/&/g,"&amp;");
    s = s.replace(/</g,"&lt;");
    s = s.replace(/>/g,"&gt;");
    s = s.replace(/\\/g,"&#92;");
    s = s.replace(/\'/g,"&#39;");
    s = s.replace(/\"/g,"&quot;");
    return s;
};

/*用正则表达式实现html解码*/
export const htmlDecodeByRegExp = (str) => {
    let s = "";
    if(str.length == 0) return "";
    s = str.replace(/&amp;/g,"&");
    s = s.replace(/&lt;/g,"<");
    s = s.replace(/&gt;/g,">");
    s = s.replace(/&#39;/g,"\'");
    s = s.replace(/&#92;/g,"\\");
    s = s.replace(/&quot;/g,"\"");
    return s;
};


/*获取网络状态*/
export const getConnectionInfo = () => {
    if (Platform.OS === 'ios') {
        return new Promise((resolve, reject) => {
            const connectionHandler = connectionInfo => {
                NetInfo.removeEventListener('connectionChange', connectionHandler);

                resolve(connectionInfo)
            };

            NetInfo.addEventListener('connectionChange', connectionHandler)
        })
    }
    return NetInfo.getConnectionInfo()
};

