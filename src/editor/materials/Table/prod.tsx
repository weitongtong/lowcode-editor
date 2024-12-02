import { Table as AntdTable } from "antd";
import { useEffect, useMemo, useState, Children } from "react";
import { CommonComponentProps } from "../../interface";
import axios from "axios";
import dayjs from "dayjs";

const Table = (props: CommonComponentProps) => {
  const { url, children } = props;

  const [data, setData] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (url) {
      setLoading(true);
      const { data } = await axios.get(url);
      setData(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = useMemo(() => {
    return Children.map(children, (item: any) => {
      if (item.props.type === 'date') {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
          render: (value: any) => value ? dayjs(value).format('YYYY-MM-DD') : null
        }
      }
      return {
        title: item.props?.title,
        dataIndex: item.props?.dataIndex
      }
    })
  }, [children])

  return (
    <AntdTable
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey="id"
      loading={loading}
     />
  )
}
export default Table;
