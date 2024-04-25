// let users = []; //all users
// let posts = []; //all posts
// let comments = []; // all comments 
 const users = (async () => {
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
        return json;
    });
    return res;
 })();

 const posts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => json);
    return res;
 }

 const comments = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
    .then((response) => response.json())
    .then((json) => {
        const comments = json.map(comment => {
            comment['timestamp'] = new Date().getTime() + Math.random();
            return comment;
        });
        return comments;
    });
    return res;
 }

const utf = '&#9989;';


let selectedUsers = users;
const body = document.getElementById('main');


let divChecks = document.getElementById('selectUsers');
divChecks.addEventListener('click', (e) => {
    e.stopPropagation();
    const options = document.querySelectorAll('option');
    options.forEach(option => {
        if (selectedUsers.length === users.length) {
            selectedUsers = [];
        }
        if (option.value == e.target.value && !selectedUsers.includes(e.target.value)) {
            if (e.target.value == "0") {
                selectedUsers = selectedUsers.filter(el => el == "0");
                for (let i = 1; i <options.length; i++) {
                    options.forEach( opt => {
                        console.log('selectedUsers',  selectedUsers.includes(opt.value))
                        if (selectedUsers.includes(opt.value)) return opt.lastChild.remove();
                    })
                }
            }
            let checked = document.createElement('span');
            checked.classList.add('showCheckBox');
            checked.innerHTML= `${utf}`;
            checked.setAttribute('key', e.target.value);
            option.appendChild(checked);
            selectedUsers.push(e.target.value);
        } else if (option.value == e.target.value) {
            option.lastChild.remove();
            selectedUsers.splice(selectedUsers.findIndex(el => el == e.target.value), 1);
        }
        if (!selectedUsers.length) selectedUsers = users;
    })
})

// const recordUsers = (userList) => {
//     users = userList;
//     console.log("uu", users);
// }

// const getusers = () => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => response.json())
//     .then((json) => {
//         recordUsers(json);
//         let divChecks = document.getElementById('selectUsers');
//         json.forEach(user => {
//                 let option = document.createElement('option');
//                 option.setAttribute('key', user.id);
//                 option.setAttribute('value', user.id);
//                 divChecks.appendChild(option);
//                 option.innerText = `${user.name}`;
//         })
//     });
// }

// const recordPosts = (postList) => {
//     posts = postList;
//     console.log("posts", posts);
// }

// const getPosts =  () => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//     .then((response) => response.json())
//     .then((json) => {
//         recordPosts(json);
//     });    
// }

// const recordComments = (commentList) => {
//     comments = commentList;
//     console.log("comments", comments);
// }

// const getComments =  () => {
//     fetch('https://jsonplaceholder.typicode.com/comments')
//     .then((response) => response.json())
//     .then((json) => {
//         const comments = json.map(comment => {
//             comment['timestamp'] = new Date().getTime() + Math.random();
//             return comment;
//         });
//         recordComments(comments);
//     });
// }






let postPerUser = [];
const getPostPerUser = () => {
    for (let i = 0; i< users.length; i++) {
     postPerUser.push({user: users[i].name, amount: posts.find(post => users[i].id == post.userId).length});
    }
}


// Arrays for data values [q1, q2, q3, q4]
let r = [];
let b = [];
let g = [];
// array for colors for data arrays [r, b, g]
let color = ['firebrick', 'steelblue', 'seagreen'];


// radius, circumfernce, initial offset and stroke_width for pie chart
let radius = 100;
let circum = 2 * Math.PI * radius;
let initial_offest = 250;
let stroke_width = 190;


// viewport height
let v_height = 400;


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




