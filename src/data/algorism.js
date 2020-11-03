export default [
    
    // 1 주차
    // =================================================================================================================
    {
        week: '1',
        list: [
            {quiz: '완주하지 못한 선수', source: 'https://programmers.co.kr/learn/courses/30/lessons/42576', code: `
                function solution(participant, completion) {
                    /*
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
                    for(var i=0; i<participant.length; i++){
                        if(participant[i] !== completion[i]){
                            return participant[i];
                        }
                    }
                }
            `},
            {quiz:'모의고사', source: 'https://programmers.co.kr/learn/courses/30/lessons/42840', code: `
                function solution(answers) {
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
            `}
        ]
    },
    
    // 2 추차
    // =================================================================================================================
    {
        week: '2',
        list: [
            {quiz:'문자열 내 마음대로 정렬하기', source: 'https://programmers.co.kr/learn/courses/30/lessons/12915', code: `
                function solution(strings, n) {
                    let answer = [];
            
                    // 먼저 n번째 문자를 비교해서 정렬후 n번째 문자가 같으면 전체비교 정렬
                    answer = strings.sort((a, b) => {
                        if(a[n] < b[n]){
                            return -1;
                        }
            
                        if(a[n] > b[n]){
                            return 1;
                        }
            
                        if(a < b){
                            return -1;
                        }
            
                        if(a > b){
                            return 1;
                        }
            
                        return 0;
                    })
            
                    return answer;
                }
            `},
            {quiz:'예산', source: 'https://programmers.co.kr/learn/courses/30/lessons/12982', code: `
                function solution(d, budget) {
                    let answer = 0;
                    
                    // 작은순서 대로 정렬
                    d.sort((a,b) => a-b);
                    
                    // 작은수부터 차례차례 더하는것이므로 budget 넘어가기 전까지가 최대 개수
                    d.reduce((acc, curr) => {
                        const buy = acc + curr;
                        if(budget >= buy){
                            answer++;
                            return buy;
                        } else {
                            return acc;
                        }
                    }, 0)
                    
                    return answer;
                }
            `},
            {quiz:'크레인 인형뽑기 게임', source: 'https://programmers.co.kr/learn/courses/30/lessons/64061', code: `
                function solution(board, moves) {
                    let answer = 0;
                
                    let keep = [];
                    
                    for(let value of moves) {
                        let index = value - 1;
                        
                        // item 바구니에 넣음
                        // 각 i줄의 index번째에 값이 있는지 확인후 있으면 바구니에 추가
                        for(let item of board) {
                            if(item[index] > 0){
                                keep.push(item[index]);
                                item[index] = 0;
                                break;
                            }
                        }
                        
                        // 같은 아이템 삭제
                        // 아이템을 삭제할수 있는 경우는 뒤쪽 2개의 아이템은 같은 경우뿐
                        if(keep.length > 1){
                            if(keep[keep.length-1] === keep[keep.length-2]){
                                answer += 2;
                                keep = keep.slice(0,-2);
                            }
                        }
                    }
                    
                    return answer;
                }
            `}
        ]
    }
]