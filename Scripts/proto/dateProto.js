/**
 * Date.prototype 확장
 * ======== myScript.js commonUtil.js 필수
 */
Date.prototype = (() => {
    //#region 상수. 변수 선언
    const _date = Date.prototype;

    //#endregion


    //#region function 선언
    // dateProto.js 내부에서만 사용할 function은 함수표현식, 확장할 function은 함수 선언으로 작성
    /**
     * _date를 전역변수화 하기 전, 실제로 사용할 function을 _date에 할당
     * @param {any} funcs _commonUtil에 할당할 function 또는 function으로 이루어진 객체
     */
    const extend = (funcs) => {
        if ($cu.checkFunction(funcs)) {
            _date[funcs.name] = funcs;
        }
        else {
            if (!$cu.checkObjectEmpty(funcs)) {
                for (name in funcs) {
                    _date[name] = funcs[name];
                }
            }
        }
    }


    function format(format) {
        if ($cu.checkDateEmpty(this)) {
            return;
        }

        const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        const date = this;

        format = format.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
            let newStr;
            switch ($1) {
                case "yyyy":
                    newStr = date.getFullYear();
                    break;
                case "yy":
                    newStr = ("0" + (date.getFullYear() % 1000)).right(2);
                    break;
                case "MM":
                    newStr = ("0" + (date.getMonth() + 1)).right(2);
                    break;
                case "dd":
                    newStr = ("0" + date.getDate()).right(2);
                    break;
                case "E":
                    newStr = weekName[date.getDay()];
                    break;
                case "HH":
                    newStr = ("0" + (date.getHours())).right(2);
                    break;
                case "hh":
                    newStr = ("0" + ((h = date.getHours() % 12) ? h : 12)).right(2);
                    break;
                case "mm":
                    newStr = ("0" + date.getMinutes()).right(2);
                    break;
                case "ss":
                    newStr = ("0" + date.getSeconds()).right(2);
                    break;
                case "a/p":
                    newStr = date.getHours() < 12 ? "오전" : "오후";
                    break;
                default:
                    newStr = $1;
                    break;
            }

            return newStr;
        })

        return format;
    }

    //#endregion


    //#region _commonUtil 전역 변수화
    extend({
        format: format
    });

    return _date;
    //#endregion
})();