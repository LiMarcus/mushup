export default  function generate_markers(arr) {
    let markers = []; 
    for(var i = 0; i < arr.length; i++){

        //generate marker object, because some of info maybe undefind in that time, we need chech and set 'empty' as default
        const condition = {
            name: arr[i].siteData.location.name._,
            latvalue:  arr[i].siteData.location.name.lat,
            lonvalue:  arr[i].siteData.location.name.lon,
            //http://www.satsig.net/lat_long.htm
            lat: arr[i].siteData.location.name.lat.slice(-1) === 'N' ?
            arr[i].siteData.location.name.lat.slice(0, -1) : arr[i].siteData.location.name.lat.slice(0, -1),
            lon: arr[i].siteData.location.name.lat.slice(-1) === 'E' ?
            arr[i].siteData.location.name.lon.slice(0, -1): -arr[i].siteData.location.name.lon.slice(0, -1),
            time: arr[i].siteData.dateTime[1].textSummary,
            //some city doesn't have currentConditions, it will make error
            condition: arr[i].siteData.currentConditions !=="" ?
                    arr[i].siteData.currentConditions.condition : "empty",
            temp: arr[i].siteData.currentConditions !=="" ?
                    arr[i].siteData.currentConditions.temperature._ : "empty",
            wind: arr[i].siteData.currentConditions !=="" ?
                    arr[i].siteData.currentConditions.wind.speed._ : "empty",
            visibility: arr[i].siteData.currentConditions !=="" ?
                    arr[i].siteData.currentConditions.visibility._ : "empty",
        }
        markers.push(condition);
    }
    console.log(markers);
    return markers;
}