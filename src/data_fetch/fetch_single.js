const rp = require('request-promise-native');
export default async function fetch_single( target, lan){
    //using city code fetch detail info
    const url = "https://dd.weather.gc.ca/citypage_weather/xml/"+
                target.provinceCode+"/"+target.code+"_"+lan+".xml";
    let data = await rp({ uri: url, simple: true });
    return data;
}
