
//return index of city in array

export default function deleteElement(arr, target) {
    let index;
    for( var i = 0; i < arr.length; i++){
        if (arr[i].nameEn === target.nameEn) index = i;
    }
    return index;
}