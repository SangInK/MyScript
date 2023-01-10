/**
 * 공통으로 사용되는 기능 함수
    >> 공통 함수 중 view를 직접적으로 조작하지 않는 함수
 */
const commonUtil = {
    //#region isEmpty 관련
    /**
     * 변수 target의 빈 값 여부를 확인 후 빈 값일 경우 true를 return
     * @param {any} target 빈 값 여부를 확인할 대상
     */
    isEmpty: function (target) {
        if ("undefined" == typeof target || null == target || undefined == target
            || $cu.checkJQueryEmpty(target) || $cu.checkObjectEmpty(target) || $cu.checkZeroValue(target) || $cu.checkStringEmpty(target)) {

            return true;
        }
        else {

            return false;
        }

    },

    /**
     * 변수 target이 jQuery Object일 때, 빈 객체일 경우 true를 return
     * @param {any} target 빈 값 여부를 확인할 대상
     */
    checkJQueryEmpty: function (target) {
        if ("object" == typeof target && target instanceof jQuery && target.length <= 0) {
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * 변수 target이 빈 object인 경우 true를 return
     * @param {any} target 빈 값 여부를 확인할 대상
     */
    checkObjectEmpty: function (target) {
        if (("object" == typeof target && !(target instanceof jQuery)) && Object.keys(target).length <= 0) {
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * 변수 target이 숫자일 때, 0일 경우 true를 return
     * @param {any} target 빈 값 여부를 확인할 대상
     */
    checkZeroValue: function (target) {
        if (("number" == typeof target || ("object" == typeof target && target instanceof Number)) && target == 0) {
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * 변수 target이 문자열일 때, 빈 값일 경우 true를 return
     * @param {any} target 빈 값 여부를 확인할 대상
     */
    checkStringEmpty: function (target) {
        if (("string" == typeof target || ("object" == typeof target && target instanceof String)) && target.length <= 0) {
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * 변수 target이 funtion일 경우 true를 return
     * @param {any} target function 여부를 확인할 대상
     */
    checkFunction: function (target) {
        if ("function" == typeof target || target instanceof Function) {
            return true;
        }
        else {
            return false;
        }
    },

    //#endregion

    /**
     * 변수 value의 값이 bool의 문자열로 구성되어 있을 경우, bool로 변환 후 return
     * 단순 문자열일 경우 변환하지 않고 value를 그대로 return
     * @param {any} value 
     */
    getBool: function (value) {
        if (("boolean" == typeof value && true == value) || ("boolean" != typeof value && "true" == value.toLowerCase())) {
            return true;
        }
        else if (("boolean" == typeof value && false == value) || ("boolean" != typeof value && "false" == value.toLowerCase())) {
            return false;
        }
        else {
            return value;
        }
    },

    /**
     * 현재 표시 중인 탭의 index와 name을 return
     */
    getCurrentTab: function () {
        const returnObj = { index: 0, name: "", path: "" };

        let $target = $("main");
        if ($cu.isEmpty($target.find("[id$='Popup_div']"))) {
            $target = $target.find("[tab-index][visible=true]");

            returnObj.index = $target.attr("tab-index");
            returnObj.name = mainStatus.tabInfo[$target.attr("tab-index")];
            returnObj.path = "main #" + returnObj.name;
        }
        else {
            returnObj.name = ($target.find("[id$='Popup_div']").attr("id")).replace(/_div/ig, "");
            returnObj.path = "#" + (returnObj.name).replace(/^[a-z]/, char => char.toUpperCase());
        }

        return returnObj;
    },

    /**
     * 현재 표시 중인 탭에서 조건을 만족하는 button 태그를 jQuery로 return
     * @param {string} attrClass button의 class 조건. 변수가 '%'로 시작할 경우 like 조회
     */
    getCurrentButtons: function (path, attrClass) {
        const targetPath = $cu.isEmpty(path) ? $cu.getCurrentTab().path : path;
        const $target = $(targetPath + " button");
        const $buttons = $();

        if (!$cu.isEmpty($target)) {
            $target.each((index, item) => {
                const $item = $(item);

                const attrCheck = () => {
                    let checkResult = false;

                    if (!$cu.isEmpty(attrClass)) {
                        if (/\%/.test(attrClass)) {
                            if ((!$cu.isEmpty(attrClass) && $item.attr("class").indexOf(attrClass.replace(/\%/ig, ""))) >= 0) {
                                checkResult = true;
                            }
                        }
                        else {
                            if ((!$cu.isEmpty(attrClass) && $item.attr("class").split(" ").indexOf(attrClass)) >= 0) {
                                checkResult = true;
                            }
                        }
                    }
                    else {
                        checkResult = true;
                    }

                    return checkResult;
                }

                if (attrCheck()) {
                    $buttons.push($item[0]);
                }
            })
        }

        return $buttons;
    }

}

const viewUtil = {
    /**
     * 로딩판넬을 생성 후, 변수 time만큼 표시한 후 제거
     * @param {number} time 로딩판넬을 표시할 시간.
     * unit :: millisecond , default :: 0
    */
    showPanel: function (time = 0) {
        if (!$cu.isEmpty($("main #mainPanel_div"))) {
            return
        }
        else {
            $("main").append($("<div id='mainPanel_div'>"))
            const $panel = $("main #mainPanel_div");

            $panel.dxLoadPanel({
                id: "mainPanel",
                position: { of: "main", my: "center", at: "center" },
                visible: true,

                showIndicatior: true,
                indicatorSrc: "https://js.devexpress.com/Content/data/loadingIcons/rolling.svg",

                showPane: true,
                shading: true,
                shadingColor: "rgba(0, 0, 0, 0.6)",

                focusStateEnabled: false,
                hoverStateEnabled: false,
                colseOnOutsideClick: false,

                onShown: (e) => {
                    if (!$cu.isEmpty(time)) {
                        setTimeout(() => {
                            e.component.hide();
                        }, time * 1000)
                    }
                },

                onHidden: (e) => {
                    e.component.dispose();

                    $("#" + e.component.element().attr("id")).remove();
                }
            }).dxLoadPanel("instance");

            $panel.show();
        }
    },

    /**
     * 변수 target과 일치하는 id 속성을 가진 dxLoadPanel를 hide()
     * @param {string} target hide() 대상 dxLoadPanel의 id속성
     * default :: mainPanel_div
     */
    hidePanel: function (target = "mainPanel_div") {
        const $panel = $("main #" + target);

        try {
            $panel.dxLoadPanel("hide");
        }
        catch {
            return;
        }
    },

    /**
     * 변수 data에 해당하는 html을 조회한 후, viewUtil.addTab()을 통해 append()
     * viewUtil.addTab() 수행 후 변수 e를 return
     * @param {any} e JavaScript Event Object :: callTab()이 호출된 이벤트 객체
     * @param {any} data ajax수행에 필요한 데이터를 포함하는 객체
     */
    callTab: async function (e, data) {
        const ajaxResult = await $au.executeAjax(data);

        if (!commonUtil.isEmpty(ajaxResult)) {
            $vu.addTab(data.cmd, ajaxResult);

            return e;
        }
    },

    /**
     * ajax를 사용하여 가져온 html을 화면에 추가
     * @param {string} tabName 새롭게 추가된 화면의 이름
     * @param {string} newTab 새롭게 추가된 화면의 html
     */
    addTab: function (tabName, newTab) {
        const $target = $("main");

        // 현재 탭 숨김
        $target.find("[tab-index][visible=true]").addClass("unvisible");
        $target.find("[tab-index][visible=true]").attr("visible", false);
        // 신규 탭 추가
        $target.append(newTab);

        // 신규 탭의 정보를 mainStatus에 저장
        mainStatus.tabIndex = (Number($("main").find("[tab-index][visible=true]").attr("tab-index"))).toString();
        mainStatus.tabInfo[mainStatus.tabIndex] = tabName;

        if (!("1" == mainStatus.tabIndex)) {
            $("main #main_toolbar").removeClass("unvisible");
        }

        document.documentElement.requestFullscreen();
    },

    removeTab: function (tabIndex = "") {
        const currentTab = $cu.getCurrentTab();

        // 현재 탭 삭제
        $("#" + mainStatus.tabInfo[currentTab.index] + "[tab-index='" + currentTab.index + "']").remove();
        $("script#" + mainStatus.tabInfo[currentTab.index] + "Js").remove();

        // 이전 탭 표시
        $("#" + mainStatus.tabInfo[currentTab.index - 1] + "[tab-index='" + (currentTab.index - 1) + "']").removeClass("unvisible");
        $("#" + mainStatus.tabInfo[currentTab.index - 1] + "[tab-index='" + (currentTab.index - 1) + "']").attr("visible", true);

        // 현재 탭의 정보를 mainStatus에서 삭제
        mainStatus.tabIndex = (Number($("main").find("[tab-index][visible=true]").attr("tab-index"))).toString();
        delete mainStatus.tabInfo[(currentTab.index)];

        if ("2" == currentTab.index) {
            $("main #main_toolbar").addClass("unvisible");

            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
    },

    /**
     * 클릭된 버튼에 selected 클래스가 존재하는지 확인 후, 존재할 경우 제거, 존재하지 않을 경우 추가
     * @param {any} e JavaScript Event Object :: 클릭된 버튼의 이벤트 객체
     * @param {boolean} areaReset 클릭된 버튼와 같은 area에 존재하는 버튼에 대한 selected 클래스 삭제 여부
     * true일 때 삭제
     */
    toggleButton: function (e, areaReset = false) {
        const $btn = $(e.target);

        if ($btn.attr("class").indexOf("common-btn") >= 0) {
            if ($btn.hasClass("selected")) {
                $btn.removeClass("selected");
            }
            else {
                if (areaReset) {
                    // 클릭된 버튼과 같은 area에 존재하는 버튼의 selected를 모두 삭제
                    $btn.parents("[area-name]").find("button").removeClass("selected");
                }

                $btn.addClass("selected");
            }
        }
    },

    createValidationPopup: async function () {
        return await new Promise(async (resolve, reject) => {
            const ajaxData = {
                controllerName: "Comm",
                cmd: "IdValidationPopup",
                path: "/Views/Popup",
                popupPath: "main #idValidationPopup_div"
            }

            const ajaxResult = await $au.executeAjax(ajaxData);

            if (!$cu.isEmpty(ajaxResult)) {
                $("main").append($("<div id='idValidationPopup_div'>"));
                const $popup = $("main #idValidationPopup_div");

                $popup.dxPopup({
                    id: "idValidationPopup",

                    showTitle: true,
                    title: "인증",
                    animation: null,

                    dragEnabled: false,
                    closeOnOutsideClick: false,
                    showCloseButton: true,

                    visible: true,
                    width: 1400,
                    height: 650,

                    onHiding: async function (e) {
                        const resultData = e.component.option("elementAttr[resultData]");

                        return resolve(resultData);
                    },

                    onHidden: function (e) {
                        if (!$cu.isEmpty(e.component.option("contentTemplate"))) {
                            e.component.dispose();
                        }
                        $("#" + e.component.element().attr("id")).remove();
                    },

                    contentTemplate: ajaxResult
                }).dxPopup("instance");

                $popup.show();
                $vu.hidePanel();
            }
        })
    }
}

const popupUtil = {
    popupParam: {
        id: "",

        showTitle: true,
        title: "",

        animation: null,

        dragEnabled: false,
        closeOnOutsideClick: false,
        showCloseButton: true,

        visible: true,
        width: 0,
        height: 0,

        contentTemplate: null,

        popupPath: ""
    },

    /**
     * call~Popup에서 호출되어 실제로 popup을 생성 후 그 결과를 return
     * @param {any} data popup의 생성에 필요한 값으로 구성된 객체
     */
    createPopup: async function (data) {
        $vu.hidePanel();

        return await new Promise((resolve) => {
            $("main").append($("<div id='" + data.id + "_div'>"));
            const $popup = $(data.popupPath);

            $popup
                .dxPopup(data)
                .dxPopup({
                    onHiding: async function (e) {
                        let resultData = e.component.option("elementAttr[resultData]");
                        resultData = $cu.isEmpty(resultData) ? "" : resultData;

                        return resolve(resultData);
                    },

                    onHidden: function (e) {
                        if (!$cu.isEmpty(e.component.option("contentTemplate"))) {
                            e.component.dispose();
                        }
                        $("#" + e.component.element().attr("id")).remove();
                    },
                }).dxPopup("instance");

            $popup.show();
        })
    },

    /**
     * alert(), confirm() 등의 알림팝업을 호출
     * @param {string} text 팝업 내부에 표시될 내용
     * @param {string} title 팝업의 이름
     *  default :: 알림
     * @param {string} type 팝업의 타입. alert, confirm, check 
     * @param {string} icon 팝업 내부에 표시될 아이콘의 종류. info, ques, warn, danger
     * @param {number} height 팝업의 높이
     * @param {number} width 팝업의 넓이
     */
    callNoticePopup: async function (text, title, type, icon, height = 0, width = 0) {
        return await new Promise(async (resolve, reject) => {
            const ajaxData = {
                controllerName: "Comm",
                cmd: "NoticePopup",
                path: "/Views/Popup",
                popupPath: "main #noticePopup_div",
                text: text,
                type: type,
                icon: icon
            }

            const ajaxResult = await $au.executeAjax(ajaxData);
            if (!$cu.isEmpty(ajaxResult)) {
                const popupData = { ...$pu.popupParam };
                popupData.id = (ajaxData.cmd).replace(/^[A-Z]/, char => char.toLowerCase());
                popupData.title = $cu.isEmpty(title) ? "알림" : title;
                popupData.height = $cu.isEmpty(height) ? window.innerHeight / 3 : height;
                popupData.width = $cu.isEmpty(width) ? window.innerWidth / 3 : width;
                popupData.contentTemplate = ajaxResult;
                popupData.popupPath = ajaxData.popupPath;

                return resolve($cu.getBool(await $pu.createPopup(popupData)));
            }
            else {
                console.warn("callNoticePopup() :: NoticePopup 호출에 실패하였습니다.");

                return resolve(null);
            }
        })
    },

    callValidationPopup: async function () {
        return await new Promise(async (resolve, reject) => {
            const ajaxData = {
                controllerName: "Comm",
                cmd: "IdValidationPopup",
                path: "/Views/Popup",
                popupPath: "main #idValidationPopup_div"
            }

            const ajaxResult = await $au.executeAjax(ajaxData);
            if (!$cu.isEmpty(ajaxResult)) {
                const popupData = { ...$pu.popupParam };
                popupData.id = (ajaxData.cmd).replace(/^[A-Z]/, char => char.toLowerCase());
                popupData.title = "인증";
                popupData.height = 650;
                popupData.width = 1400;
                popupData.contentTemplate = ajaxResult;
                popupData.popupPath = ajaxData.popupPath;

                return resolve(await $pu.createPopup(popupData));
            }
            else {
                $pu.callNoticePopup("인증 팝업 호출에 실패하였습니다.", "알림", "alert", "warn", 0, window.innerWidth / 2.8);

                return resolve([]);
            }
        })
    },

    callSelectPositionPopup: async function () {
        return await new Promise(async (resolve, reject) => {
            const ajaxData = {
                controllerName: "Comm",
                cmd: "SelectPositionPopup",
                path: "/Views/Popup",
                popupPath: "main #selectPositionPopup_div"
            }

            const ajaxResult = await $au.executeAjax(ajaxData);
            if (!$cu.isEmpty(ajaxResult)) {
                const popupData = { ...$pu.popupParam };
                popupData.id = (ajaxData.cmd).replace(/^[A-Z]/, char => char.toLowerCase());
                popupData.title = "직책 선택";
                popupData.height = window.innerHeight / 3;
                popupData.width = window.innerWidth / 2.8;
                popupData.contentTemplate = ajaxResult;
                popupData.popupPath = ajaxData.popupPath;

                return resolve(await $pu.createPopup(popupData));
            }
            else {
                $pu.callNoticePopup("직책 선택 팝업 호출에 실패하였습니다.", "알림", "alert", "warn", 0, window.innerWidth / 2.4);

                return resolve([]);
            }
        })
    }

}

const ajaxUtil = {
    executeAjax: function (data, showPanel = false, hidePanel = false) {
        return new Promise((resolve, reject) => {
            if (showPanel) {
                $vu.showPanel();
            }

            $.ajax({
                type: "POST",
                url: "/" + data.controllerName,
                data: data
            }).done((result, ...args) => {
                if (!$cu.isEmpty(result)) {
                    return resolve(result);
                }
                else {
                    return resolve(null);
                }
            }).fail((data, textStatus, errorThrown) => {
                return reject(new Error(errorThrown));
            }).always(() => {
                if (hidePanel) {
                    $vu.hidePanel();
                }
            })
        }).catch((error) => {
            console.warn(error.message);

            return null;
        })
    }
}

const authUtil = {
    executeValidation: async function (callBack) {
        const data = {
            controllerName: "Comm",
            cmd: "CheckBarcodeUse"
        }

        const ajaxResult = await $au.executeAjax(data);   // SP에서 NO만 return하도록 처리됨. >> 바코드 사용 시 관련 SP 수정 후 조건 분기
        if (ajaxResult.isOk == "OK") {

        }
        else if (ajaxResult.isOk == "NO") {
            return await $pu.callValidationPopup();
        }
    }
}

$.fn.extend({
    attrFilter: function (selector) {
        if ($cu.isEmpty(selector)) {
            return;
        }
        const $target = $(this[0]);
        const $result = $();

        const selectorArry = selector.replace(/\[/ig, "").split("\]").filter((item) => { return (/[\=|\^=|\*=]/).test(item) });
        console.log(selectorArry);

        //const test = "class^='test'".split(/\=|\^=|\*=/);
        //test.push("class^='test'".replace(test[0], "").replace(test[1], ""));
        //console.log(test);
    }
})

window.commonUtil = window.$cu = commonUtil;
window.viewUtil = window.$vu = viewUtil;
window.ajaxUtil = window.$au = ajaxUtil;
window.authUtil = window.$atu = authUtil;
window.popupUtil = window.$pu = popupUtil;