function drawBar() {
    // getPostPerUser();
    console.log('drawbar selectedUsers', selectedUsers);
    document.getElementById('barTitle').innerHTML = `The number of posts per user`;
    let svgElement = document.getElementById('svgBar');
    // createLabelBar(svgElement);
    // const gx = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    // gx.classList.add('labels x-labels');
    // svgElement.appendChild(gx);
    // let pos2 = 180;
    // let y = 375;
    // for (let i=0; i<postPerUser.length; i++) {        
    //     let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    //     // assign attributes
    //     text.setAttribute('x', pos2);
    //     text.setAttribute('y', y);
    //     text.innerHTML = `${postPerUser[i].name}`;
    //     gx.appendChild(text);
    //     pos+=150;
    // }
    // create x-axis and y-axis
    createAxis(svgElement);
    // scale array numbers for window size
    // let pos = 130;
    // create bars dynamically and add them to the <svg> element
    // for (let i=0; i<postPerUser.length; i++) {
    //     // dynamically generate data
    //     let rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    //     // assign attributes
    //     rectangle.setAttribute('x', pos);
    //     // vertical height is in this document head - subtract 50 for bottom margin, v_height in document head
    //     rectangle.setAttribute('y', (v_height - postPerUser[i].amount - 50));
    //     rectangle.setAttribute('width', 40);
    //     // use transformed function array for bar height
    //     rectangle.setAttribute('height', postPerUser[i].amount);
    //     // color array in this document head - assumend to be red, blue, green
    //     rectangle.setAttribute('fill', color[0]);
    //     rectangle.setAttribute('class', 'bar');
    //     rectangle.setAttribute('id', 'red' + i.toString());
    //     svgElement.appendChild(rectangle);
    //     // set title for hover pop-up - use actual array values found in header or created from updateData()
    //     document.getElementById('red'+i.toString()).innerHTML = `<title class='tooltip'>Data Set 1 \nQuarterly Value: ${r[i]}</title>`
    //     pos += 150;
    // }
    let red = r.map(x => {return x*3});
    let blue = b.map(x => {return x*3});
    let green = g.map(x => {return x*3});
    // array counter i for data arrays red, blue, green
    let pos = 130;
    // create bars dynamically and add them to the <svg> element
    for (let i=0; i<postPerUser.length; i++) {
        // dynamically generate data
        let rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');


        // assign attributes
        rectangle.setAttribute('x', pos);
        // vertical height is in this document head - subtract 50 for bottom margin, v_height in document head
        rectangle.setAttribute('y', (v_height - red[i] - 50));
        rectangle.setAttribute('width', 40);
        // use transformed function array for bar height
        rectangle.setAttribute('height', red[i]);
        // color array in this document head - assumend to be red, blue, green
        rectangle.setAttribute('fill', color[0]);
        rectangle.setAttribute('class', 'bar');
        rectangle.setAttribute('id', 'red' + i.toString());
        svgElement.appendChild(rectangle);
        // set title for hover pop-up - use actual array values found in header or created from updateData()
        document.getElementById('red'+i.toString()).innerHTML = `<title class='tooltip'>Data Set 1 \nQuarterly Value: ${r[i]}</title>`


        let rectangle1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        // add 40 to x position to account for the width of the first bar
        rectangle1.setAttribute('x', pos+40);
        rectangle1.setAttribute('y', (v_height - blue[i] - 50));
        rectangle1.setAttribute('width', 40);
        rectangle1.setAttribute('height', blue[i]);
        rectangle1.setAttribute('fill', color[1]);
        rectangle1.setAttribute('class', 'bar')
        rectangle1.setAttribute('id', 'blue' + i.toString());
        svgElement.appendChild(rectangle1);
        document.getElementById('blue' + i.toString()).innerHTML = `<title class='tooltip'>Data Set 2 \nQuarterly Value: ${b[i]}</title>`


        let rectangle2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        // add 80 to account for the first 2 bars
        rectangle2.setAttribute('x', pos+80);
        rectangle2.setAttribute('y', (v_height - green[i] - 50));
        rectangle2.setAttribute('width', 40);
        rectangle2.setAttribute('height', green[i]);
        rectangle2.setAttribute('fill', color[2]);
        rectangle2.setAttribute('class', 'bar')
        rectangle2.setAttribute('id', 'green' + i.toString());
        svgElement.appendChild(rectangle2);
        document.getElementById('green' + i.toString()).innerHTML = `<title class='tooltip'>Data Set 3 \nQuarterly Value: ${g[i]}</title>`
        // increment color array counter
        pos += 150;
    }
}
function drawLine() {
    // document.getElementById('chartTitle').innerHTML = '';
    document.getElementById('lineTitle').innerHTML = `The monthly comment trend`;
    let svgElement = document.getElementById('svgLine');
    // reset the svg element by removing child nodes
    // resetNode(svgElement);
    // insert html to create the labels for the axis
    // createLabel(svgElement);
    // create x-axis and y-axis
    createAxis(svgElement);
    // scale array numbers for window size
    let red = r.map(x => { return x * 3 });
    let blue = b.map(x => { return x * 3 });
    let green = g.map(x => { return x * 3 });
    // x coordinates to align with axis labels
    let x_coor = [190, 340, 490, 640];


    let line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    // subtract 50 for bottom margin, v_height in document head
    line.setAttribute('points', [[x_coor[0], v_height - red[0] - 50],
                                 [x_coor[1], v_height - red[1] - 50],
                                 [x_coor[2], v_height - red[2] - 50],
                                 [x_coor[3], v_height - red[3] - 50]]);
    line.setAttribute('style', 'stroke-width: 5; fill: none');
    // add color from color array in document head
    line.setAttribute('stroke', color[0])
    line.setAttribute('id', 'data1');
    svgElement.appendChild(line);
    document.getElementById('data1').innerHTML = `<title>Data Set 1</title>`;


    line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('points', [[x_coor[0], v_height - blue[0] - 50],
                                [x_coor[1], v_height - blue[1] - 50],
                                [x_coor[2], v_height - blue[2] - 50],
                                [x_coor[3], v_height - blue[3] - 50]]);
    line.setAttribute('style', 'stroke-width: 5; fill: none');
    line.setAttribute('stroke', color[1])
    line.setAttribute('id', 'data2');
    svgElement.appendChild(line);
    document.getElementById('data2').innerHTML = `<title>Data Set 2</title>`;


    line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('points', [[x_coor[0], v_height - green[0] - 50],
                                [x_coor[1], v_height - green[1] - 50],
                                [x_coor[2], v_height - green[2] - 50],
                                [x_coor[3], v_height - green[3] - 50]]);
    line.setAttribute('style', 'stroke-width: 5; fill: none');
    line.setAttribute('stroke', color[2])
    line.setAttribute('id', 'data3');
    svgElement.appendChild(line);
    document.getElementById('data3').innerHTML = `<title>Data Set 3</title>`;
}




