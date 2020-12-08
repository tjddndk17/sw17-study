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
                function solution(jobs) {
                    
                    let count = jobs.length;
                    let time = 0;
                    let sum = 0;
                    
                    // 최초 정렬
                    jobs.sort((acc,cur) => {
                        return acc[0] === cur[0] ? acc[1] - cur[1] : acc[0] - cur[0];
                    });
                    
                    while (jobs.length > 0) {
               
                        // 진행가능한 job
                        const job = jobs.filter(item => item[0] <= time);
                        
                        // 진행할 job
                        let run = null;
              
                        if (job.length > 0) {
                            
                            // 진행가능한 job중 소요시간이 가장 작은것
                            job.sort((a,b) => a[1] - b[1]);
                            let minIndex = jobs.findIndex(item => item === job[0]);
                            run = jobs.splice(minIndex, 1)[0];
                        } else {
                            
                            // 진행가능한 job 없으면 첫번째 job
                            run = jobs.shift();
                        }
                        
                        // 시간 계산
                        sum += run[0] >= time ? run[1] : run[1] + time - run[0];
                        time = run[0] >= time ? run[1] + run[0] : time + run[1];
                    }
                
                    return Math.floor(sum/count);
                }
            `},
            {quiz: '프린터', source: 'https://programmers.co.kr/learn/courses/30/lessons/42587?language=javascript', code: `
                function solution(priorities, location) {
                    let answer = 0;
                    
                    // 원래의 순번을 알기위해 2차원 배열로 변경
                    let list = priorities.map((e,i)=>{
                        return [e,i];
                    })
                    
                    let index = 0;
                    while(list.length > 0) {
                        let num = list.splice(0, 1)[0];
            
                        // 뒤에 큰값이 있으면 맨뒤로
                        if(list.filter(e => e[0]>num[0]).length > 0){
                            list.push(num);
                        }
                        // 뒤에 큰값이 없으면 출력
                        else {
                            index++;
                            if(num[1] == location){
                                return index;
                            }
                        }
                    }
                }
            `},
            {quiz: '여행경로', source: 'https://programmers.co.kr/learn/courses/30/lessons/43164', code: `
                function solution(tickets){
                    let answer = []
                
                    // 최조 정렬
                    tickets.sort();
                    let done = false;
                    
                    // 최초 실행
                    dfs('ICN', tickets, []);
                
                    function dfs(departure, remain, route) {
                    
                        if (done) return;
                    
                        // 여행 가능한 경로
                        const possibleTickets = remain.filter(item => item[0] === departure);
                    
                        possibleTickets.forEach(possibleTkt => {
                        
                            // array 복제
                            let tmp_remain = Array.from(remain);
                            let tmp_route = Array.from(route);
                        
                            // 해당 index
                            const idx = tmp_remain.findIndex(item => item === possibleTkt);
                            tmp_remain.splice(idx, 1);
                        
                            // 최종 여행경로 O
                            if (tmp_route.length === tickets.length - 1) {
                                tmp_route = tmp_route.concat(possibleTkt);
                                done = true;
                                answer = tmp_route;
                            }
                            // 최종 여행경로 X
                            else {
                                tmp_route.push(possibleTkt[0]);
                                dfs(possibleTkt[1], tmp_remain, tmp_route);
                            }
                        })
                    }
                
                    return answer;
                }
            `}
        ]
    },
    {
        week: '5',
        list: [
            {quiz: '체육복 [ 탐욕법 / Lv.1 ]', source: 'https://programmers.co.kr/learn/courses/30/lessons/42862', code: `
                function solution(n, lost, reserve) {
                    let answer = 0;
                    
                    let list = [];
                    for(let i=1; i<=n; i++){
                        let item = 1;
                        
                        if(lost.indexOf(i) >= 0){
                            item--;
                        }
                        
                        if(reserve.indexOf(i) >= 0){
                            item++;
                        }
                        
                        list.push(item);
                    }
                    
                    for(let i=0; i<list.length; i++){
                        let u = list[i];
                        
                        if(u == 0){
                            if(i > 0){
                                if(list[i-1] > 1){
                                    list[i-1] = 1;
                                    u = 1;
                                }
                            }
                            
                            if(u == 0 && i<list.length){
                                if(list[i+1] > 1){
                                    list[i+1] = 1;
                                    u = 1;
                                }
                            }
                        }
                        
                        if(u>0){
                            answer++;
                        }
                    }
                    
                    return answer;
                }
            `},
            {quiz: '자동완성 [ Lv.4 ]', source: 'https://programmers.co.kr/learn/courses/30/lessons/17685', code: `
                function solution(words) {
                    let answer = 0;
                    words.sort();
                    for(let item of words){
                        let check = '';
                
                        for(let i=0; i<item.length; i++){
                            check += item[i];
                            let count = words.filter((word) => {
                                return word.substr(0, i+1) == check;
                            }).length;
                    
                            if(count == 1){
                                break;
                            }
                        }
                
                        answer += check.length;
                    }
                    
                    return answer;
                }
            `}
        ]
    },
    {
        week: '6',
        list: [
            {quiz: '다리를 지나는 트럭 [ Lv.2 ]', source: 'https://programmers.co.kr/learn/courses/30/lessons/42583', code: `
                function solution1(bridge_length, weight, truck_weights) {
                    let answer = 0;
                
                    // 다리 현재 무게
                    let bridgeWeight = 0;
                
                    // 다리 상태 초기화
                    let bridge = [];
                    for(let i =0;i<bridge_length;i++){
                        bridge.push(0);
                    }
                
                    // 대기트럭이 있거나 대기트럭이 끝났을땐 현재다리무게가 있어야함
                    while(truck_weights.length > 0 || (bridgeWeight > 0 && truck_weights.length == 0)){
                    
                        // 마지막 지나감
                        bridgeWeight -= bridge.pop();
                    
                        if(truck_weights.length){
                        
                            // 다음트럭
                            let truck = truck_weights.shift();
                        
                            // 진입가능
                            if(truck + bridgeWeight <= weight){
                                bridge.unshift(truck);
                                bridgeWeight += truck;
                            }
                            // 진입불가
                            else {
                                bridge.unshift(0);
                                truck_weights.unshift(truck);
                            }
                        }
                    
                        answer++;
                    }
                
                    return answer;
                }
            `},
            {quiz: '섬 연결하기 [ Lv.3 ]', source: 'https://programmers.co.kr/learn/courses/30/lessons/42861?language=javascript', code: `
                function solution(n, costs) {
                    let answer = 0;
                    let island = [];    // 이어진 섬 정보
                    let bridge = [];    // 지어진 다리 정보
                    let total = 0;      // 지어진 다리 갯수
                    
                    // 비용 오름다차순
                    costs.sort((a, b) => a[2] - b[2]);
                    
                    // 첫번째 값부터 담고 시작(가장 적은 비용이니까)
                    island[costs[0][0]] = true;
                    island[costs[0][1]] = true;
                    bridge[0] = true;
                    answer += costs[0][2];
                    total += 2;
                    
                    // 모든 다리를 다 지을때 까지
                    while (total < n) {
                        
                        //전체 다리 정보를 순회
                        for (let i = 1; i < costs.length; i++) {
                            let [start, end, cost] = costs[i];
                            
                            // 1. 해당 다리를 짓지 않았고
                            // 2-1. start 섬은 연결 된 상태에 end 섬은 연결 안된 경우
                            // 2-2. 혹은 end 섬은 연결 된 상태에 start 섬은 연결 안된 경우
                            if (
                                !bridge[i] &&
                                ((island[start] && !island[end]) || (!island[start] && island[end]))
                            ) {
                                //해당 섬/다리/비용 정보 추가
                                island[start] = true;
                                island[end] = true;
                                bridge[i] = true;
                                answer += cost;
                                total++;
                                break;
                            }
                        }
                    }
                    
                    return answer
                }
            `}
        ]
    },
    {
        week: '7',
        list: [
            {quiz: '124 나라의 숫자 [ Lv.2 ]', source: 'https://programmers.co.kr/learn/courses/30/lessons/12899', code: `
            
            `},
            {quiz: '2 x n 타일링 [ Lv.3 ]', source: 'https://programmers.co.kr/learn/courses/30/lessons/12900?language=javascript', code: `
            
            `}
        ]
    }
]