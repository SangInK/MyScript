window.eventBindUtil = (() => {
    //#region 상수. 변수 선언
    const _eventBindUtil = {
        defaultName: "eventBindUtil",
        simpleName: "$ebu"
    }

    //#endregion 

    //#region function 선언
    /**
     * _eventBindUtil을 전역변수화 하기 전, 실제로 사용할 function을 _eventBindUtil에 할당
     * @param {any} funcs _eventBindUtil에 할당할 function 또는 function으로 이루어진 객체
     */
    const extend = (funcs) => {
        if ($cu.checkFunction(funcs)) {
            _eventBindUtil[funcs.name] = funcs;
        }
        else {
            if (!$cu.checkObjectEmpty(funcs)) {
                for (name in funcs) {
                    _eventBindUtil[name] = funcs[name];
                }
            }
        }
    }

    /**
     * .content-box {overflow-y:auto;} css가 있을 때만 작동
     * @param {any} target
     */
    const scrollMove = (target) => {
        debugger;
        $(target).find(".content-box").on("wheel", (e) => {
            moveScroll(e);
        }).on("touchstart", (e) => {
            $(e.currentTarget).attr("touch-y", e.screenY);
        }).on("touchend", (e) => {
            $(e.currentTarget).attr("touch-y", 0);
        }).on("touchmove", (e) => {
            moveScroll(e);
        })

        function moveScroll (e) {
            console.log("t");
            const $target = $(e.currentTarget);

            if (($target.filter(":hover").length > 0)) {
                if ("wheel" == e.originalEvent.type) {
                    $target.scrollTop($target.scrollTop() + (-1 * e.originalEvent.wheelDeltaY));
                }
                else if ("touchmove" == e.originalEvent.type) {
                    e.preventDefault();
                    const moveLength = 50;

                    if (Math.abs($target.attr("touch-y") - e.screenY) > 5) {
                        if ($target.attr("touch-y") > e.screenY) {
                            $target.scrollTop($target.scrollTop() + moveLength);
                        }
                        else {
                            $target.scrollTop($target.scrollTop() - moveLength);
                        }

                        $target.attr("touch-y", e.screenY);
                    }
                }
            }
        }
    }

    //#endregion

    //#region _commonUtil 전역 변수화
    // 전역변수 commonUtil을 통해 호출할 function을 할당
    extend({
        scrollMove: scrollMove
    })

    return _eventBindUtil;
    //#endregion
})();

debugger;
$ms.init("eventBindUtil");
$ms.extend(window.eventBindUtil, "eventBindUtil");