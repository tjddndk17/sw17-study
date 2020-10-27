// 완주하지 못한 선수
function solution1(participant, completion) {
    
    /* 느림
    for(var i=0; i<participant.length; i++){
        var index = completion.indexOf(participant[i]);
        if(index == -1) {
            return participant[i];
        } else {
            completion.splice(index, 1);
        }
    }
    */

    participant.sort();
    completion.sort();
    
    // sort로 졍렬하면 순서가 같아지기 때문에 같은순번에 다른값을 찾음
    for(var i=0; i<participant.length; i++){
        if(participant[i] !== completion[i]){
            return participant[i];
        }
    }
}


// 모의고사
function solution2(answers) {
    var answer = [];

    // user list
    var userList = [
        {
            user: 1,
            type: [1, 2, 3, 4, 5],
            count: 0
        },
        {
            user: 2,
            type: [2, 1, 2, 3, 2, 4, 2, 5],
            count: 0
        },
        {
            user: 3,
            type: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
            count: 0
        }
    ]

    // 정답 count set
    answers.forEach((value, index) => {
        userList.forEach((v,i) => {
            if(value === v.type[index%v.type.length]) v.count ++;
        })
    })

    // 최고점수 get
    var maxCount = userList.reduce((acc, curr) => {
        return acc.count >= curr.count ? acc : curr;
    }).count;

    // 최고점수 유저 set
    userList.forEach((value) => {
       if(value.count === maxCount) answer.push(value.user)
    })

    return answer;
}
