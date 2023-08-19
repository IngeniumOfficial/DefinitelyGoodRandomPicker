import ApexCharts from "apexcharts";
import { targetValue } from "./targetValue.js";

// change fontsize of labels depending on the window width
let labelFontSize = '20px';
if(window.innerWidth >= 1600) labelFontSize = '23px';
if(window.innerWidth <= 700) labelFontSize = '18px';
if(window.innerWidth <= 500) labelFontSize = '15px';
if(window.innerWidth <= 450) labelFontSize = '13px';
if(window.innerWidth <= 370) labelFontSize = '10px';


var body = document.querySelector("body"); // body
var chartElement = document.querySelector("#chart"); // The wheel itself
var inputSection = document.querySelector("#inputSection") // The inputSection is the div where the inputs are located
var spinButton = document.querySelector("#spinButton"); // spin button
var ticker = document.querySelector("#ticker"); // ticker svg for the wheel
var clearData = document.querySelector("#clearAllInputs");

// this function clears all data
const clearDataFunction = () => {
    localStorage.clear();
    location.reload();
}
clearData.addEventListener("click", () => clearDataFunction());

// this button initiates additive dom manipulation and adds data to inputData
var addInputButton = document.querySelector("#addInputButton")

// chart Size data is stored on localStorage for future adjustments
let firstLabels;
let firstSeries = [];
let firstGen;
if(!localStorage.getItem("chartObj")) {
    // set stuff onto localStorage
    localStorage.setItem("chartSize", "2");
    localStorage.setItem("chartObj", JSON.stringify({ 1: "random1", 2: "random2"}))

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


    // inputOne and inputTwo are added with Javascript
    inputSection.appendChild(inputOne)
    inputSection.appendChild(inputTwo)
} else {
    firstGen = JSON.parse(localStorage.getItem("chartObj"));
    firstLabels = [...Object.values(firstGen)]; // here we just take the stored data to assign to options on render
    for(let i = 0; i < firstLabels.length; i++) {
        firstSeries.push(1);
    }
}

// function to add inputs depending on saved localstorage data
const addSavedInput = (primaryRenderId, primaryRenderValue) => {
    // this is for primaryRendering
    // Create the input and its sub-elements
    let newInput2 = document.createElement('div');
    let newInnerInput2 = document.createElement('input');
    let newLabelInput2 = document.createElement('label');
    let newInnerRemove2 = document.createElement('button');

    // Set the data for the input element and its children elements
    newLabelInput2.innerText = 'Input '+primaryRenderId+': ';
    newInnerRemove2.innerText = "X";
    newInnerRemove2.setAttribute("class", "removeButton")
    newInnerRemove2.style.fontWeight = "bold";
    newInput2.setAttribute("id", "input"+primaryRenderId);
    newInput2.setAttribute("class", "inputGroup")
    newInnerInput2.setAttribute('id', 'innerinput'+primaryRenderId);
    newInnerInput2.placeholder = primaryRenderValue;
    newInnerRemove2.setAttribute("id", primaryRenderId);
    newInnerRemove2.addEventListener("click", () => removeInput(newInnerRemove2.id)) // This assigns delete functionality to delete button

    // Finally, append the children to the parent input element
    newInput2.appendChild(newLabelInput2);
    newInput2.appendChild(newInnerInput2);
    newInput2.appendChild(newInnerRemove2);
    inputSection.appendChild(newInput2)
}

// Options for the chart
var options = {
    chart: {
        type: 'pie'
    },
    colors: ["#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C"],
    series: [1, 1],
    labels: ['random1', 'random2'],
    dataLabels: {
        formatter: (val, { seriesIndex, dataPointIndex, w}) => {
            return w.config.labels[seriesIndex] // this will display the values of the inputs and not their share in the pie chart
        },
        style: {
            fontSize: labelFontSize
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                offset: 0,
                minAngleToShowLabel: 10
            },
            customScale: 1
        }
    },
    legend: { show: false }
}

// change size of pie chart depending on window width
// if(window.innerWidth <= 1420 && window.innerWidth > 1200) options.plotOptions.pie.customScale = 0.7;
if(window.innerWidth <= 370) options.dataLabels.style.colors = ["black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black"];


// before we render the chart, check if we can add the values we snatched from localstorage
if(firstLabels) {
    options.series = firstSeries;
    options.labels = firstLabels;

    //also, adjust inputs by sending in all the proper data
    for(let key in firstGen) {
        addSavedInput(key, firstGen[key]);
    }
}

// Chart is created with specified options and rendered to page
var chart = new ApexCharts(chartElement, options);
chart.render();

const inputInterpreter = (e) => {
    // let's deal with double digits
    let num = "";
    for(let i = 0; i < e.target.id.length; i++) {
        if(parseInt(e.target.id[i], 10) || e.target.id[i]==="0") { // check with parseInt or if it's zero because parseInt doesn't work on zero
            num+=e.target.id[i];
        }
    }
    return parseInt(num, 10);
}

// On change in input, depending on the input that is changed, the chart is updated
inputSection.addEventListener("input", (e) => {
    // this is a pretty slow approach, but unfortunately, Apex charts only works with arrays
    const indextoTarget = inputInterpreter(e); // this just returns the number at the end of the id

    // get the chartObj value on sessionStorage
    const chartObj = JSON.parse(localStorage.getItem("chartObj"));
    chartObj[indextoTarget] = e.target.value; // update the value in the object
    options.labels = [...Object.values(chartObj)]; // update the chart labels from the chartObj
    localStorage.setItem("chartObj", JSON.stringify(chartObj)); // update the session Storage's chartObj

    // force the chart to update visually
    chart.updateOptions(options);
})


