<%--
  Created by IntelliJ IDEA.
  User: Ömer Aktürk
  Date: 16.03.2019
  Time: 17:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <%out.print(request.getParameter("stackTrace"));%>
    <%out.print(request.getParameter("cause"));%><%--
    ${cause}
    ${localize}
    ${message}--%>
</body>
</html>