function drawPie(quarter) {
    // set the title of the chart and footer
    document.getElementById('pieTitle').innerHTML = `The percentage distribution of posts among users`;


    let svgElement = document.getElementById('svgPie');
    // reset the svg element by removing child nodes
    // resetNode(svgElement);


    // radius, circumfernce, initial offset and stroke_width for pie chart found at top of file
    // calculate red percentage of pie graph based on r, g, b arrays
    let red_per = r[quarter] / (r[quarter] + g[quarter] + b[quarter]);
    // length of red slice in relation to circle circumference
    let red_slice = red_per * circum;
    // compliment to the red_slice with relation to circumference
    let red_comp = circum - red_slice;
    // array of slice and compliment for stroke-dasharray
    let red_array = [red_slice, red_comp];
    // offset amount for stroke-dashoffset
    let red_offset = initial_offest;


    // see red entries for comments
    let blue_per = b[quarter] / (r[quarter] + g[quarter] + b[quarter]);
    let blue_slice = blue_per * circum;
    let blue_comp = circum - blue_slice;
    let blue_array = [blue_slice, blue_comp];
    let blue_offset = red_offset - red_slice;


    // caluclation tooltip values
    let green_per = (1 - red_per - blue_per);
    let green_tt = (green_per*100).toFixed(0);
    let red_tt = (red_per*100).toFixed(0);
    let blue_tt = (blue_per*100).toFixed(0);


    // create a circle with color[2] and g array (green in the default)
    // this is the compliment to the other slices so no dasharray or dashoffset are needed
    let circ_gr = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circ_gr.setAttribute('cx', 400);
    circ_gr.setAttribute('cy', 200);
    circ_gr.setAttribute('r', radius);
    circ_gr.setAttribute('class', 'pie');
    circ_gr.setAttribute('id', 'green')
    circ_gr.setAttribute('fill', color[2])
    circ_gr.setAttribute('stroke', color[2])
    circ_gr.setAttribute('stroke-width', stroke_width);
    svgElement.appendChild(circ_gr);
    // create title for hover over tool tip
    document.getElementById('green').innerHTML = `<title>Data Set 2 \nQuarterly Value: ${g[quarter]} \nQuarterly Percentage: ${green_tt}%</title>`;


    // create a circle based on color[0] (red in the default) and r array
    let circ_red = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circ_red.setAttribute('cx', 400);
    circ_red.setAttribute('cy', 200);
    circ_red.setAttribute('r', radius);
    circ_red.setAttribute('class', 'pie');
    circ_red.setAttribute('id', 'red')
    circ_red.setAttribute('fill', 'transparent')
    circ_red.setAttribute('stroke', color[0])
    circ_red.setAttribute('stroke-width', stroke_width);;
    circ_red.setAttribute('stroke-dasharray', red_array);
    circ_red.setAttribute('stroke-dashoffset', red_offset);
    svgElement.appendChild(circ_red);
    document.getElementById('red').innerHTML = `<title>Data Set 1 \nQuarterly Value: ${r[quarter]} \nQuarterly Percentage: ${red_tt}%</title>`;


    // create a circle based on color[1] (blue in the default) and b array
    let circ_blue = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circ_blue.setAttribute('cx', 400);
    circ_blue.setAttribute('cy', 200);
    circ_blue.setAttribute('r', radius);
    circ_blue.setAttribute('class', 'pie');
    circ_blue.setAttribute('id', 'blue')
    circ_blue.setAttribute('fill', 'transparent')
    circ_blue.setAttribute('stroke', color[1])
    circ_blue.setAttribute('stroke-width', stroke_width);
    circ_blue.setAttribute('stroke-dasharray', blue_array);
    circ_blue.setAttribute('stroke-dashoffset', blue_offset);
    svgElement.appendChild(circ_blue);
    document.getElementById('blue').innerHTML = `<title>Data Set 2 \nQuarterly Value: ${b[quarter]} \nQuarterly Percentage: ${blue_tt}%</title>`;
}


