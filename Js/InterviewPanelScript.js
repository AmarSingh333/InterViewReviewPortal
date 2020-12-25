// document.writeln("<script  src='Data/StudentData.js'></script>");

var QuestionList = {
    1: "Explain javascript  class and Object with Example",
    2: "What is CSS and Why we use Css and we can do in Css ?",
    3: "What is functional programming ?",
    4: "What are the pros and cons of functional programming vs object-oriented programming ?",
    5: "What are the pros and cons of monolithic vs microservice architectures ?",
    6: "What is asynchronous programming, and why is it important in JavaScript ?"
};
var studentDetail = "";
var pageMetaData = { CurrentQuestion: 0, NextQuestion: 1, PreviousQuestion: 0, CurrentQuestionGrade: 0, TotalQuestion: 10 };
var GradeDataDict = {};
var labels = [];
var data = [];
var SetChartData = () => {
    for (var i = 0; i < data.length; i++) {
        data[i] = GradeDataDict[i];
    }
};
var PlotRadarChart = () => {
    SetChartData();
    var chart = document.getElementById('radar-chart').getContext('2d');
    var ctx = new Chart(chart, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Result Score',
                backgroundColor: 'rgba(0, 0, 200,0.2)',
                borderColor: 'rgba(0, 255, 0,0.5)',
                data: data
            }]
        }
    });
};
var AssignStudent = (id) => {
    if (id in allStudent) {
        studentDetail = allStudent[id];
        pageMetaData.CurrentQuestion = 0;
        pageMetaData.TotalQuestion = studentDetail.QuestionList.length;
        pageMetaData.NextQuestion = 1;
        pageMetaData.PreviousQuestion = -1;
    } else {
        alert("student data not exist");
    }
}

var SetStudentDetails = () => {
    var img = document.getElementById('user-image');
    img.width = 3 * window.screen.width / 15;
    img.height = 8 * window.screen.height / 30;
    img.src = studentDetail.ImageUrl;
    document.getElementById('name').innerHTML = studentDetail.Name;
    labels = [];
    data = [];
    for (var i = 0; i < studentDetail.QuestionList.length; i++) {
        labels.push("Q" + (i + 1));
        data.push(0);
    }
    document.getElementById('question-count').innerHTML = "Total Question Answered : " + studentDetail.QuestionList.length;
}


var SetStudentData = (node) => {
    var id = parseInt(node.value);
    AssignStudent(id);
    SetStudentDetails();
    BindQuestion(1, QuestionList[studentDetail.QuestionList[0]], studentDetail.VideoLinkDict[studentDetail.QuestionList[0]]);
    ReSetGrade(0);
    PlotRadarChart();
};
var SaveGrade = () => {
    var comment = document.getElementById('comment').value;
    var grade = data[pageMetaData.NextQuestion - 1];
    alert("grade : " + grade + " and comment : " + comment + " Saved Successfully !");
};

var BindQuestion = (qNo, question, videoLink) => {
    document.getElementById("question").innerHTML = "Q . " + qNo + " => " + question;
    document.getElementById("video").src = videoLink;
};
var SetHeight = () => {
    var navBarH = window.screen.height / 10; //10%
    var userProfileH = 2 * window.screen.height / 5; //40%
    var chartH = 2 * window.screen.height / 5; //40%
    document.getElementById("nav").style.height = navBarH + "px";
    document.getElementById("user-image").style.maxHeight = userProfileH + "px";
    document.getElementById("user-image").style.height = userProfileH - 3 + "px";
    document.getElementById("radar-chart").style.maxHeight = chartH + "px";
    document.getElementById("radar-chart").style.height = chartH - 3 + "px";
};
var SubmitScore = () => {
    var finalText = '<table class="table" style="margin: 25% 0% 15% 0%;"><thead class="thead-dark"><tr><th>Question No.</th><th>Score</th></tr></thead><tbody>';
    for (var i = 0; i < data.length; i++) {
        finalText += '<tr><td>' + (i + 1) + '</td><td>' + data[i] + '</td>';
    }
    finalText += '</tbody></table>';
    document.getElementById("content").innerHTML = finalText;
}
var SetNextQuestion = (node) => {
    var index = parseInt(node.value);
    if (index < pageMetaData.TotalQuestion) {
        ReSetGrade(0);
        BindQuestion(index + 1, QuestionList[studentDetail.QuestionList[index]], studentDetail.VideoLinkDict[studentDetail.QuestionList[index]]);
        pageMetaData.NextQuestion += 1;
        pageMetaData.PreviousQuestion += 1;
        document.getElementById("btn-p").value = pageMetaData.PreviousQuestion;
        document.getElementById("btn-n").value = pageMetaData.NextQuestion;
    } else {
        SubmitScore();
        alert(" submit ");
    }
};
var SetPreviousQuestion = (node) => {
    var index = parseInt(node.value);
    if (index < 0) {
        return null;
    } else {
        ReSetGrade(0);
        BindQuestion(index + 1, QuestionList[studentDetail.QuestionList[index]], studentDetail.VideoLinkDict[studentDetail.QuestionList[index]]);
        pageMetaData.NextQuestion -= 1;
        pageMetaData.PreviousQuestion -= 1;
        document.getElementById("btn-p").value = pageMetaData.PreviousQuestion;
        document.getElementById("btn-n").value = pageMetaData.NextQuestion;
    }
};
var SetGrade = (node) => { //grade-marked
    var grade = parseInt(node.value);
    pageMetaData.CurrentQuestionGrade = grade;
    var index = pageMetaData.NextQuestion - 1;
    GradeDataDict[index] = grade;
    ReSetGrade(grade);
    PlotRadarChart();
};
var ReSetGrade = (grade) => {
    for (var i = 1; i <= 5; i++) {
        var element = document.getElementById("g" + i);
        if (i <= grade) {
            element.className += " grade-marked";
        } else {
            element.classList.remove("grade-marked");
        }
    }
}
var PageLoad = () => {
    SetHeight();
    var studentDropdown = "";
    for (var i = 0; i < allStudentId.length; i++) {
        studentDropdown += "<option value=" + allStudentId[i] + ">" + allStudent[allStudentId[i]].Name + "</option>";
    }
    document.getElementById('student-dropdown').innerHTML = studentDropdown;
    AssignStudent(1);
    SetStudentDetails();
    BindQuestion(1, QuestionList[studentDetail.QuestionList[0]], studentDetail.VideoLinkDict[studentDetail.QuestionList[0]]);
    for (var i = 0; i < pageMetaData.TotalQuestion; i++) {
        GradeDataDict[i] = 0;
    }
    PlotRadarChart();
}
PageLoad();
