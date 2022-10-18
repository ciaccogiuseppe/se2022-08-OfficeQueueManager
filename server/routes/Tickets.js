
/**
 * 
 * @param {integer} tr service time for request type r
 * @param {integer} nr number of people in queue for request type r
 * @param {Array} k_list number of different types of requests served by counter i
 * @param {Array} sr_list indicator equal to 1 if counter i can serve request r, 0 otherwise 
 * @returns estimated waiting time (in minutes), -1 in case of errors
 */
estimateTime = function (tr, nr, k_list, sr_list) {

    if (k_list.length == 0 || sr_list.length == 0 || k_list.length != sr_list.length) {
        return -1;
    }

    if (!Number.isInteger(tr) || !Number.isInteger(nr) || tr <= 0 || nr < 0) {
        return -1;
    }

    for (i of k_list) {
        if (!Number.isInteger(i) || i < 0) {
            return -1;
        }
    }

    for (i of sr_list) {
        if (!Number.isInteger(i) || (i != 0 && i != 1)) {
            return -1;
        }
    }

    if (sr_list.map((x) => x).reduce((a, b) => a + b) == 0) {
        return -1;
    }

    for (i in k_list) {
        if (k_list[i] == 0 && sr_list[i] != 0) {
            return -1;
        }
    }

    let den = k_list.map((x, i) => x != 0 ? (1 / x * sr_list[i]) : 0).reduce((m, n) => m + n);
    return tr * (nr / den + 1 / 2);
}

/**
 * 
 * @param {Number} minutes to be converted in mm:ss
 * @returns minutes in mm:ss format (ceil estimate on seconds)
 */
decTimeToDeg = function (minutes) {
    if (!Number.isInteger(minutes) || minutes < 0) {
        return -1;
    }
    let mins = Math.floor(minutes);
    let secs = Math.ceil((minutes - mins) * 60);
    mins = mins + ((secs >= 60) ? 1 : 0);
    secs = secs % 60;
    mins = mins > 9 ? mins : ("0" + mins);
    secs = secs > 9 ? secs : ("0" + secs);
    return mins + ":" + secs;
}

module.exports = { estimateTime, decTimeToDeg };