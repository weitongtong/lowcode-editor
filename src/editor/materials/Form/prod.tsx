import { Form as AntdForm, DatePicker, Input, Select } from "antd";
import { getItem } from "./utils";
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { CommonComponentProps } from "../../interface";
import dayjs from "dayjs";

export interface FormRef {
  submit: () => void;
}

export default forwardRef<FormRef, CommonComponentProps>((
  { children, onFinish },
  ref
) => {
  const [form] = AntdForm.useForm();

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: () => {
          form.submit();
        },
      };
    },
    [form]
  );

  const formItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?.id,
        rules: item.props?.rules,
      };
    });
  }, [children]);

  async function save(values: any) {
    Object.keys(values).forEach((key) => {
      if (dayjs.isDayjs(values[key])) {
        values[key] = values[key].format("YYYY-MM-DD");
      }
    });
    console.log(values);
    onFinish && onFinish(values);
  }

  return (
    <AntdForm
      name="form"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 18 }}
      form={form}
      onFinish={save}
    >
      {formItems.map((item: any) => {
        return (
          <AntdForm.Item
            key={item.id}
            name={item.name || Math.random().toString().slice(2)}
            label={item.label}
            rules={
              item.rules === "required"
                ? [
                    {
                      required: true,
                      message: item.id,
                    },
                  ]
                : []
            }
          >
            {getItem(item.type, 'prod')}
          </AntdForm.Item>
        );
      })}
    </AntdForm>
  );
});
