(function (window) {
    //#region 상수. 변수 선언
    const _myScript = {};
    const refScript = ["commonUtil", "viewUtil", "eventBindUtil"];

    //#endregion


    //#region function 선언
    /**
     * myScript.js 즉시실행함수가 완료될 때 호출되어 window객체에 myScript객체와 refScript의 객체를 선언
     */
    const init = (scriptName, myScript) => {
        if ("myScript" == scriptName) {
            window.myScript = window.$ms = myScript;

            return myScript;
        }
        else {
            if (refScript.indexOf(scriptName) >= 0) {
                try {
                    window[window[scriptName]["defaultName"]] = window[window[scriptName]["simpleName"]] = window[scriptName];
                }
                catch (error) {
                    console.error(scriptName + ".js :: not defined");
                }
            }

            return;
        }
    }

    /**
     * myScript객체와 refScript에 새로운 function을 추가
     * 해당 script객체에 같은 이름의 function이 존재할 경우 덮어씀
     * @param {any} funcs function 또는 function으로 이루어진 객체
     * @param {string} scriptName 새로운 function을 추가할 대상
     */
    const extend = (funcs, scriptName = "myScript") => {
        if ("function" == typeof funcs || funcs instanceof Function) {
            if ("myScript" == scriptName) {
                _myScript[funcs.name] = funcs;
            }
            else {
                if (!(("object" == typeof window[scriptName] && !(window[scriptName] instanceof jQuery)) && Object.keys(window[scriptName]).length <= 0)) {
                    window[scriptName][funcs.name] = funcs;
                }
            }
        }
        else {
            if (!(("object" == typeof funcs && !(funcs instanceof jQuery)) && Object.keys(funcs).length <= 0)) {
                for (name in funcs) {
                    if ("myScript" == scriptName) {
                        _myScript[name] = funcs[name];
                    }
                    else {
                        if (!(("object" == typeof window[scriptName] && !(window[scriptName] instanceof jQuery)) && Object.keys(window[scriptName]).length <= 0)) {
                            window[scriptName][name] = funcs[name];
                        }
                    }
                }
            }
        }
    }

    /**
     * myScript객체와 refScript의 function을 삭제
     * @param {any} funcName 삭제할 function명
     * @param {string} scriptName function을 삭제할 대상
     */
    const remove = (funcName, scriptName) => {
        if (!(commonUtil.isEmpty(window[scriptName]) && commonUtil.isEmpty(window[scriptName]["defaultName"]) && commonUtil.isEmpty(window[scriptName]["simpleName"]))) {
            delete window[scriptName][funcName];
            delete window[scriptName]["defaultName"][funcName];
            delete window[scriptName]["simpleName"][funcName];
        }
    }

    //#endregion


    //#region
    extend(init);
    extend(extend);
    extend(remove);

    return init("myScript", _myScript);

    //#endregion

})(window);
