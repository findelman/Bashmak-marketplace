import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Area,
  ComposedChart,
  Line,
  YAxis,
  Cell,
} from "recharts"
import { useDevice } from "../../../store/hooks/useDevice"
import { CustomTooltip } from "./CustomTooltip"

export const BandChart = ({ data }) => {
  const checkFill = (index) => {
    switch (index) {
      case 0:
        return "#B9382F"
      case 1:
        return "#D74C42"
      case 2:
        return "#FF7A00"
      case 3:
        return "#FFB800"
      case 4:
        return "#29BC26"
    }
  }

  const { isMobile } = useDevice()

  return (
    <>
      <ResponsiveContainer height="60%" width="100%">
        <BarChart margin={{ top: isMobile && 24 }} data={data.slice(0, 5)}>
          <XAxis
            padding={{ right: isMobile ? 10 : 35 }}
            dataKey="name"
            tickLine={false}
            tickSize={isMobile ? 12 : 15}
            tick={{
              fill: "#A0AAA8",
              fontSize: isMobile ? 12 : 16,
              fontWeight: isMobile ? "400" : "500",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar maxBarSize={isMobile ? 13 : 34} radius={[10, 10, 0, 0]} dataKey="uv">
            {data.map((entry, index) => (
              <Cell key={index} fill={checkFill(index)} />
            ))}
          </Bar>
          <YAxis
            tickLine={false}
            tickSize={isMobile ? 12 : 15}
            tick={{
              fill: "#A0AAA8",
              fontSize: isMobile ? 12 : 16,
              fontWeight: isMobile ? "400" : "500",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export const LineChart = ({
  dotR = 0,
  dataKey = "revenue",
  data,
}: {
  dotR?: number
  dataKey?: string
  data?: any
}) => {
  const { isMobile } = useDevice()

  return (
    <>
      <ResponsiveContainer height="60%" width="100%">
        <ComposedChart margin={{ top: isMobile ? 24 : 10 }} data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#cf7f79" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#cd706c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            padding={{ right: isMobile ? 20 : 35, left: isMobile ? 0 : 32 }}
            dataKey="date"
            tickSize={isMobile ? 12 : 15}
            tickLine={{
              color: "green",
            }}
            tick={{
              fill: "#A0AAA8",
              fontSize: isMobile ? 12 : 16,
              fontWeight: isMobile ? "400" : "500",
            }}
          />
          <YAxis
            tickLine={false}
            tickSize={isMobile ? 12 : 15}
            tick={{
              fill: "#A0AAA8",
              fontSize: isMobile ? 12 : 16,
              fontWeight: isMobile ? "400" : "500",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area type="linear" dataKey={dataKey} fill="url(#colorUv)" stroke="#D74C42" />
          <Line
            type="linear"
            dataKey={dataKey}
            stroke="#D74C42"
            fill={"#D74C42"}
            strokeWidth={isMobile ? 1.5 : 3}
            dot={{ stroke: "white", strokeWidth: 1.5, r: dotR }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  )
}
