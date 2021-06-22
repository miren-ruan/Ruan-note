<!--单页面的过滤器-->
<script>
export default {
    filters: {
        //姓名或者公司名称的掩码   比如：张磊磊  =>  张**
        hideName(val) {
            return `${val.substring(0, 1).padEnd(val.length, "*")}`;
        },
        
        //手机号掩码    比如：13186551481  =>  131*****481
        hidePhone(val) {
            if (val) {
                return `${val.substring(0, 3)}*****${val.substring(val.length - 3)}`;
            }
        },
    },
};
</script>
