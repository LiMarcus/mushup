
//check if target already exist in array

export default function duplicate(arr, target) {
    let check = true;
    for(var i = 0; i < arr.length; i++){
        if (arr[i].nameEn === target.nameEn) check = false;
    }
    return check;
}