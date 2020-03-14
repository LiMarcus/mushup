const rp = require('request-promise-native');
export default async function fetch_data(){
    //fetch and get all cities code 
    const url = "https://dd.weather.gc.ca/citypage_weather/xml/siteList.xml";
    let data = await rp({ uri: url, simple: true });
    return data;
}
