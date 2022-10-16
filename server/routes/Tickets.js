

estimateTime = function(tr, nr, k_list , sr_list){
    let den = k_list.map((x, i) => 1/x * sr_list[i]).reduce((m, n) => m + n);
    return tr * (nr/den + 1/2);
}

decTimeToDeg = function(minutes){
    return Math.floor(minutes) + ":" + (Math.ceil((minutes - Math.floor(minutes))*60));
}