function updateData(chart='bar') {
    let data;
    for (let i=0; i<4; i++){
        data = document.getElementById('data1_q'+(i+1).toString()).value;
        r[i] = parseInt(data);
    }
    for (let i = 0; i < 4; i++) {
        data = document.getElementById('data2_q'+(i+1).toString()).value;
        b[i] = parseInt(data);
    }
    for (let i = 0; i < 4; i++) {
        data = document.getElementById('data3_q'+(i+1).toString()).value;
        g[i] = parseInt(data);
    }


    // update user selected colors
    let color1 = document.getElementById('color1').value;
    let color2 = document.getElementById('color2').value;
    let color3 = document.getElementById('color3').value;
    color = [color1, color2, color3];


    switch (chart){
        case 'bar':
            drawBar();
            break;
        case 'line':
            drawLine();
            break;
        case 'pie0':
            drawPie(0);
            break;
        case 'pie1':
            drawPie(1);
            break;
        case 'pie2':
            drawPie(2);
            break;
        case 'pie3':
            drawPie(3);
            break;
    }
}




const updateAll = async () => {
    // await getusers();
    // await getPosts();
    // await getComments();
    updateData('bar');
    updateData('line');
    updateData('pie0');

}

updateAll();



// function createAxis(node) {
//     // draw y axis
//     let polyline_y = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
//     polyline_y.setAttribute('points', '100,50 100,350');
//     polyline_y.setAttribute('style', 'stroke: black; stroke-width: 2');
//     node.appendChild(polyline_y);
//     // draw x axis
//     let polyline_x = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
//     polyline_x.setAttribute('points', '100,350 700,350');
//     polyline_x.setAttribute('style', 'stroke: black; stroke_width: 2');
//     node.appendChild(polyline_x);
// }

