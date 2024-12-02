import { Input, Select, DatePicker } from "antd";

export function getItem(componentType: string, mode: 'dev'|'prod') {
  if (componentType === 'input') {
    return <Input style={mode === 'dev' ? { pointerEvents: "none" } : {}}/>
  }
  if (componentType === 'select') {
    return <Select style={mode === 'dev' ? { pointerEvents: "none" } : {}} />
  }
  if (componentType === 'date') {
    return <DatePicker style={mode === 'dev' ? { pointerEvents: "none" } : {}} />
  }

}