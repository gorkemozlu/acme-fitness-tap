import { baseUrl } from './baseUrl';

export const urlFix = (url) => {
    if (url == null) {
        return "";
    }
    if(url.startsWith("/")){
        return baseUrl.slice(0,-1)+url;
    }
    else{
        return url;
    }
}