// function createLabel(node, data) {
//     const label = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "text"
//     );

//     label.setAttribute("x", data.x);
//     label.setAttribute("y", data.y);

//     label.classList.add("label");

//     label.innerHTML = data.text;

//     node.appendChild(label);    
// }

// function generateRandomColor() {
//     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

// const drawBarChart = () => {
//     console.log('drawbar selectedUsers', selectedUsers);
//     console.log('drawbar postPerUser', postPerUser);

//     document.getElementById('barTitle').innerHTML = `The number of posts per user`;
//     let svgElement = document.getElementById('svgBar');
//     createAxis(svgElement);
//     const { width, height } = svgElement.getBoundingClientRect();
//     const padding = {
//         y: 30,
//         x: 30,
//     };
//     const max = Math.max(postPerUser.map(user => user.amount));
// 	const step = height / max;
//     postPerUser.forEach((elemBar, index) => {

//         const color = generateRandomColor();    
//         const gutter = 10;
//         const baseWidth = (width - padding.x * 2) / postPerUser.length;
    
//         const size = {
//             height: (height / 100) * elemBar.amount,
//             width: baseWidth - gutter * 5,
//         };

//         const x = padding.x + index * baseWidth + (baseWidth - size.width) / 2;
// 		const y = height - size.height - padding.y + 1;
// 		const elemWidth = size.width;
// 		const elemHeight = size.height;
// 		const text = elemBar.user;

//         createLabel(svgElement, { x: padding.x + index * baseWidth + baseWidth / 2, y: height - padding.y / 2, text });
//         createLabel(svgElement, { x: 0, y: height - max / step, text: index * step });

// 		const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

// 		rect.setAttribute("x", x);
// 		rect.setAttribute("y", y);
// 		rect.setAttribute("width", elemWidth);
// 		rect.setAttribute("height", elemHeight);

// 		rect.classList.add("bar");

// 		rect.style.fill = color;
// 		rect.style.stroke = color;
//         svgElement.appendChild(rect);
//     });

// }

// function drawBar() {
//     console.log('drawbar selectedUsers', selectedUsers);
//     console.log('drawbar postPerUser', postPerUser);

