
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div id="page_nav">
    <c:if test="${requestScope.page.pageNo > 1}">
        <a href="${requestScope.page.url}&pageNo=1">首页</a>
        <a href="${requestScope.page.url}&pageNo=${requestScope.page.pageNo - 1}">上一页</a>
    </c:if>

    <%-- 连续页码页范围 开始 --%>
    <c:choose>
        <%-- 情况1: 总页码 <= 5 的情况 页码范围是: 1 - 总页码 --%>
        <c:when test="${requestScope.page.pageTotal <= 5}">
            <c:set var="begin" value="1"/>
            <c:set var="end" value="${requestScope.page.pageTotal}"/>
        </c:when>

        <%-- 情况2: 总页码 > 5 的情况 --%>
        <c:when test="${requestScope.page.pageTotal > 5}">
            <c:choose>
                <%-- 情况2-1: 页码是1 2 3 --%>
                <c:when test="${requestScope.page.pageNo <= 3}">
                    <c:set var="begin" value="1"/>
                    <c:set var="end" value="5"/>
                </c:when>
                <%-- 情况2-2: 页码是最后3页 --%>
                <c:when test="${requestScope.page.pageNo > requestScope.page.pageTotal - 3}">
                    <c:set var="begin" value="${requestScope.page.pageTotal - 4}"/>
                    <c:set var="end" value="${requestScope.page.pageTotal}"/>
                </c:when>
                <%-- 情况2-3: 其它页码 --%>
                <c:otherwise>
                    <c:set var="begin" value="${requestScope.page.pageNo - 2}"/>
                    <c:set var="end" value="${requestScope.page.pageNo + 2}"/>
                </c:otherwise>
            </c:choose>
        </c:when>
    </c:choose>
    <%-- 连续页码页范围 结束 --%>
    <c:forEach begin="${begin}" end="${end}" var="i">
        <c:if test="${i == requestScope.page.pageNo}">
            【 ${i} 】
        </c:if>
        <c:if test="${i != requestScope.page.pageNo}">
            <a href="${requestScope.page.url}&pageNo=${i}">${i}</a>
        </c:if>
    </c:forEach>

    <c:if test="${requestScope.page.pageNo < requestScope.page.pageTotal}">
        <a href="${requestScope.page.url}&pageNo=${requestScope.page.pageNo + 1}">下一页</a>
        <a href="${requestScope.page.url}&pageNo=${requestScope.page.pageTotal}">末页</a>
    </c:if>

    共${requestScope.page.pageTotal}页，${requestScope.page.pageTotalCount}条记录 到第<input value="${param.pageNo}" name="pn" id="pn_input"/>页
    <input id="page-btn" type="button" value="确定">
</div>

<script>
    $(function() {
      $("#page-btn").on("click", function() {
        // 获取页码输入框里面的值
        let $pageNo = $("#pn_input").val()

        // 获取总页码
        let $pageTotal = ${requestScope.page.pageTotal}

        if($pageNo == "" || $pageNo < 1 || $pageNo > $pageTotal) return false
        location.href = "${pageScope.basePath}manager/book_list?action=page&pageNo=" + $pageNo
      })
    })
</script>