//TODO: create an additional input creation that allows pre-rendered data to be added when checked with localhost
// Input addition
const addInput = () => {
    // check with session storage
    let inputSizeCache = parseInt(localStorage.getItem("chartSize"), 10) + 1; // immediately update the size since this will be bigger
    let chartObj = JSON.parse(localStorage.getItem("chartObj"));
    localStorage.setItem("chartSize", inputSizeCache.toString()); // update the session storage with new value as well
    
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
    
    // Update the options and chartObj
    const newValue = 'random'+inputSizeCache;
    options.series.push(1);
    options.labels.push(newValue)
    chartObj[inputSizeCache] = newValue;
    localStorage.setItem("chartObj", JSON.stringify(chartObj));
    
    chart.updateOptions(options);
}

// Input removal
const removeInput = (id) => {
    const chartObj = JSON.parse(localStorage.getItem("chartObj"));

    // remove element off the dom
    const inputSelect = "#input"+id
    document.querySelector(inputSelect).remove();

    const seriesPop = options.series.pop(); // remove series by just popping one out

    delete chartObj[id]; // use the id to locate the key-value pair in chartObj and delete it

    // now update the options and localStorage
    options.labels = [...Object.values(chartObj)];
    localStorage.setItem("chartObj", JSON.stringify(chartObj));

    chart.updateOptions(options);// update the chart visually
}

// on click of add input button, add input
addInputButton.addEventListener("click", addInput)





// this makes the wheel spin
// TODO: optimize wheel spin for more than two input data
const spinWheel = () => {
    // shift labels
    const shiftLabels = (target) => { // the second is the rigged value, the target is what unrigged will point to 
        const t = target-1; // find the index of the target
        const s = 1; // s for second value which will always be at index 1

        const tempLabel = options.labels[s];
        options.labels[s] = options.labels[t];
        options.labels[t] = tempLabel;
    }
    
    const windBack = [
        { transform: "rotate(-180deg)" }
    ]
    // TODO: make the spin look a bit more realistic by giving it leeway and stopping it at a random point within boundaries
    const spinForward = [
        { transform: "rotate(3605deg)" }
    ]

    chartElement.animate(windBack, { duration: 1500, iterations: 1, easing: "ease-in-out" })
    setTimeout(() => {
        shiftLabels(targetValue(options.labels));
        chart.updateOptions(options);
        chartElement.animate(spinForward, { duration: 4000, iterations: 1, easing: "ease-out", fill: "forwards" })
    }, 1600)

    // this function sets the overlay that allows a reload with same data or new data
    const handleReload = () => {
        const overlay = document.querySelector("#overlay");
        const modal = document.querySelector("#modal");
        const spinSame = document.querySelector("#spinSame");
        const spinDiscard = document.querySelector("#spinDiscard");
        const clearInputs = document.querySelector("#clearAllData");
        var winnerAnnouncement = document.querySelector("#winnerAnnouncement");

        const discardSecond = () => {
            // if the chartObj has 2 entries, create and render a string with an error message below this buttons explaining why it cannot be discarded
            if(Object.entries(JSON.parse(localStorage.getItem("chartObj"))).length === 2) {
                const error = document.createElement("p");
                error.innerText = "You must have at least three inputs to discard";
                error.style.color = "red";
                modal.appendChild(error);
                // for a few seconds, make the error visible
                error.style.visibility = "visible";
                setTimeout(() => {
                    error.style.visibility = "hidden";
                }, 5000)
            } else {
                const chartObj = JSON.parse(localStorage.getItem("chartObj"))
                let chartSize = parseInt(localStorage.getItem("chartSize"), 10);
                chartSize-=1;
                chartSize.toString(10);
                let count = 1;
                for(let key in chartObj){
                    if(count === 2) {
                        delete chartObj[key];
                        break;
                    }
                    count += 1;
                }
                localStorage.setItem("chartObj", JSON.stringify(chartObj));
                localStorage.setItem("chartSize", chartSize);
                location.reload();
            }
        }
        const clearData = () => {
            localStorage.clear();
            location.reload();
        }

        // corrects the text to indicate which input won
        const localChartObj = JSON.parse(localStorage.getItem("chartObj"));
        let count = 1;
        let winner = '';
        for(let key in localChartObj){
            if(count === 2) {
                winner = localChartObj[key];
                break;
            } else {
                count+=1;
            }
        }
        winnerAnnouncement.innerText = "The Winner Is..... "+winner+" !"

        // this makes the overlay and modal visible and adds options for what to do next
        overlay.setAttribute("style", "visibility: visible")
        spinSame.addEventListener("click", () => location.reload());
        spinDiscard.addEventListener("click", () => discardSecond());
        clearInputs.addEventListener("click", () => clearData());
    }
    
    // this setTimeout creates the overlay to allow to reload the page
    setTimeout(() => {
        handleReload();
    }, 6000)
}

spinButton.addEventListener("click", spinWheel)







// TODO: allow user to select between light-theme and dark-theme
// TODO: store theme preference in local data
