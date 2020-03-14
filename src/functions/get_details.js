import fetch_single from '../data_fetch/fetch_single';
import reader from '../data_fetch/weather_reader.js';
export default async function get_details(arr, lan) {
    let list = [];
    //using city code to fetch each city detail information
    //return new arry with detail info
    for(var i = 0; i < arr.length; i++){
        const xml = await fetch_single(arr[i],'e');
        const content = await reader(xml);
        console.log(typeof content);
        console.log(list.length);
        list.push(content);
    }
    return list;
}