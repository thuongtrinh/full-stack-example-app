<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <style>
        body {
            font-family: "Calibri", sans-serif;
            color: black;
        }

        p {
            margin-right: 0in;
            margin-left: 0in;
            font-size: 15px;
            font-family: "Calibri", sans-serif;
            margin-top: 0in;
            margin-bottom: 10pt;
            line-height: 150%;
            margin: 0in;
        }

        table {
            border-spacing: 10px;
        }

        .info-title, .content {
            font-weight: bold;
        }

        .info {
            font-style: italic;
            color: red;
        }
    </style>
</head>
<body>
<#if language == 'vi'>
    <table>
        <tbody>
        <tr>
            <td colspan="2">
                <p>
                    <span> Xin chào ${("${patientName}")!''}, </span>
                </p>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <p>
                    Bạn nhận vừa đặt lịch khám bệnh trực tuyến trên website HealthCare
                </p>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <p class="info-title">Thông tin đặt lịch khám bệnh:</p>
                <p><span class="content">Thời gian:</span> <span class="info">${("${time}")!''}</span></p>
                <p><span class="content">Bác sĩ:</span> <span class="info">${("${doctorName}")!''}</span></p>
                <p>
                    Nếu các thông tin trên hoàn toàn chính xác, vui lòng click <a href="${("${url}")!''}">vào đây</a>
                    để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
                </p>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <p><span>Trân trọng cảm ơn!</span></p>
            </td>
        </tr>
        </tbody>
    </table>
<#else>
    <table>
        <tbody>
        <tr>
            <td colspan="2">
                <p>
                    <span>Dear ${("${patientName}")!''}, </span>
                </p>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <p>You booked an online appointment on website HealthCare</p>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <p class="info-title">Infomation to schedule an appointment:</p>
                <p><span class="content">Time:</span> <span class="info">${("${time}")!''}</span></p>
                <p><span class="content">Doctor:</span> <span class="info">${("${doctorName}")!''}</span></p>
                <p>
                    If above information is correct, please click <a href="${("${url}")!''}">at here</a>
                    to confirm and complete the appointment.
                </p>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <p><span> Sincerely thanks!</span></p>
            </td>
        </tr>
        </tbody>
    </table>
</#if>
</body>
</html>
