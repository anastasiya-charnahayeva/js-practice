let selectedUsers = [];
let monthlyCommentTrend = [];
let postPerUser = [];
let percentagePostsPerUser =[];
const months = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec",
];




const getUsers = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/users')
   .then((response) => response.json())
   .then((json) => {
       let divChecks = document.getElementById('selectUsers');
       json.forEach(user => {
               let option = document.createElement('option');
               option.setAttribute('key', user.id);
               option.setAttribute('value', user.id);
               divChecks.appendChild(option);
               option.innerText = `${user.name}`;
       })
       selectedUsers = json.map(e => e.id);
       return json;
   });
   return res;
};




const getPosts = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
   .then((response) => response.json())
   .then((json) => json);
   return res;
};




const getComments = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/comments')
   .then((response) => response.json())
   .then((json) => {
       const comments = json.map(comment => {
        let createdDate = new Date();
        createdDate = createdDate.setMonth(createdDate.getMonth() -  Math.floor(Math.random()*10));
           comment['timestamp'] = createdDate;
           return comment;
       });
       return comments;
   });
   return res;
};


// viewport height
let v_height = 400;




function generateRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}




function createLabel(node, text) {
   // y axis's labels
   const yAxis_x = 75;
   const yAxis_y = [350, 275, 200, 125, 55];
   const values_y = [0, 15, 30, 45, 60];
   yAxis_y.forEach((value, idx) => {
       const label = document.createElementNS(
           "http://www.w3.org/2000/svg",
           "text"
       );
 
       label.setAttribute("x", yAxis_x);
       label.setAttribute("y", value);
 
       // label.classList.add("label y-labels");
 
       label.innerHTML = values_y[idx] ;
 
       node.appendChild(label);
   })




   // x axis's labels
   let step = 0;
   const xAxis_x = 130;
   const xAxis_y = 375;
   text.forEach((value) => {
       const label = document.createElementNS(
           "http://www.w3.org/2000/svg",
           "text"
       );
 
       label.setAttribute("x", xAxis_x + step);
       label.setAttribute("y", xAxis_y);
 
       label.innerHTML = value;
 
       node.appendChild(label);
       step += 50;
   })
}




function createAxis(node) {
   // draw y axis
   let polyline_y = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
   polyline_y.setAttribute('points', '100,50 100,350');
   polyline_y.setAttribute('style', 'stroke: black; stroke-width: 2');
   node.appendChild(polyline_y);
   // draw x axis
   let polyline_x = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
   polyline_x.setAttribute('points', '100,350 700,350');
   polyline_x.setAttribute('style', 'stroke: black; stroke_width: 2');
   node.appendChild(polyline_x);
}


function resetNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild)
    }
}


function drawBar() {
   document.getElementById('barTitle').innerHTML = 'The number of posts per user';
   let svgElement = document.getElementById('svgBar');
   resetNode(svgElement);
   createLabel(svgElement, postPerUser.map(el => el.userId));
   createAxis(svgElement);
   let amount = postPerUser.map(x => {return x.amount*3});
   let pos = 120;
   for (let i=0; i < postPerUser.length; i++) {
       let rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
       rectangle.setAttribute('x', pos);
       rectangle.setAttribute('y', (v_height - amount[i] - 70));
       rectangle.setAttribute('width', 40);
       rectangle.setAttribute('height', amount[i] + 20);
       rectangle.setAttribute('fill', generateRandomColor());
       rectangle.setAttribute('class', 'bar');
       rectangle.setAttribute('id', 'green' + i.toString());
       svgElement.appendChild(rectangle);
       pos += 50;
   }
}


function drawLine() {
   document.getElementById('lineTitle').innerHTML = `The monthly comment trend`;
   let svgElement = document.getElementById('svgLine');  
   resetNode(svgElement);
   createLabel(svgElement, months);
   createAxis(svgElement);
   let x_coor = 130;
   let sortedComments = monthlyCommentTrend.map(el => el.amountComments);
   let arrData = sortedComments.map((e) => {
    let response = [x_coor,  e + 35 ];
    x_coor += 60;
    return response;
   });
   let line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
   line.setAttribute('points', [arrData]);
   line.setAttribute('style', 'stroke-width: 5; fill: none');
   line.setAttribute('stroke', generateRandomColor())
   line.setAttribute('id', 'data1');
   svgElement.appendChild(line);
}


function makeSVG(tag, attrs) {
    let el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
    return el;
}


