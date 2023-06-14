import ApexCharts from "apexcharts";

// chart Size data is stored on sessionStorage because why not
sessionStorage.setItem("chartSize", "2");
sessionStorage.setItem("adjustor", "0"); // session storage is to keep track of which index to update on input change

var chartElement = document.querySelector("#chart"); // The wheel itself
var inputSection = document.querySelector("#inputSection") // The inputSection is the div where the inputs are located

// existing elements for styling
var body = document.querySelector("body");

// inputOne and inputTwo are created to then be added with Javascript
var inputOne = document.createElement('div');
var innerInputOne = document.createElement("input");
var labelInputOne = document.createElement('label');
labelInputOne.innerText = 'Input 1: '
inputOne.setAttribute("id", "input1");
innerInputOne.setAttribute("id", 'innerinput1');
inputOne.appendChild(labelInputOne);
inputOne.appendChild(innerInputOne);

var inputTwo = document.createElement('div');
var innerInputTwo = document.createElement("input");
var labelInputTwo = document.createElement('label');
labelInputTwo.innerText = 'Input 2: '
inputTwo.setAttribute("id", "input2");
innerInputTwo.setAttribute("id", 'innerinput2');
inputTwo.appendChild(labelInputTwo);
inputTwo.appendChild(innerInputTwo);

// this button initiates additive dom manipulation and adds data to inputData
var addInputButton = document.querySelector("#addInputButton")

// inputOne and inputTwo are added with Javascript
inputSection.appendChild(inputOne)
inputSection.appendChild(inputTwo)

// Options for the chart
var options = {
    chart: {
        type: 'pie'
    },
    series: [1, 1],
    labels: ['random1', 'random2'],
    dataLabels: {
        formatter: (val, { seriesIndex, dataPointIndex, w}) => {
            return w.config.labels[seriesIndex] // this will display the values of the inputs and not their share in the pie chart
        }
    },
    legend: { show: false }
}

// Chart is created with specified options and rendered to page
var chart = new ApexCharts(chartElement, options);
chart.render();

const inputInterpreter = (e) => {
    const currentAdjustor = sessionStorage.getItem("adjustor")
    // let's deal with double digits
    let num = "";
    for(let i = 0; i < e.target.id.length; i++) {
        if(parseInt(e.target.id[i], 10) || e.target.id[i]==="0") { // check with parseInt or if it's zero because parseInt doesn't work on zero
            num+=e.target.id[i];
        }
    }
    const fullNumber = parseInt(num, 10);
    console.log(fullNumber);
    return fullNumber-currentAdjustor-1;
}

// On change in input, depending on the input that is changed, the chart is updated
inputSection.addEventListener("input", (e) => {
    const indextoTarget = inputInterpreter(e);

    options.labels[indextoTarget] = e.target.value;
    chart.updateOptions(options);
})

        
// Input addition
const addInput = () => {
    // check with session storage
    let toParse = sessionStorage.getItem("chartSize");
    let inputSizeCache = parseInt(toParse, 10) + 1;
    console.log("session storage plus one:  ", inputSizeCache);
    // reset the session storage as well
    sessionStorage.setItem("chartSize", inputSizeCache.toString());

    // Create the input and its sub-elements
    let newInput = document.createElement('div');
    let newInnerInput = document.createElement('input');
    let newLabelInput = document.createElement('label');
    let newInnerRemove = document.createElement('button');

    // Set the data for the input element and its children elements
    newLabelInput.innerText = 'Input '+inputSizeCache+': ';
    newInnerRemove.innerText = "X";
    newInnerRemove.setAttribute("class", "removeButton")
    newInnerRemove.style.fontWeight = "bold";
    newInput.setAttribute("id", "input"+inputSizeCache);
    newInput.setAttribute("class", "inputGroup")
    newInnerInput.setAttribute('id', 'innerinput'+inputSizeCache);
    newInnerRemove.setAttribute("id", inputSizeCache);
    newInnerRemove.addEventListener("click", () => removeInput(newInnerRemove.id)) // This assigns delete functionality to delete button

    // Finally, append the children to the parent input element
    newInput.appendChild(newLabelInput);
    newInput.appendChild(newInnerInput);
    newInput.appendChild(newInnerRemove);
    inputSection.appendChild(newInput)

    // Update the options manually and force chart to update the options
    options.series.push(1);
    options.labels.push('random'+inputSizeCache)
    chart.updateOptions(options);
}

// Input removal
const removeInput = (id) => {
    // increase the adjustor to successfully track changes in input
    let currAdj = parseInt(sessionStorage.getItem("adjustor"), 10);
    currAdj+=1;
    sessionStorage.setItem("adjustor", currAdj.toString());

    // remove element off the dom
    const inputSelect = "#input"+id
    document.querySelector(inputSelect).remove();

    // remove series by just popping one out
    const seriesPop = options.series.pop();
    

    //TODO: this approach only deletes the data if it has been unmodified, instead base it off of adjustor
    // filter the label to be deleted
    const tempLabelsArr = options.labels.filter((el, index) => {
        if(el !== ("random"+id)) return el;
    })

    // set the labels and update the chart through options
    options.labels = tempLabelsArr;
    chart.updateOptions(options);
}




addInputButton.addEventListener("click", addInput)










// conditional styling
// TODO: allow user to select between light-theme and dark-theme
// TODO: store theme preference in local data
// const setDarkTheme = () => {
//     body.style.backgroundColor = "#383838";
// }