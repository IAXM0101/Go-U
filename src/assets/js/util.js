export default {
    /* 深拷贝 */
    deepcopy: function (to, from) {
        for (const key in from) {
            if (Object.hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }
    }
}