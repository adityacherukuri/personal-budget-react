import React, { createRef, Component } from "react";
import axios from "axios";
import * as d3 from "d3";
import "../index.scss";

export default class PieClass extends React.Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.createPie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);
    this.createArc = d3
      .arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius);
    this.colors = d3.scaleOrdinal(d3.schemeCategory10);
    this.format = d3.format(".2f");
  }

  myBudget = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF7F50",
          "#FFB6C1",
          "#87CEFA",
          "#008080",
          "#808080",
          "#8FBC8F",
          "#D3D3D3",
        ],
      },
    ],
  };

  componentDidMount() {
    axios.get(`http://localhost:3001/budget`).then((res) => {
      console.log(res);
      for (var i = 0; i < res.data.myBudget.length; i++) {
        this.myBudget.datasets[0].data[i] = res.data.myBudget[i].budget;
        this.myBudget.labels[i] = res.data.myBudget[i].title;
      }
      console.log(this.myBudget);
      const pb = res.data.myBudget;
      this.setState({ pb });
      this.createColorsForD3JS();
    });
  }
  createColorsForD3JS() {
    console.log(this.dataSource);
    let k = -1;
    this.my_data = this.myBudget.labels.map((label) => {
      k++;
      return { label: label, value: this.myBudget.datasets[0].data[k] };
    });

    console.log(this.my_data);
    this.colors = d3
      .scaleOrdinal()
      .domain(this.my_data)
      .range([
        "#FF7F50",
        "#FFB6C1",
        "#87CEFA",
        "#008080",
        "#808080",
        "#8FBC8F",
        "#D3D3D3",
      ]);
    this.drawChart(this.my_data);
  }

  drawChart(jdata) {
    const svg = d3.select(this.ref.current);
    const data = this.createPie(jdata);
    const { width, height } = this.props;
    const outer = 300;
    const inner = 300;

    svg.attr("class", "chart").attr("width", width).attr("height", height);

    const group = svg
      .append("g")
      .attr("transform", `translate(${outer} ${inner})`);

    const groupWithEnter = group.selectAll("g.arc").data(data).enter();

    const path = groupWithEnter.append("g").attr("class", "arc");

    path
      .append("path")
      .attr("class", "arc")
      .attr("d", this.createArc)
      .attr("fill", (d, i) => this.colors(d.index));

    path
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", (d) => `translate(${this.createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text((d) => d.data.label);
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", paddingTop: "150px" }}>
          Chart using D3 JS
        </h1>
        <svg
          style={{
            textAlign: "center",
            paddingLeft: "450px",
            paddingTop: "150px",
          }}
          ref={this.ref}
        />
        ;
      </div>
    );
  }
}