function drawPie() {
    document.getElementById('pieTitle').innerHTML = `The percentage distribution of posts among users`;
    let svgElement = document.getElementById('svgPie');
    resetNode(svgElement);
    let color = percentagePostsPerUser.map(() => generateRandomColor());
    if (percentagePostsPerUser.length > 1) {
        let total = percentagePostsPerUser.reduce(function (accu, that) { return that + accu; }, 0);
        let sectorAngleArr = percentagePostsPerUser.map(function (v) { return 360 * v / total; });
   
        let startAngle = 0;
        let endAngle = 0;
        for (let i=0; i<sectorAngleArr.length; i++){
            startAngle = endAngle;
            endAngle = startAngle + sectorAngleArr[i];
   
            let x1,x2,y1,y2 ;
   
            x1 = parseInt(Math.round(200 + 195*Math.cos(Math.PI*startAngle/180)));
            y1 = parseInt(Math.round(200 + 195*Math.sin(Math.PI*startAngle/180)));
   
            x2 = parseInt(Math.round(200 + 195*Math.cos(Math.PI*endAngle/180)));
            y2 = parseInt(Math.round(200 + 195*Math.sin(Math.PI*endAngle/180)));
   
            let d = "M200,200  L" + x1 + "," + y1 + "  A195,195 0 " +
                    ((endAngle-startAngle > 180) ? 1 : 0) + ",1 " + x2 + "," + y2 + " z";
            let arc = makeSVG("path", {d: d, fill: color[i]});
            svgElement.appendChild(arc);
        }


    } else {
        let strokeWidth = 200;
        let rotate = 0;
        let yPosition = v_height / 2;
        let xPosition = yPosition;
        let radius = v_height / 2 - strokeWidth / 2;
        let strokDashArray = Math.PI * 2 * radius;
        let strokeDashOffset = strokDashArray - (percentagePostsPerUser[0] * strokDashArray) / 100;
        let circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circ.setAttribute('cx', xPosition);
        circ.setAttribute('cy', yPosition);
        circ.setAttribute('r', radius);
        circ.setAttribute('stroke-width', strokeWidth);
        circ.setAttribute('stroke', color[0]);
        circ.setAttribute('stroke-dasharray', percentagePostsPerUser[0] * strokDashArray);
        circ.setAttribute('stroke-dashoffset', strokeDashOffset);
        circ.setAttribute(
        "transform-origin",
        xPosition + "px " + yPosition + "px"
        );
        circ.setAttribute("transform", "rotate(" + rotate + ")");
        svgElement.appendChild(circ);
       
    }
}


const updateAll = async () => {
   const users = await getUsers();
   const posts = await getPosts();
   const comments = await getComments();




   const utf = '&#9989;';




   let divChecks = document.getElementById('selectUsers');
   divChecks.addEventListener('click', (e) => {
       e.stopPropagation();
       const options = document.querySelectorAll('option');
       options.forEach(option => {
           if (option.value == e.target.value) {
               if (selectedUsers.length === users.length) {
                   selectedUsers = [];
               }


               if (!selectedUsers.includes(e.target.value)) {
                   let checked = document.createElement('span');
                   checked.classList.add(`showCheckBox_${e.target.value}`);
                   checked.innerHTML= `${utf}`;
                   checked.setAttribute('key', e.target.value);
                   option.appendChild(checked);
                   selectedUsers.push(e.target.value);
               } else {
                   option?.lastChild?.remove();
                   selectedUsers.splice(selectedUsers.findIndex(el => el === e.target.value), 1);
               }
           }




       })
       updateData();
   })




   const getPostPerUser = () => {
       let postAm = [];
       let filteredUsers = selectedUsers.length !== users.length ? users.filter(user => selectedUsers.includes(user.id.toString())) : users;
       for (let i = 0; i < filteredUsers.length; i++) {
           const postsUpdated = posts.filter(post => filteredUsers[i].id == post.userId);
           postAm.push({user: filteredUsers[i].name, amount: postsUpdated.length, userId: filteredUsers[i].id});
       }
       return postAm;
   }




   const getMonthlyCommentTrend = () => {
       let res = [];
       let filteredPosts = selectedUsers.length !== users.length ? posts.filter(post => selectedUsers.includes(post.userId.toString())) : posts;
       let filteredComments =selectedUsers.length !== users.length ? comments.filter(comment => filteredPosts.findIndex(post => post.id === comment.postId) !==-1) : comments;
       const sortedComments = filteredComments.map(comment => {
           const commentMonth = months[new Date(comment.timestamp).getMonth()];
           return {month: commentMonth, amountComments: 0};
       });
       sortedComments.forEach(el => {
           let idx = res.findIndex(e => e.month === el.month)
           if (idx !== -1) {
                res[idx].amountComments+=1;
           } else {
            res.push(el);
           }
       })
       res = res.sort((a, b) => {
        return months.indexOf(a.month) - months.indexOf(b.month);
       })
       return res;
   }




   const getDistributionPostsPerUser = () => {
        let arrayPercentage = [];
        let filteredPosts = selectedUsers.length !== users.length ? postPerUser.filter(post => selectedUsers.includes(post.userId.toString())) : postPerUser;
        filteredPosts.forEach(element => {
            let percent = (element.amount * 100)/posts.length;
            arrayPercentage.push(percent);
        })
        return arrayPercentage;
   }


   const updateData = () => {
    if (users.length && posts.length && comments.length) {
          postPerUser = getPostPerUser();
          monthlyCommentTrend = getMonthlyCommentTrend();
          percentagePostsPerUser = getDistributionPostsPerUser();
          drawBar();
          drawLine();
          drawPie();
      }
   }
   updateData();
}




updateAll();










