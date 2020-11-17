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
    },
    
    // 2 추차
    // =================================================================================================================
    {
        week: '3',
        list: [
            {quiz:'조이스틱', source: 'https://programmers.co.kr/learn/courses/30/lessons/42860', code: `
                function solution(name) {
                    let answer = 0;
                    
                    // 기본 셋팅
                    const abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                    const arr = name.split("");
                    
                    // 위아래 최소값 구하기
                    for(let val of arr){
                        let index = abc.indexOf(val);
                        answer += index >= 13 ? 26 - index : index;
                    }
                    
                    // 좌우 최소값 구하기
                    // 좌, 우, 좌->우, 우->좌 4가지 방법이있고
                    // A가 아닌 영문은 기준이 될수있음
                    // 해당기준으로 모든 경우의 수를 구하여 그중에 최소값을 구하기
                    let moveList = [];
                    for(let i=1; i<arr.length; i++){
                        if(arr[i-1] != "A"){
                            
                            let srr = arr.slice(0, i);
                            let nrr = arr.slice(i, arr.length);
                            
                            let ssr = nrr.concat(srr);
                            let nnr = srr.reverse().concat(nrr.reverse());
                            
                            let ssrCount = 0;
                            let nnrCount = 0;
                            
                            for(let j=0; j<ssr.length; j++){
                                if(ssr[j] != "A") ssrCount = j;
                            }
                            
                            for(let j=0; j<nnr.length; j++){
                                if(nnr[j] != "A") nnrCount = j;
                            }
                            
                            moveList.push(Math.min(ssrCount, nnrCount) + Math.min(i-1, arr.length - i + 1));
                        }
                    }
                    
                    answer += Math.min(...moveList);
                    
                    return answer;
                }
            `},
            {quiz:'가장 큰 수', source: 'https://programmers.co.kr/learn/courses/30/lessons/42746', code: `
                function solution(numbers) {
                    let answer = '';
                    
                    // string 으로 변환
                    let arr = numbers.map(val => String(val));
                    
                    // 가장큰수가 되기 위해선 이어붙인 수중 큰것이 앞으로 오면됨
                    arr.sort((a, b) => {
                        if(a+b > b+a){
                            return -1;
                        }
                        
                        if(a+b < b+a){
                            return 1;
                        }
                        
                        return 0;
                    })
                
                    // 0000... 일때는 0, 아니면 이어붙인 값
                    answer = arr[0] === "0" ? "0" : arr.join("");
                
                    return answer;
                }
            `},
            {quiz:'베스트앨범', source: 'https://programmers.co.kr/learn/courses/30/lessons/42579', code: `
                function solution(genres, plays){
                    let answer = [];
                    
                    // 장르별로 묶기위하여 Set으로 중복제거
                    let arr = new Set(genres);
                    
                    // 장르별 obj 공간을 만들어줌 [ name: 장르명, list: 노래가 들어갈 list, sum: 장르의 총 재생수 ]
                    let obj = [];
                    for(let val of arr){
                        obj.push({name: val, list: [], sum: 0});
                    }
                    
                    // 장르별 obj 공간에 노래들을 알맞게 넣어줌
                    for(let i=0; i<genres.length; i++){
                        for(let item of obj){
                            if(item.name == genres[i]){
                                item.list.push({id: i, plays: plays[i]});
                                item.sum += plays[i];
                            }
                        }
                    }
                    
                    // 1. 장르 총 재생수 대로 정렬
                    obj.sort((a,b) => b.sum - a.sum);
                
                    // 2. 장르의 노래 리스트중 재생수 대로 정렬, 재생수 같으면 id대로 정렬
                    // 3. 정렬이 되었으니 0,1 번째 노래의 id를 넣어줌
                    for(let item of obj){
                        item.list.sort((a,b) => {
                            if(a.plays > b.plays){
                                return -1;
                            }
                            if(a.plays < b.plays){
                                return 1;
                            }
                            if(a.id > b.id){
                                return 1;
                            }
                            if(a.id < b.id){
                                return -1;
                            }
                            return 0;
                        });
                
                        answer.push(item.list[0].id)
                        if(item.list[1]) answer.push(item.list[1].id);
                    }
                    
                    return answer;
                }
            `},
        ]
    },
    {
        week: '4',
        list: [
            {quiz: '디스크 컨트롤러', source: 'https://programmers.co.kr/learn/courses/30/lessons/42627?language=javascript', code: `
            
            `},
            {quiz: '프린터', source: 'https://programmers.co.kr/learn/courses/30/lessons/42587?language=javascript', code: `
            
            `},
            {quiz: '여행경로', source: 'https://programmers.co.kr/learn/courses/30/lessons/43164', code: `
            
            `}
        ]
    }
]