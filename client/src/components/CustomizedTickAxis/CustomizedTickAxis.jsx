import React, { Component } from "react";
import { Text } from "recharts";
import * as d3 from "d3";
export default class CustomizedTickAxis extends Component {
  render() {
    const { x, y, payload } = this.props;

    return <Text x={x} y={y} width={75} textAnchor="middle" verticalAnchor="start">{payload.value}</Text>
  }
}