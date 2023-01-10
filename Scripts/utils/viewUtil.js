window.viewUtil = (() => {
    //#region 상수. 변수 선언
    const _viewUtil = {
        defaultName: "viewUtil",
        simpleName: "$vu"
    }

    //#endregion


    //#region function 선언
    /**
     * _viewUtil을 전역변수화 하기 전, 실제로 사용할 function을 _viewUtil에 할당
     * @param {any} funcs _viewUtil에 할당할 function 또는 function으로 이루어진 객체
     */
    const extend = (funcs) => {
        if (commonUtil.checkFunction(funcs)) {
            _viewUtil[funcs.name] = funcs;
        }
        else {
            if (!commonUtil.checkObjectEmpty(funcs)) {
                for (name in funcs) {
                    _viewUtil[name] = funcs[name];
                }
            }
        }
    }

    //#endregion

    //#region _commonUtil 전역 변수화
    // 전역변수 commonUtil을 통해 호출할 function을 할당
    extend();

    return _viewUtil;

    //#endregion
})();