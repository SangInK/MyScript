/**
 * String.prototype 확장
 * ======== myScript.js commonUtil.js 필수
 */
String.prototype = (() => {
    //#region 상수. 변수 선언
    const _string = String.prototype;

    //#endregion


    //#region function 선언
    // stringProto.js 내부에서만 사용할 function은 함수표현식, 확장할 function은 함수 선언으로 작성
    /**
     * _string을 전역변수화 하기 전, 실제로 사용할 function을 _string에 할당
     * @param {any} funcs _commonUtil에 할당할 function 또는 function으로 이루어진 객체
     */
    const extend = (funcs) => {
        if ($cu.checkFunction(funcs)) {
            _string[funcs.name] = funcs;
        }
        else {
            if (!$cu.checkObjectEmpty(funcs)) {
                for (name in funcs) {
                    _string[name] = funcs[name];
                }
            }
        }
    }

    
    function right(length) {
        if (this.length <= length) {
            return this;
        }
        else {
            return this.substring(this.length - length, this.length);
        }
    }

    function left(length) {
        if (this.length <= length) {
            return this;
        }
        else {
            return this.substring(0, length);
        }
    }

    //#endregion


    //#region _commonUtil 전역 변수화
    extend({
        right: right,
        left: left
    });

    return _string;
    //#endregion
})();