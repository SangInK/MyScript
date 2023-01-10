window.commonUtil = (() => {
    //#region 상수. 변수 선언
    const _commonUtil = {
        defaultName: "commonUtil",
        simpleName: "$cu"
    }

    //#endregion


    //#region function 선언
    /**
     * _commonUtil을 전역변수화 하기 전, 실제로 사용할 function을 _commonUtil에 할당
     * @param {any} funcs _commonUtil에 할당할 function 또는 function으로 이루어진 객체
     */
    const extend = (funcs) => {
        if (checkFunction(funcs)) {
            _commonUtil[funcs.name] = funcs;
        }
        else {
            if (!checkObjectEmpty(funcs)) {
                for (name in funcs) {
                    _commonUtil[name] = funcs[name];
                }
            }
        }
    }


    //#region Empty Check
    /**
    * 변수 value의 빈 값 여부를 확인 후 빈 값일 때 true를 return
    * @param {any} value 빈 값 여부를 확인할 대상
    */
    const isEmpty = (value) => {
        if ("undefined" == typeof value || null == value || undefined == value
            || checkJQueryEmpty(value) || checkObjectEmpty(value) || checkNumberZero(value) || checkStringEmpty(value)) {

            return true;
        }
        else {

            return false;
        }
    }

    /**
    * 변수 value가 jQuery 객체이고 빈 값일 때 true를 return
    * 변수 value가 jQuery 객체가 아닐 경우 false를 return
    * @param {any} value 빈 값 여부를 확인할 대상
    */
    const checkJQueryEmpty = (value) => {
        if (checkJQuery(value) && value.length <= 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
    *
    * 변수 value가 빈 객체일 때 true를 return
    * 변수 value가 객체가 아닐 경우 false를 return
    * @param {any} value 빈 값 여부를 확인할 대상
    */
    const checkObjectEmpty = (value) => {
        if (checkObject(value) && Object.keys(value).length <= 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 
    * 변수 value가 숫자이고, 0일 경우 true를 return
    * 변수 value가 숫자가 아닐 경우 false를 return
    * @param {any} value 빈 값 여부를 확인할 대상
    */
    const checkNumberZero = (value) => {
        if (checkNumber(value) && value == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
    * 변수 value가 문자열일 때, 빈 값일 경우 true를 return
    * 변수 value가 문자열이 아닐 경우 false를 return
    * @param {any} value 빈 값 여부를 확인할 대상
    */
    const checkStringEmpty = (value) => {
        if (checkString(value) && value.length <= 0) {
            return true;
        }
        else {
            return false;
        }
    }

    //#endregion


    //#region DataType Check
    /**
     * 변수 valuer가 jQuery 객체이면 true를 return
     * @param {any} value
     */
    const checkJQuery = (value) => {

        return ("object" == typeof value && value instanceof jQuery);
    }

    /**
     * 변수 value가 객체이면 true를 return
     * @param {any} value
     */
    const checkObject = (value) => {

        return ("object" == typeof value && !(value instanceof jQuery));
    }

    /**
     * 변수 value가 숫자이면 true를 return
     * @param {any} value
     */
    const checkNumber = (value) => {

        return ("number" == typeof value || ("object" == typeof value && value instanceof Number));
    }

    /**
     * 변수 value가 문자열이면 true를 return
     * @param {any} value
     */
    const checkString = (value) => {

        return ("string" == typeof value || ("object" == typeof value && value instanceof String));
    }

    /**
     * 변수 value가 함수이면 true를 return
     * @param {any} value
     */
    const checkFunction = (value) => {

        return ("function" == typeof value || value instanceof Function);
    }

    //#endregion 

    //#endregion

    //#region _commonUtil 전역 변수화
    // 전역변수 commonUtil을 통해 호출할 function을 할당
    extend({
        isEmpty: isEmpty,
        checkJQueryEmpty: checkJQueryEmpty,
        checkObjectEmpty: checkObjectEmpty,
        checkStringEmpty: checkStringEmpty,
        checkNumberZero: checkNumberZero,
        checkJQuery: checkJQuery,
        checkObject: checkObject,
        checkNumber: checkNumber,
        checkString: checkString,
        checkFunction: checkFunction
    })

    return _commonUtil;

    //#endregion
})();

$ms.init("commonUtil");
$ms.extend(window.commonUtil, "commonUtil");