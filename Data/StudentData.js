class Student {
    constructor(id, name, imageUrl, qlist, vlink) {
        this.Id = id;
        this.Name = name;
        this.ImageUrl = imageUrl;
        this.QuestionList = qlist;
        this.VideoLinkDict = vlink;
    }
}
var allStudentId = [1, 2];
var allStudent = {
    1: new Student(1, "Amar Singh", "https://wallpaperaccess.com/full/2213427.jpg", [1, 2, 3, 4, 5], { 1: "https://www.youtube.com/embed/T-HGdc8L-7w", 2: "https://www.youtube.com/embed/NKjwOjWdR_Q", 3: "https://www.youtube.com/embed/dAPL7MQGjyM", 4: "https://www.youtube.com/embed/cwV1ekXSMV0", 5: "https://www.youtube.com/embed/RJkn9VHM7lc" }),
    2: new Student(1, "Amar", "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg", [1, 2, 3, 4], { 1: "https://www.youtube.com/embed/XPw7nQSmMqU", 2: "https://www.youtube.com/embed/_MBDfH8Ithc", 3: "https://www.youtube.com/embed/KHojnWHemO0", 4: "https://www.youtube.com/embed/fsVL_xrYO0w" })
};
var GetStudentDetailById = (id) => {
    if (id in allStudent) {
        return allStudent[id];
    }
    return null;
};
