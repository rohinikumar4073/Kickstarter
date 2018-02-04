export default class ApiService {
    static getData(url){
       return new Promise(function(resolve,reject){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onreadystatechange=function(){
            if (xhr.readyState == 4 && xhr.status == 200){
                resolve(xhr.responseText);
            }else if (xhr.readyState == 4 && xhr.status != 200){
                reject(xhr.responseText);
            }
        }
        })
    }
}