//     document.getElementById('barTitle').innerHTML = `The number of posts per user`;
//     let svgElement = document.getElementById('svgBar');
//     // const gx = document.createElementNS('http://www.w3.org/2000/svg', 'g');
//     // gx.classList.add('labels x-labels');
//     // svgElement.appendChild(gx);
//     // let pos2 = 180;
//     // let y = 375;
//     // for (let i=0; i<postPerUser.length; i++) {        
//     //     let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
//     //     // assign attributes
//     //     text.setAttribute('x', pos2);
//     //     text.setAttribute('y', y);
//     //     text.innerHTML = `${postPerUser[i].name}`;
//     //     gx.appendChild(text);
//     //     pos+=150;
//     // }
//     // create x-axis and y-axis
//     createAxis(svgElement);
//     // scale array numbers for window size
//     // let pos = 130;
//     // create bars dynamically and add them to the <svg> element
//     // for (let i=0; i<postPerUser.length; i++) {
//     //     // dynamically generate data
//     //     let rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//     //     // assign attributes
//     //     rectangle.setAttribute('x', pos);
//     //     // vertical height is in this document head - subtract 50 for bottom margin, v_height in document head
//     //     rectangle.setAttribute('y', (v_height - postPerUser[i].amount - 50));
//     //     rectangle.setAttribute('width', 40);
//     //     // use transformed function array for bar height
//     //     rectangle.setAttribute('height', postPerUser[i].amount);
//     //     // color array in this document head - assumend to be red, blue, green
//     //     rectangle.setAttribute('fill', color[0]);
//     //     rectangle.setAttribute('class', 'bar');
//     //     rectangle.setAttribute('id', 'red' + i.toString());
//     //     svgElement.appendChild(rectangle);
//     //     // set title for hover pop-up - use actual array values found in header or created from updateData()
//     //     document.getElementById('red'+i.toString()).innerHTML = `<title class='tooltip'>Data Set 1 \nQuarterly Value: ${r[i]}</title>`
//     //     pos += 150;
//     // }
//     let red = r.map(x => {return x*3});
//     let blue = b.map(x => {return x*3});
//     let green = g.map(x => {return x*3});
//     // array counter i for data arrays red, blue, green
//     let pos = 130;
//     // create bars dynamically and add them to the <svg> element
//     for (let i=0; i< 4; i++) {
//         // dynamically generate data
//         let rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');


//         // assign attributes
//         rectangle.setAttribute('x', pos);
//         // vertical height is in this document head - subtract 50 for bottom margin, v_height in document head
//         rectangle.setAttribute('y', (v_height - red[i] - 50));
//         rectangle.setAttribute('width', 40);
//         // use transformed function array for bar height
//         rectangle.setAttribute('height', red[i]);
//         // color array in this document head - assumend to be red, blue, green
//         rectangle.setAttribute('fill', color[0]);
//         rectangle.setAttribute('class', 'bar');
//         rectangle.setAttribute('id', 'red' + i.toString());
//         svgElement.appendChild(rectangle);
//         // set title for hover pop-up - use actual array values found in header or created from updateData()
//         document.getElementById('red'+i.toString()).innerHTML = `<title class='tooltip'>Data Set 1 \nQuarterly Value: ${r[i]}</title>`


//         let rectangle1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//         // add 40 to x position to account for the width of the first bar
//         rectangle1.setAttribute('x', pos+40);
//         rectangle1.setAttribute('y', (v_height - blue[i] - 50));
//         rectangle1.setAttribute('width', 40);
//         rectangle1.setAttribute('height', blue[i]);
//         rectangle1.setAttribute('fill', color[1]);
//         rectangle1.setAttribute('class', 'bar')
//         rectangle1.setAttribute('id', 'blue' + i.toString());
//         svgElement.appendChild(rectangle1);
//         document.getElementById('blue' + i.toString()).innerHTML = `<title class='tooltip'>Data Set 2 \nQuarterly Value: ${b[i]}</title>`


//         let rectangle2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//         // add 80 to account for the first 2 bars
//         rectangle2.setAttribute('x', pos+80);
//         rectangle2.setAttribute('y', (v_height - green[i] - 50));
//         rectangle2.setAttribute('width', 40);
//         rectangle2.setAttribute('height', green[i]);
//         rectangle2.setAttribute('fill', color[2]);
//         rectangle2.setAttribute('class', 'bar')
//         rectangle2.setAttribute('id', 'green' + i.toString());
//         svgElement.appendChild(rectangle2);
//         document.getElementById('green' + i.toString()).innerHTML = `<title class='tooltip'>Data Set 3 \nQuarterly Value: ${g[i]}</title>`
//         // increment color array counter
//         pos += 150;
//     }
// }
