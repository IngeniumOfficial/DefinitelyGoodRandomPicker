import { pie } from 'd3-shape';
import { arc } from 'd3-shape';
import { select } from 'd3-selection';
import { schemeSet3 } from 'd3-scale-chromatic';

import { createRef } from 'react';

const Wheel = () => {

    const circleRef: any = createRef();
    // chart = PieChart(population, {
    //     name: (d: any) => d.name,
    //     value: (d: any) => d.value,
    //     height: 500
    // });

    // let population:Array<any> = [
    //     {name: "<5", value: 19912018},
    //     {name: "5-9", value: 20501982},
    //     {name: "10-14", value: 20679786}
    // ];

    var data = [1.1,2.2,4.46,2.12,1.36,5.002445,4.1242];

    let svgDiv = select("#svgDiv");

    let g = svgDiv.append("g")
            .attr("transform", "translate(150,120)");

    var pie2: any = pie();
    var arc2: any = arc()
                    .innerRadius(0)
                    .outerRadius(100);

    var arcs = g.selectAll("arc")
                .data(pie(data))
                .enter()
                .append("g");


    arcs.append("path")
        .attr("fill", (data:any, i:any) => {
            let value = data.data;
            return schemeSet3[i];
        })
        .attr("d", arc);

    


    return(
        <div id='svgDiv'>
            <svg>
                {/* <circle /> */}
                <polygon points="500,275 500,225 415,250"/>
            </svg>
            <br></br>
            <button>Go</button>
        </div>
    )
}

export default Wheel;